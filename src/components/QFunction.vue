<template lang="pug">

</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import {Code} from './_QCodes'



@Component
export default class QFunction extends Vue {
  @Prop({default: ''}) name: string
  @Prop() functionThis: string
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
