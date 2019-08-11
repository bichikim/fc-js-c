<template lang="pug">
  q-btn-group(:push="push" @mouseover="nativeShowClose = true" @mouseleave="nativeShowClose = false")
    q-btn(
        :push="push"
        :color="color"
        :label="nativeValue"
        no-caps
        v-bind="$attrs"
      )
      q-popup-proxy(v-model="nativeOpen")
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
    q-btn(
      v-if="close && nativeShowClose"
      :push="push"
      :color="closeColor"
      icon="close"
      dense @click="onClose"
      )
</template>

<script lang="ts">
  import {
    Component, Prop, Vue, Watch,
  } from 'vue-property-decorator'

  @Component
  export default class QBtnChange extends Vue {
    @Prop({default: () => ([])}) list: string[]
    @Prop() value: string
    @Prop({default: true}) push: boolean
    @Prop({default: 'blue'}) color: string
    @Prop({default: false}) close: boolean
    @Prop({default: 'negative'}) closeColor?: string

    nativeValue: string = ''
    nativeShowClose: boolean = false
    nativeOpen: boolean = false

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

    onClose() {
      this.$emit('close')
    }
  }
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
