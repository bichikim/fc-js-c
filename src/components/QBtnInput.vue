<template lang="pug">
  q-btn(
    no-caps
    v-bind="$attrs"
    :push="push"
    :label="nativeValue | stringValue"
    :color="color"
  )
    q-popup-proxy(v-model="showPopup")
      q-input(
        dense
        autofocus
        v-model="nativeValue"
        @change="handleInput"
        @keyup.enter="handleEnter"
      )
</template>

<script lang="ts">
import {
  Component, Prop, Watch,
} from 'vue-property-decorator'
import Vue from 'vue'

@Component({
  filters: {
    stringValue(value) {
      const type = typeof value
      if(type === 'boolean'){
        return  value ? 'true' : 'false'
      }
      return value
    }
  }
})
export default class QBtnInput extends Vue {
  @Prop() value: any
  @Prop({default: 'green'}) color: string
  @Prop({default: true}) transformEmit: boolean
  @Prop() push: boolean

  showPopup: boolean = false

  @Watch('value', {immediate: true})
  watchValue(value) {
    this.nativeValue = value
  }

  nativeValue: any = ''

  get emitValue() {
    const {nativeValue} = this
    if(this.transformEmit){
      const mayNumber = Number(nativeValue)
      if(!isNaN(mayNumber)) {
        return mayNumber
      }
      if(nativeValue === 'true'){
        return true
      }
      if(nativeValue === 'false'){
        return false
      }
    }
    return nativeValue
  }

  handleInput(value) {
    this.$emit('input', this.emitValue)
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
