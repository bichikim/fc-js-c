import {VariableInfo} from './_QVariable'
import {FunctionInfo} from './_QFunction'

export type CodeKind = 'variable' | 'function' | 'if' | 'for'

export interface Code {
  kind: CodeKind
  structure: VariableInfo | FunctionInfo
  transformer?: boolean
}
