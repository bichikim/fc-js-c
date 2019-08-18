import {StructureInfo, CodeInfo} from './_QCodes'

export interface ScopeInfo extends StructureInfo{
  infoKey: 'scopeInfo'
  name?: string
  codes: CodeInfo[]
}
