<template lang="pug">
  .q-btn-calculation(

  )
    template(v-for="item in value")
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch
} from 'vue-property-decorator'




@Component
export default class QBtnCalculation extends Vue {
  @Prop() value: string

  @Watch('value')
  __value() {

  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
