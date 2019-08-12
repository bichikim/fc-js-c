export const getKindColor = (kind: any) => {
  switch(kind){
    case 'string':
      return 'string'
    case 'number':
      return 'number'
    case 'variable':
      return 'variable'
    default:
      return 'key'
  }
}

export const getKind = (value: any) => {
  if(value === null){
    return 'null'
  }
  if(value === undefined){
    return 'undefined'
  }
  return typeof value
}
