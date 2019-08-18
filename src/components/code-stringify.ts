import {Value, VariableInfo} from '@/components/_QVariable'
import {CalculationInfo} from './_QCalculation'
import {FunctionInfo} from './_QFunction'
import {ReturnInfo} from './_QReturn'
import {ScopeInfo} from './_QScope'
import {CodeInfo} from '@/components/_QCodes'
import {fill} from 'lodash'



const stringify = () => {
  return {
    value,
    calculationInfo,
    functionInfo,
    variableInfo,
    scopeInfo,
  }
}

export const value = (value: Value) => {
  if(typeof value === 'object' && value !== null){
    return stringify()[value.infoKey](value as any)
  }
  return value
}

export const variableInfo = (context: VariableInfo) => {
  const {kind, name, operator} = context
  return `${kind}${kind === '' ? '' : ' '}${name} ${operator} ${value(context.value)}`
}

export const returnInfo = (context: any) => {
  const {keyWord} = context
  return `${keyWord} ${value(context.value)}`
}

export const calculationInfo = (context: CalculationInfo) => {
  return `${context.value.join(' ')}`
}

export const functionInfo = (context: FunctionInfo) => {

}


export const scopeInfo = (context: ScopeInfo, tap: number = 0) => {
  return `{\n${codes(context.codes, tap += 1)}\n}`
}


export const codes = (code: CodeInfo[], tap: number = 0) => {
  const codeStrings = code.map((code) => {
    const itemStringify = stringify()[code.structure.infoKey]
    if(typeof itemStringify === 'function'){
      return `${fill(Array(tap), '\t')}${itemStringify(code.structure as any)}`
    }
  })
  return codeStrings.join(`\n`)
}
