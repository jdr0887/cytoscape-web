import { MenuItem } from '@mui/material'
import { ReactElement } from 'react'
import { BaseMenuProps } from '../BaseMenuProps'

// @ts-expect-error-next-line
import { CyNDEx } from '@js4cytoscape/ndex-client'

import { useWorkspaceStore } from '../../../store/WorkspaceStore'
import { useNetworkStore } from '../../../store/NetworkStore'
import { useTableStore } from '../../../store/TableStore'
import { useViewModelStore } from '../../../store/ViewModelStore'
import { useVisualStyleStore } from '../../../store/VisualStyleStore'
import { useNetworkSummaryStore } from '../../../store/NetworkSummaryStore'
import { exportNetworkToCx2 } from '../../../store/exportCX'
import NetworkFn, { Network } from '../../../models/NetworkModel'
import { Cx2 } from '../../../utils/cx/Cx2'
import VisualStyleFn, { VisualStyle } from '../../../models/VisualStyleModel'
import ViewModelFn, { NetworkView } from '../../../models/ViewModel'
import { v4 as uuidv4 } from 'uuid';

import {
  putNetworkToDb,
  putVisualStyleToDb,
  putNetworkViewToDb,
} from '../../../store/persist/db'


interface FullNetworkData {
  network: Network
  visualStyle: VisualStyle
  networkView: NetworkView
}

export const UploadNetworkMenuItem = (
  props: BaseMenuProps,
): ReactElement => {
  const cyndex = new CyNDEx();
  const currentNetworkId = useWorkspaceStore(
    (state) => state.workspace.currentNetworkId,
  )

  const table = useTableStore((state) => state.tables[currentNetworkId])

  const summary = useNetworkSummaryStore(
    (state) => state.summaries[currentNetworkId],
  )

  const viewModel = useViewModelStore(
    (state) => state.viewModels[currentNetworkId],
  )
  const visualStyle = useVisualStyleStore(
    (state) => state.visualStyles[currentNetworkId],
  )
  const network = useNetworkStore((state) =>
    state.networks.get(currentNetworkId),
  ) as Network
  
  const addNetworkToWorkspace = useWorkspaceStore(
    (state) => state.addNetworkIds,
  )

  const createDataFromLocalCx2 = async (
    LocalNetworkId: string,
    cxData: Cx2,
  ): Promise<FullNetworkData> => {
    const network: Network = NetworkFn.createNetworkFromCx(LocalNetworkId, cxData)
    await putNetworkToDb(network)

  
    const visualStyle: VisualStyle = VisualStyleFn.createVisualStyleFromCx(cxData)
    await putVisualStyleToDb(LocalNetworkId, visualStyle)
  
    const networkView: NetworkView = ViewModelFn.createViewModelFromCX(
      LocalNetworkId,
      cxData,
    )
    await putNetworkViewToDb(LocalNetworkId, networkView)
  
    return { network, visualStyle, networkView }
  }

  const saveNetworkToFile = async (): Promise<void> => {
    const cx = exportNetworkToCx2(
      network,
      visualStyle,
      summary,
      table.nodeTable,
      table.edgeTable,
      viewModel,
      `Copy of ${summary.name}`,
    )
    console.log(cx);
    cyndex.postCX2NetworkToCytoscape(cx);
    const localUuid = uuidv4();
    const res = await createDataFromLocalCx2(localUuid, cx)
    console.log(localUuid)
    console.log(res)
    addNetworkToWorkspace(localUuid)
    props.handleClose()
  }

  const handleUploadNetworkFromFile = async (): Promise<void> => {
    await saveNetworkToFile()
  }

  const menuItem = (
    <MenuItem
      onClick={handleUploadNetworkFromFile}
    >
      Upload Network from File
    </MenuItem>
  )
    return <>{menuItem}</>
}