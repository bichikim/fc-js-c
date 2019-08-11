import {Calculation} from './_QCalculation'

export type VariableKind = 'const' | 'let' | ''
export type Operator = '=' | '=+' | '=*' | '=/' | '=%' | '=-'
export type ValueKind = 'value' | 'calculation' | 'function'
export interface Variable {
  value: any | Calculation
  kind: VariableKind
  valueKind: ValueKind
  name: string
  operator: Operator
}

