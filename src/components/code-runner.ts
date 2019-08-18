import {VariableInfo} from '@/components/_QVariable'
import * as stringify from '@/components/code-stringify'
import {CodeInfo} from '@/components/_QCodes'


const runners = () => ({
  variableInfo,
})

interface RunnerInfoResult {
  codes: string[],
  watch: string[],
}

interface RunnerResult {
  error: any,
  result: string,
}

export const variableInfo = (context: VariableInfo): RunnerInfoResult => {
  const {name} = context
  return {
    codes: [stringify.variableInfo(context)],
    watch: [name]
  }
}


export const codeRunner = (code: string, watch: string[]) => {
  const __result = {}
  const makeWatcher = (name) => {
    return `\ntry{\n__result.${name} = ${name}\n}catch(e){\n}`
  }
  try{
    eval(
      code +
      `\n ${watch.map(makeWatcher).join('\n')}`
    )
  }catch(e){
    return {
      __error: e.message,
      __column: e.columnNumber,
      __line: e.lineNumber,
    }
  }

  return __result
}


export const codes = (code: CodeInfo[]) => {
  const codeRunInfo = code.map((code): RunnerInfoResult => {
    const itemRunner = runners()[code.structure.infoKey]
    if(typeof itemRunner === 'function'){
      return itemRunner(code.structure)
    }
    return {codes: [], watch: []}
  })


  const codes: string[] = []
  const watchers: string[] = []
  return codeRunInfo.reduce<RunnerResult[]>((_result, item) => {
    codes.push(...item.codes)
    watchers.push(...item.watch)
    let error
    let result
    try {
      result = codeRunner(codes.join('\n'), watchers)
    } catch(e){
      error = {
        message: e.message,
        columnNumber: e.columnNumber,
        lineNumber: e.lineNumber,
      }
    }

    _result.push({
      error, result
    })
    return _result
  }, [])
}


export const runWithWatch = (code: CodeInfo[], watchers: string[] = []) => {
  const codes = stringify.codes(code)
  return codeRunner(codes, watchers)
}
