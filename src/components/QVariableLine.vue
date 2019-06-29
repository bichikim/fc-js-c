<template lang="pug">
  .q-gutter-x-md
    q-btn-change(:push="push" :list="['let', 'const']" v-model="variable")
    q-btn-input(:push="push" :list="['let', 'const']")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import QBtnChange from '@/components/QBtnChange.vue'
import QBtnInput from '@/components/QBtnInput.vue'

type VariableKind = 'const' | 'let'
@Component({
  components: { QBtnChange, QBtnInput}
})
export default class QVariableLine extends Vue {
  @Prop() kind: VariableKind
  @Prop({default: true}) push: boolean
  @Prop({default: 'blue'}) valueColor: string
  @Prop({default: 'cyan'})

  get passKind() {
    return this.kind
  }

  nativeValue: string | number | null = null
  nativekind: VariableKind = 'const'
  nativeName: string | null = null


  get stringfy(){
    const {nativeValue, kind, nativeName} = this
    return `${kind} ${nativeName} = ${nativeValue}`
  }

  handleChange() {
    this.$emit('change', )
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
