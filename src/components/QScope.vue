<template lang="pug">
  .q-scope
    .q-gutter-y-md
      q-btn(dense :push="push" label="{")
      .q-gutter-y-md.tap
        q-codes(:codes="nativeCodes")
      q-btn(dense :push="push" label="}")
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator'
import {CodeInfo} from './_QCodes'
@Component({
  components: {QCodes: () => (import('@/components/QCodes.vue'))}
})
export default class QScope extends Vue {
  @Prop() codes: CodeInfo[]
  @Prop({default: true}) push: boolean

  @Watch('codes', {immediate: true})
  __codes(value){
    this.nativeCodes = value
  }

  nativeCodes: CodeInfo[] = []
}
</script>

<style scoped lang="stylus">
  .tap
    padding-left 14px
</style>
