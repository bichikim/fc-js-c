<template lang="pug">
  div.q-pa-md
    q-line-variable(
      :previousMemories="{}"
      @codify="updateCodeItem(0, $event)"
      @memories="updateMemories(0, $event)"
      )
    q-code-line(:codes="codes[0]")
    div {{getLineMemory(0)}}
    q-line-variable(
      :previousMemories="getLineMemory(0)"
      :kind="''"
      @codify="updateCodeItem(1, $event)"
      @memories="updateMemories(1, $event)"
      )
    q-code-line(:codes="codes[1]")
    div {{getLineMemory(1)}}
    q-line-variable(
      :previousMemories="getLineMemory(1)"
      :kind="''"
      @codify="updateCodeItem(2, $event)"
      @memories="updateMemories(2, $event)"
      )
    q-code-line(:codes="codes[2]")
    div {{getLineMemory(2)}}
    q-btn-transformer(:list="['value', 'calculation']")
      template(#value="{color, push}")
        q-btn-input(:color="color" :push="push")
      template(#calculation="{color, push}")
        q-line-variable(:kind="''" :background-color="color" :background-push="push")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import QLineVariable from '@/components/QLineVariable.vue'
import {CodeStyle, Memories} from '@/components/types'
import QCodeLine from '@/components/QCodeLine.vue'
import QBtnTransformer from '@/components/QBtnTransformer.vue'
import QBtnInput from '@/components/QBtnInput.vue'
import uuid from 'uuid/v4'
import QNothing from '@/components/QNothing.vue'
@Component({
  components: {QNothing, QBtnInput, QBtnTransformer, QCodeLine, QLineVariable }
})
export default class LineVariablePage extends Vue {
  codes: CodeStyle[] = []
  timeLines: Memories[] = []
  update: string = 'init'

  getLineMemory(index) {
    const result = {}
    for(let i = 0; i <= index; i++){
      Object.assign(result, this.timeLines[i])
    }
    return result
  }

  updateCodeItem(index, code){
    this.codes[index] = code
    this.codes = [...this.codes]
  }

  updateMemories(index, lines) {
    this.timeLines[index] = lines
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
