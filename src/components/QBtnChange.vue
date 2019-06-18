<template lang="pug">
  q-btn-dropdown(no-caps v-bind="$attrs" :label="nativeValue")
    q-list
      q-item(
        @click="handelClick(item)"
        clickable
        v-close-popup
        v-for="item in list"
        :key="item"
      )
        q-item-section
          q-item-label {{item}}
</template>

<script lang="ts">
  import {
    Component, Prop, Vue, Watch,
  } from 'vue-property-decorator'

  @Component
  export default class QBtnChange extends Vue {
    @Prop({default: () => ([])}) list: string[]
    @Prop() value: string

    @Watch('value', {immediate: true})
    watchValue(value) {
      this.nativeValue = value
    }

    nativeValue: string = ''

    handelClick(value) {
      this.nativeValue = value
      this.$emit('input', value)
    }

  }
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
