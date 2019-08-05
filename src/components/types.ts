export interface CodeStyle {
  color: string
  value: string
}

export interface Result {
  value: any
  freeze?: boolean
}

export interface Memories {
  [key: string]: Result
}
