<template lang="pug">
  .q-codes-explain
    white-space(:content="codeExplain")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import {codes} from './code-explain'
import {CodeInfo} from './_QCodes'
import WhiteSpace from '@/components/WhiteSpace.vue'
@Component({
  components: {WhiteSpace}
})
export default class QCodesExplain extends Vue {
  @Prop({default: () => ([])}) codes: CodeInfo[]

  get codeExplain() {
    return codes(this.codes)
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
