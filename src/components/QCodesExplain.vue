<template lang="pug">
  .q-codes-explain
    span {{codeExplain}}
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import * as explain from './code-explain'
import {Code} from './_QCodes'

@Component
export default class QCodesExplain extends Vue {
  @Prop({default: () => ([])}) codes: Code[]

  get codeExplain() {
    const lines = this.codes.map((code) => {
      if(code.kind === 'variable'){
        return explain.variable(code.structure as any)
      }
    })
    return lines.join('\n')
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
