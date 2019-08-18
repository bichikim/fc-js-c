import {CalculationInfo} from './_QCalculation'
import {FunctionInfo} from './_QFunction'
import {ReturnInfo} from './_QReturn'
import {StructureInfo} from './_QCodes'


export type VariableKind = 'const' | 'let' | ''
export type Operator = '=' | '=+' | '=*' | '=/' | '=%' | '=-'
export type ValueKind = 'value' | 'calculationInfo' | 'functionInfo' | 'functionRunInfo'
export interface VariableInfo extends StructureInfo {
  infoKey: 'variableInfo'
  value: Value
  kind: VariableKind
  name: string
  operator: Operator
}

export type Value = string | undefined | null | boolean | number
  | CalculationInfo | FunctionInfo
