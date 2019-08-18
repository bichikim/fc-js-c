<template lang="pug">
  .q-value
    q-btn-transformer(:list="kindList" :value="nativeKind")
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch
} from 'vue-property-decorator'
import QBtnTransformer from '@/components/QBtnTransformer.vue'
import {ValueKind} from './_QVariable'


@Component({
  components: {QBtnTransformer}
})
export default class QValue extends Vue {
  @Prop() value: any
  @Prop() kind: ValueKind

  @Watch('value')
  __value(value) {
    this.nativeKind = value
  }

  nativeKind: ValueKind = 'value'

  kindList: string[] = ['value', 'calculationInfo', 'functionInfo']
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
