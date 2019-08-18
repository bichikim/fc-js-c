import {Value, VariableInfo} from '@/components/_QVariable'
import {parse} from 'cox-postposition'
import {trim} from 'lodash'
import {CodeInfo} from '@/components/_QCodes'
import {fill} from 'lodash'
import {CalculationInfo} from '@/components/_QCalculation'
import {ScopeInfo} from '@/components/_QScope'

const explain = () => {
  return {
    variableInfo,
    calculationInfo,
    scopeInfo,
  }
}

export const value = (value: Value) => {
  if(typeof value === 'object' && value !== null){
    console.log(value.infoKey)
    return explain()[value.infoKey](value as any)
  }
  return `${type(value)} ${trim(String(value), '"')}`
}

export const type = (value) => {
  if(/^".*"$/.test(value)){
    return '문자 '
  }
  if(value === null){
    return '빈 값'
  }
  switch(typeof value){
    case 'bigint':
      return '숫자 '
    case 'boolean':
      return '불린 '
    case 'function':
      return '함수 '
    case 'number':
      return '숫자 '
    case 'object':
      return '객체 '
    case 'string':
      return '변수 '
    case 'symbol':
      return '심볼 '
    case 'undefined':
      return '정의 되지 않은 값'
  }
}

export const variableInfo = (context: VariableInfo) => {
  const {kind, name} = context
  const _value = value(context.value)
  let saveWay
  if(kind === 'const') {
    saveWay =  '변하지 않는 값으로'
  } else if(kind === 'let') {
    saveWay = '변할 수 있는 값으로'
  } else {
    saveWay = ''
  }

  return parse(
    `${name}[에|에게] ${_value}[를*] ${saveWay} 저장 하라`)
}

const operatorName = (operator: string) => {
  switch(operator){
    case '+':
      return '더하기'
    case '-':
      return '빼기'
    case '/':
      return '나누기'
    case '%':
      return '나눈 나머지'
    case '*':
      return '곱하기'
  }
}

export const calculationInfo = (context: CalculationInfo) => {
  return context.value.map((item: string, index) => {
    if((index % 2) === 0) {
      return `${type(item)} ${trim(item, '"')}`
    }
    return operatorName(item)
  }).join(' ')
}

export const codes = (code: CodeInfo[], tap: number = 0) => {
  const codeStrings = code.map((code) => {
    const itemExplain = explain()[code.structure.infoKey]
    if(typeof itemExplain === 'function'){
      return `${fill(Array(tap), '&nbsp;&nbsp;')}${itemExplain(code.structure as any)}`
    }
  })
  return codeStrings.join(`\n`)
}

export const scopeInfo = (context: ScopeInfo, tap: number = 0) => {
  return `스코프 안에서 \n${codes(context.codes, tap += 1)}`
}
