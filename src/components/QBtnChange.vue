<template lang="pug">
  q-btn-dropdown(
      :color="color"
      :label="nativeValue"
      no-caps
      v-bind="$attrs"
    )
    q-list
      template(v-for="item in list")
        slot(name="item" v-bind="bindItem(item)")
          q-item(
            :key="item"
            @click="onClick(item)"
            clickable
            v-close-popup
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
    @Prop({default: 'blue'}) color: string

    nativeValue: string = ''

    @Watch('value', {immediate: true})
    __value(value) {
      this.nativeValue = value
    }

    bindItem(item) {
      const {onClick} = this
      return {value: item, onClick}
    }

    onClick(value) {
      this.nativeValue = value
      this.$emit('input', value)
    }

  }
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
