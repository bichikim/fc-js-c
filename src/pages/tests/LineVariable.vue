<template lang="pug">
  div.q-pa-md
    q-variable(v-bind="codes[0].structure" @change="codes[0].structure = $event")
    q-codes
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
import {Code} from '@/components/QCodes'
@Component({
  components: {QCodes, QNothing, QBtnInput, QBtnTransformer, QVariable }
})
export default class LineVariablePage extends Vue {
  codes: Code[] = [
    {kind: 'variable', structure: {kind: 'const', name: 'foo', operator: '=', value: ['foo', '+', 'bar'], valueKind: 'calculation'}}
    ]
  lineList: Memories[] = []
  timeLines: Memories[] = []
  update: string = 'init'

  updateCodeItem(index, code){
    if(!code){
      return
    }
    code.key = uuid()
    this.codes.splice(index, 1, code)
  }

  updateMemories(index, lines) {
    this.lineList.splice(index, 1, lines)
    const length = this.lineList.length
    const {lineList} = this
    let result
    for(let i = 0; i <= index; i += 1) {
      if(!result){
        result = {...lineList[i]}
      } else {
        result = {...result, ...lineList[i]}
      }
    }
    console.log(result)
    // this.timeLines.splice(index, 1, result)
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
