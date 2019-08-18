import {VariableInfo} from '@/components/_QVariable'
import {value} from './code-stringify'
import * as stringify from './code-stringify'


const valueMap = (value: string | string[], start:number = 0) => {
  if(typeof value === 'string') {
    return [start]
  }

  let previousLength = start
  const map = value.map((item) => {
    previousLength += item.length + 1
    return previousLength
  })
  map.unshift(start)
  return map
}

const runString = (code: string, variables: string[]) => {
  let result
  eval(`${code} \n result = {${variables.map((variable) => (`${variable}: ${variable}`)).join(', ')}}`)
  return result
}

const margeCodeInfo = (codes: CodeRunInfo[] = []): CodeRunInfo => {
  return codes.reduce((result: CodeRunInfo, item: CodeRunInfo) => {
    result.code += `\n${item.code}`
    result.watch.push(...item.watch)
    return result
  }, {
    code: '',
    watch: [],
  })
}

const addKeyWordPrefix = (keyWord) => {
  return `__${keyWord}`
}


interface CodeRunInfo {
  code: string
  watch: string[]
}

export const variable = (context: VariableInfo): CodeRunInfo => {
  return {
    code: stringify.variable(context),
    watch: [context.name]
  }
}

export const returnLine = (context: any): CodeRunInfo => {
  const {keyWord, value} = context
  return {
    code: `__${keyWord} ${Array.isArray(value) ? value.join(' ') : value}`,
    watch: [`__${keyWord}`]
  }
}
