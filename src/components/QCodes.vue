<template lang="pug">
  .q-codes
    q-btn-dropdown(label="new")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import {Operator, ValueKind, VariableKind} from './QLineVariable'
import QBtnChange from '@/components/QBtnChange.vue'



interface LineValue {
  value: any
  kind: VariableKind
  valueKind: ValueKind
  name: string
  operator: Operator
}

@Component({
  components: {QBtnChange}
})
export default class QCodes extends Vue {
  @Prop() code: LineValue[]

  nativeCodes: LineValue[] = []
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
