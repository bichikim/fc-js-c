<template lang="pug">
  q-btn(
    :color="color"
    :label="(nativeValue || placeHolder) | stringValue"
    :push="push"
    no-caps
    v-bind="$attrs"
  )
    q-popup-proxy(v-model="showPopup")
      slot(name="input" v-bind="bindInput")
        q-input(
          @change="onChange($event.target.value)"
          @keyup.enter="onEnter"
          autofocus
          dense
          :value="nativeValue"
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
  @Prop() placeHolder: string
  @Prop({default: 'green'}) color: string
  @Prop({default: true}) transformEmit: boolean
  @Prop() push: boolean

  showPopup: boolean = false
  nativeValue: any = ''

  @Watch('value', {immediate: true})
  __value(value) {
    this.nativeValue = value
  }

  get bindInput() {
    const {nativeValue, onChange, onEnter} = this
    return {value: nativeValue, onChange, onEnter}
  }

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

  onChange(value) {
    this.nativeValue = value
    this.$emit('input', this.emitValue)
  }

  onEnter(){
    this.showPopup = false
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
