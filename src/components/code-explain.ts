import {VariableInfo} from '@/components/_QVariable'
import josa from 'josa-js'
import {trim} from 'lodash'


export const variable = (context: VariableInfo) => {
  const {kind, name, value} = context
  const saveWay = kind === 'let' ? '변할 수 있는 값으로' : '변하지 않는 값으로'
  return `${name}에 ${value}${josa.c(trim(value, '"'), '을/를')} ${saveWay} 저장 하라`
}
