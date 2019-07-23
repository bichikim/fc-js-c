<template lang="pug">
  div
    q-line-variable(:previousLines="{foo: {freeze: false, value: 'preBar'}}" @change-code="updateCodeItem(1, $event)")
    q-code-line(:codes="codes[1]")
    q-line-variable(:previousLines="{foo: {freeze: false, value: 'preBar'}}" :kind="''")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import QLineVariable from '@/components/QLineVariable.vue'
import {CodeStyle} from '@/components/types'
import QCodeLine from '@/components/QCodeLine.vue'
@Component({
  components: { QCodeLine, QLineVariable }
})
export default class LineVariablePage extends Vue {
  codes: CodeStyle[] = []

  updateCodeItem(index, code){
    this.codes[index] = code
    this.codes = [...this.codes]
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
