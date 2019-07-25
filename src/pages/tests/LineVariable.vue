<template lang="pug">
  div.q-pa-md
    q-line-variable(
      :previousLines="{foo: {freeze: false, value: 'preBar'}}"
      :value="5"
      @change-code="updateCodeItem(1, $event)"
      )
    q-code-line(:codes="codes[1]")
    q-line-variable(:previousLines="{foo: {freeze: false, value: 'preBar'}}" :kind="''")
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
import {CodeStyle} from '@/components/types'
import QCodeLine from '@/components/QCodeLine.vue'
import QBtnTransformer from '@/components/QBtnTransformer.vue'
import QBtnInput from '@/components/QBtnInput.vue'
@Component({
  components: { QBtnInput, QBtnTransformer, QCodeLine, QLineVariable }
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
