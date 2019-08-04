<template lang="pug">
  .q-btn-calculation(

  )
    template(v-for="item in value")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'




@Component
export default class QBtnCalculation extends Vue {
  @Prop() value: any[]
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
