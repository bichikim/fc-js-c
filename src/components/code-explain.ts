import {VariableInfo} from '@/components/_QVariable'
import {parse} from 'cox-postposition'
import {trim} from 'lodash'

export const type = (value) => {
  if(/^".*"$/.test(value)){
    return '문자'
  }
  if(value === null){
    return '빈 값'
  }
  switch(typeof value){
    case 'bigint':
      return '숫자'
    case 'boolean':
      return '불린'
    case 'function':
      return '함수'
    case 'number':
      return '숫자'
    case 'object':
      return '객체'
    case 'string':
      return '변수'
    case 'symbol':
      return '심볼'
    case 'undefined':
      return '정의 되지 않은 값'
  }
}

export const variable = (context: VariableInfo) => {
  const {kind, name, value} = context
  const saveWay = kind === 'let' ? '변할 수 있는 값으로' : '변하지 않는 값으로'
  const typeName = type(value)
  return parse(
    `${name}에 ${typeName}${trim(value, '"')}[를*] ${saveWay} 저장 하라`)
}
