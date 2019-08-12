<template lang="pug">
  .q-codes-display
    prism-editor(
      :code="codeStrings"
      :value="codeStrings"
      language="js"
      readonly
    )

</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import {Code} from './_QCodes'
import * as stringify from './code-stringify'



@Component({
  filters: {
    key(value) {
      return JSON.stringify(value)
    }
  }
})
export default class QCodesDisplay extends Vue {
  @Prop({default: () => ([])}) codes: Code[]

  get codeStrings() {
    const codes =  this.codes.map((code) => {
      if(code.kind === 'variable'){
        return stringify.variable(code.structure as any)
      }
    })
    return codes.join('\n')
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
