<template lang="pug">
  div.q-pa-md
    q-codes(:codes="codes" @change="onChange")
    q-codes-display(:codes="codes")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import QVariable from '@/components/QVariable.vue'
import {CodeStyle, Memories} from '@/components/types'
import QBtnTransformer from '@/components/QBtnTransformer.vue'
import QBtnInput from '@/components/QBtnInput.vue'
import uuid from 'uuid/v4'
import QNothing from '@/components/QNothing.vue'
import QCodes from '@/components/QCodes.vue'
import {Code} from '@/components/_QCodes'
import QCodesDisplay from '@/components/QCodesDisplay.vue'
@Component({
  components: {QCodesDisplay, QCodes, QNothing, QBtnInput, QBtnTransformer, QVariable }
})
export default class LineVariablePage extends Vue {
  codes: Code[] = [
    {kind: 'variable', structure: {kind: 'const', name: 'foo', operator: '=', value: [10], valueKind: 'value'}},
    {kind: 'variable', structure: {kind: 'const', name: 'bar', operator: '=', value: [50], valueKind: 'value'}},
    {kind: 'variable', structure: {kind: 'const', name: 'john', operator: '=', value: ['foo', '+', 'bar'], valueKind: 'calculation'}},
    {kind: 'function', structure: {}},
    ]
  lineList: Memories[] = []
  timeLines: Memories[] = []
  update: string = 'init'

  onChange(value) {
    console.log(value)
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
