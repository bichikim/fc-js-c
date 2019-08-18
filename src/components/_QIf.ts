import {CodeInfo, StructureInfo} from '@/components/_QCodes'
import {Value} from './_QVariable'


export interface IfSession {
  infoKey: 'if' | 'elseif' | 'else'
  condition: Value
}

export interface IfInfo extends StructureInfo {
  infoKey: 'ifInfo'
  conditions: IfSession[]
  codeList: Array<Array<CodeInfo>>
}
