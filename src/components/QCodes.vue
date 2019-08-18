<template lang="pug">
  .q-codes.q-gutter-y-md
    template(v-for="(code, index) in nativeCodes")
      q-function(
        :key="code | key"
        v-if="code.structure.infoKey === 'functionInfo'"
        )
      q-variable(
        :key="code | key"
        @change="handelChange(index, {structure: $event, transformer: code.transformer})"
        :showTransformer="code.transformer"
        v-bind="code.structure"
        v-if="code.structure.infoKey === 'variableInfo'"
      )
      q-scope(
        :key="code | key"
        @change="handelChange(index, {structure: $event, transformer: code.transformer})"
        v-bind="code.structure"
        v-if="code.structure.infoKey === 'scopeInfo'"
      )
      q-if(
        :key="code | key"
        @change="handelChange(index, {structure: $event, transformer: code.transformer})"
        v-bind="code.structure"
        v-if="code.structure.infoKey === 'ifInfo'"
      )
    q-btn-dropdown(v-if="showNewBtn" label="new")
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator'
import {CodeInfo} from './_QCodes'
import QBtnChange from '@/components/QBtnChange.vue'
import QVariable from '@/components/QVariable.vue'
import QFunction from '@/components/QFunction.vue'
import QScope from '@/components/QScope.vue'
import QIf from '@/components/QIf.vue'



@Component({
  components: {QScope, QVariable, QBtnChange, QFunction, QIf},
  filters: {
    key(value) {
      return JSON.stringify(value)
    }
  }
})
export default class QCodes extends Vue {
  @Prop({default: () => ([])}) codes: CodeInfo[]
  @Prop() showNewBtn: boolean

  @Watch('codes', {immediate: true})
  __codes(value){
    this.nativeCodes = value
  }

  @Watch('results', {immediate: true})
  __results(value) {
    this.$nextTick(() => {
      this.$emit('results', value)
    })
  }

  nativeCodes: CodeInfo[] = []
  errors: any[] = []

  handelChange(index, value) {
    this.nativeCodes.splice(index, 1, value)
    this.$nextTick(() => {
      this.$emit('change', this.nativeCodes)
    })
  }


}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
