<template lang="pug">
  .q-codes
    template(v-for="(code, index) in nativeCodes")
      q-function(
        :key="code | key"
        v-if="code.kind === 'function'"
        )
      q-variable(
        :key="code | key"
        @change="onChange(index, code)"
        v-bind="code.structure"
        v-else-if="code.kind === 'variable'"
      )
    q-btn-dropdown(v-if="showNewBtn" label="new")
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator'
import {Code} from './_QCodes'
import QBtnChange from '@/components/QBtnChange.vue'
import QVariable from '@/components/QVariable.vue'
import QFunction from '@/components/QFunction.vue'


@Component({
  components: {QVariable, QBtnChange, QFunction},
  filters: {
    key(value) {
      return JSON.stringify(value)
    }
  }
})
export default class QCodes extends Vue {
  @Prop() codes: Code[]
  @Prop() showNewBtn: boolean

  @Watch('codes', {immediate: true})
  __codes(value){
    this.nativeCodes = value
  }

  nativeCodes: Code[] = []

  onChange(index, value) {
    this.nativeCodes.splice(index, 1, value)
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
