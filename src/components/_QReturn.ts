import {Value} from './_QVariable'
import {StructureInfo} from './_QCodes'

export interface ReturnInfo extends StructureInfo{
  infoKey: 'returnInfo'
  keyword: 'return'
  value: Value
}
