<template lang="pug">
  .q-codes-display
    prism-editor(
      :code="codeStrings"
      :value="codeStrings"
      language="js"
      readonly
    )
    error-pointer.pointer(
      :line="2"
      :column="4"
    )
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import {CodeInfo} from './_QCodes'
import {codes} from './code-stringify'
import ErrorPointer from './ErrorPointer.vue'
import {codes as resultCodes} from './code-runner'

@Component({
  components: {
    ErrorPointer,
  },
  filters: {
    key(value) {
      return JSON.stringify(value)
    }
  }
})
export default class QCodesDisplay extends Vue {
  @Prop({default: () => ([])}) codes: CodeInfo[]

  get codeStrings() {
    return codes(this.codes)
  }
}
</script>

<style scoped lang="stylus">
  .q-codes-display
    position relative
  .pointer
    position absolute
    left 0
    top 0
</style>
