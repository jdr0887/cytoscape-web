import { MenuItem } from '@mui/material'
import { ReactElement, useState } from 'react'
import { BaseMenuProps } from '../BaseMenuProps'
import { LoadFromNdexDialog } from './LoadFromNdexDialog'

export const LoadFromNdexMenuItem = (props: BaseMenuProps): ReactElement => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleCloseDialog = (): void => {
    setOpenDialog(false)
    props.handleClose()
  }

  const handleOpenDialog = (): void => {
    setOpenDialog(true)
  }

  return (
    <>
      <MenuItem onClick={handleOpenDialog}>
        Load network(s) from NDEx...
      </MenuItem>
      <LoadFromNdexDialog open={openDialog} handleClose={handleCloseDialog} />
    </>
  )
}
