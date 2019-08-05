<template lang="pug">
  .main
    template(v-for="item in items")
      span {{item.key}}
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'

@Component
export default class QNothing extends Vue {
  @Prop({default: () => ({})}) value

  get items() {
    return Object.keys(this.value).map((key: string) => ({key, value: this.value[key]}))
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
