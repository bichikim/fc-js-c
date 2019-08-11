<template lang="pug">
  .q-btn-value
    slot(name="quotation"  v-bind="bindQuotation" v-if="valueKind === 'string'")
      q-btn.bg-white(
        :label="stringQuotation"
        :push="push"
        dense
      )
    slot(name="default" v-bind="bindDefault")
      q-btn-input(
        :color="nativeValueColor"
        :push="push"
        :value="String(nativeValue)"
        :close="close"
        @close="$emit('close')"
        @input="onInput"
      )
    slot(name="quotation" v-bind="bindQuotation" v-if="valueKind === 'string'")
      q-btn.bg-white(
        :class="[`bq-${stringQuotationColor}`]"
        :label="stringQuotation"
        :push="push"
        dense
      )
</template>

<script lang="ts">
  import {
    Component, Prop, Vue, Watch
  } from 'vue-property-decorator'
  import QBtnInput from '@/components/QBtnInput.vue'
  import {getKind, getKindColor} from './_QBtnValue'


  import {CodeStyle} from './types'


  @Component({
    components: {QBtnInput}
  })
  export default class QBtnValue extends Vue {
    @Prop() value: any
    @Prop({default: true}) push: boolean
    @Prop({default: 'green'}) stringColor: string
    @Prop({default: 'red'}) numberColor: string
    @Prop({default: 'blue'}) keyColor: string
    @Prop({default: 'white'}) stringQuotationColor: string
    @Prop({default: '"'}) stringQuotation: '"' | '\''
    @Prop({default: false}) close: boolean
    @Prop() backgroundColor: string
    @Prop() backgroundPush: string

    nativeValue: any = 'bar'

    @Watch('value', {immediate: true})
    __value(value) {
      this.nativeValue = value
    }

    @Watch('result', {immediate: true})
    __nativeValue(nativeValue) {
      this.$emit('input', this.result)
    }

    get bindQuotation() {
      const {push, stringQuotation, stringQuotationColor} = this
      return {push, value: stringQuotation, color: stringQuotationColor}
    }

    get bindDefault() {
      const {push, nativeValue, nativeValueColor, onInput} = this
      return {push, value: nativeValue, color: nativeValueColor, onInput}
    }

    get result() {
      const {nativeValue} = this
      switch(nativeValue){
        case 'true':
          return true
        case 'false':
          return false
        case 'null':
          return null
        case 'undefined':
          return undefined
        case null:
          return null
        // no default
      }


      if(typeof nativeValue === 'boolean' || !nativeValue){
        return nativeValue
      }

      const numberValue = Number(nativeValue)

      return Number.isNaN(numberValue) ? nativeValue : numberValue
    }


    get nativeValueColor() {
      const colorName = getKindColor(this.valueKind)
      switch(colorName){
        case 'number':
          return this.numberColor
        case 'string':
          return this.stringColor
        case 'key':
          return this.keyColor
        default:
          return this.keyColor
      }
    }

    get valueKind() {
      return getKind(this.result)
    }

    onInput(value) {
      this.nativeValue = value
    }

  }
</script>

<style scoped lang="stylus">
  .q-btn-value
    display inline-block
</style>
