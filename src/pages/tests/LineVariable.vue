<template lang="pug">
  div.q-pa-md
    q-codes(:codes="[...codes]" @change="onChange")
    q-codes-display(:codes="codes")
    q-codes-result(:codes="codes")
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
import {CodeInfo} from '@/components/_QCodes'
import QCodesDisplay from '@/components/QCodesDisplay.vue'
import QCodesResult from '@/components/QCodesResult.vue'
@Component({
  components: {QCodesResult, QCodesDisplay, QCodes, QNothing, QBtnInput, QBtnTransformer, QVariable }
})
export default class LineVariablePage extends Vue {
  codes: CodeInfo[] = [
    {structure: {infoKey: 'variableInfo', kind: 'const', name: 'foo', operator: '=', value: 10}},
    {structure: {infoKey: 'variableInfo', kind: 'const', name: 'bar', operator: '=', value: 50}},
    // {structure: {infoKey: 'variableInfo', kind: 'const', name: 'john', operator: '=', value: {infoKey: 'calculationInfo', value: ['foo', '+', 'bar']}}},
    // {structure: {infoKey: 'functionInfo', kind: 'function', name: 'bar', prams: ['foo'], codes: [
    //       {structure: {infoKey: 'variableInfo', kind: '', name: 'john', operator: '=', value: {infoKey: 'calculationInfo', value: [50, '+', '50']}}}
    //     ]}},
    // {structure: {infoKey: 'ifInfo', conditions: [
    //       {
    //         infoKey: 'if',
    //         condition: 5,
    //       }
    //     ],
    //     codeList: [],
    //   }}
    // {structure: {infoKey: 'variable', kind: 'const', name: 'bar', operator: '=', value: 50, valueKind: 'value'}},
    // {kind: 'variable', structure: {kind: 'const', name: 'john', operator: '=', value: ['foo', '+', 'bar'], valueKind: 'calculation'}},
    // {kind: 'function', structure: {}},

    ]
  lineList: Memories[] = []
  timeLines: Memories[] = []
  update: string = 'init'

  onChange(value) {
    this.codes = value
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
