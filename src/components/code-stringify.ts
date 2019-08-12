import {VariableInfo} from '@/components/_QVariable'

export const variable = (context: VariableInfo) => {
  const {kind, name, value, operator} = context
  const _value = Array.isArray(value) ? value.join(' ') : value
  return `${kind} ${name} ${operator} ${_value}`
}

