<template lang="pug">
  q-btn-group(:push="push" @mouseover="nativeShowClose = true" @mouseleave="nativeShowClose = false")
    q-btn(
      :color="color"
      :label="(nativeValue || placeHolder) | stringValue"
      :push="push"
      no-caps
      v-bind="$attrs"
    )
      q-popup-proxy(v-model="nativeOpen")
        slot(name="input" v-bind="bindInput")
          q-input(
            @change="onChange($event.target.value)"
            @keyup.enter="onEnter"
            autofocus
            dense
            :value="nativeValue"
          )
      q-tooltip(v-if="tooltip") {{tooltip}}
      slot
    q-btn(
      v-if="close && nativeShowClose"
      :push="push"
      :color="closeColor"
    label="x"
    no-caps
      dense @click="onClose")

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
  @Prop({default: false}) close: boolean
  @Prop({default: 'negative'}) closeColor?: string
  @Prop() push: boolean
  @Prop() tooltip: string

  nativeOpen: boolean = false
  nativeValue: any = ''
  nativeShowClose: boolean = false

  @Watch('value', {immediate: true})
  __value(value) {
    this.nativeValue = value
  }

  @Watch('nativeOpen')
  __nativeOpen(value) {
    if(value){
      this.$emit('show')
      return
    }
    this.$emit('hide')
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
  onClose() {
    this.$emit('close')
  }

  onEnter(){
    this.nativeOpen = false
    this.$emit('change', this.nativeValue)
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
