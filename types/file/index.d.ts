declare module '*.vue' {
  import Vue from 'vue'
  interface Static {
    [key: string]: any
  }
  export default Vue && Static
}

declare module '*.json'
