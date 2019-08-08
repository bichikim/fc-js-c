<template lang="pug">
  .q-codes
    template(v-for="code in nativeCodes")
      q-function(v-if="code.kind")
      q-variable(v-else)
    q-btn-dropdown(v-if="showNewBtn" label="new")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import {Variable} from './QVariable'
import QBtnChange from '@/components/QBtnChange.vue'
import QVariable from '@/components/QVariable.vue'
import QFunction from '@/components/QFunction.vue'




type CodeKind = 'variable' | 'function' | 'if' | 'for'

interface Code {
  kind: CodeKind
  structure: Variable
}


@Component({
  components: {QVariable, QBtnChange, QFunction}
})
export default class QCodes extends Vue {
  @Prop() codes: Code[]
  @Prop() showNewBtn: boolean

  nativeCodes: Code[] = []
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
