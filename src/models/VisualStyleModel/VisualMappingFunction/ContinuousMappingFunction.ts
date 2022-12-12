import { ValueType } from '../../TableModel'

import { VisualPropertyValueType } from '../VisualPropertyValue'
import { VisualMappingFunction } from '.'

export interface ContinuousFunctionInterval {
  min?: ValueType
  max?: ValueType
  includeMin: boolean
  includeMax: boolean
  minVPValue?: VisualPropertyValueType
  maxVPValue?: VisualPropertyValueType
}

export interface ContinuousMappingFunction extends VisualMappingFunction {
  intervals: ContinuousFunctionInterval[]
}

// continuous mapping fn
//        "NODE_LABEL_FONT_SIZE": {
//   "definition": {
//     "attribute": "Size",
//     "map": [
//       {
//         "includeMax": false,
//         "includeMin": false,
//         "max": 3.0,
//         "maxVPValue": 1
//       },
//       {

//         "includeMax": true,
//         "includeMin": true,
//         "max": 195.0,
//         "maxVPValue": 45,
//         "min": 3.0,
//         "minVPValue": 7
//       },
//       {
//         "includeMax": true,
//         "includeMin": true,
//         "max": 661.0,
//         "maxVPValue": 47,
//         "min": 195.0,
//         "minVPValue": 45
//       },
//       {
//         "includeMax": false,
//         "includeMin": false,
//         "min": 661.0,
//         "minVPValue": 1
//       }
//     ]
//   },
//   "type": "CONTINUOUS"
// },