import {VariableInfo} from './_QVariable'
import {FunctionInfo} from './_QFunction'
import {ReturnInfo} from './_QReturn'
import {ScopeInfo} from './_QScope'
import {IfInfo} from './_QIf'


export type CodeKind = 'variable' | 'function' | 'if' | 'for' | 'return'

export interface CodeInfo {
  structure: VariableInfo | FunctionInfo | ReturnInfo | ScopeInfo | IfInfo
  transformer?: boolean
}

export interface StructureInfo {
  infoKey: string
}
