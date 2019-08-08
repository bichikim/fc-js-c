<template lang="pug">
  .main
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import {Code} from './QCodes'



@Component
export default class QFunction extends Vue {
  @Prop({default: ''}) name: string
  @Prop({default: () => ([])}) codes: Code[]
  @Prop() parameters: any[]

  run() {

  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
