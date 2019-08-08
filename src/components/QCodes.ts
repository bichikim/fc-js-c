import {Variable} from './QVariable'

export type CodeKind = 'variable' | 'function' | 'if' | 'for'

export interface Code {
  kind: CodeKind
  structure: Variable
}
