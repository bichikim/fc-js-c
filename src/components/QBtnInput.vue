<template lang="pug">
  q-btn(no-caps v-bind="$attrs" :label="nativeValue")
    q-popup-proxy(v-model="showPopup")
      q-input(
        dense
        autofocus
        :value="nativeValue"
        @input="handleInput"
        @keyup.enter="handleEnter"
      )
</template>

<script lang="ts">
import {
  Component, Prop, Watch,
} from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class QBtnInput extends Vue {
  @Prop() value

  showPopup: boolean = false

  @Watch('value', {immediate: true})
  watchValue(value) {
    this.nativeValue = value
  }

  nativeValue: string = ''

  handleInput(value) {
    this.$emit('input', value)
  }

  handleEnter(){
    this.showPopup = false
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
