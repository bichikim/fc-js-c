<template lang="pug">
  q-btn-dropdown(no-caps v-bind="$attrs" :label="label")
    q-list
      q-item(clickable v-for="(item, index) in list" @click="listIndex = index")
        q-item-section
          q-item-label {{item}}
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'

@Component
export default class QBtnChange extends Vue {
  @Prop({default: () => ([])}) list: string[]

  listIndex: number = 0

  get label() {
    return this.list[this.listIndex]
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
