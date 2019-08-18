import {StructureInfo, CodeInfo} from './_QCodes'

export interface FunctionInfo extends StructureInfo {
  infoKey: 'functionInfo'
  name: string
  kind: 'arrow' | 'function'
  prams: string[]
  codes: CodeInfo[]
}

export interface FunctionRunInfo extends StructureInfo {
  infoKey: 'functionRunInfo'
  name: string
  prams: string[]
}
