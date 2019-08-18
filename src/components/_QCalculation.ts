import {StructureInfo} from '@/components/_QCodes'

export interface CalculationInfo extends StructureInfo {
  infoKey: 'calculationInfo'
  value: Array<any | '+' | '-' | 'x' | '/' | '%' | '||' | '&&'>
}

