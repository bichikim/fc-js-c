<template lang="pug">
  .div
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
        :value="nativeValue"
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
    @Prop() backgroundColor: string
    @Prop() backgroundPush: string

    nativeValue: string | number | null = 'bar'

    @Watch('value', {immediate: true})
    __value(value) {
      this.nativeValue = value
    }

    @Watch('nativeValue', {immediate: true})
    __nativeValue(nativeValue) {
      if(nativeValue !== this.value) {
        this.$emit('input', nativeValue)
      }
    }

    @Watch('codify', {immediate: true})
    __codify(value) {
      this.$emit('codify', value)
    }

    @Watch('result', {immediate: true})
    __result(value) {
      this.$emit('result', value)
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
      switch(this.nativeValue){
        case 'true':
          return true
        case 'false':
          return false
        case 'null':
          return null
        case 'undefined':
          return undefined
        default:
          return this.nativeValue
      }
    }


    get codify() {
      const {valueKind, stringQuotationColor, stringQuotation} = this
      const result: CodeStyle[] = []
      result.push(
        {
          color: this.nativeValueColor,
          value: String(this.nativeValue)
        }
      )
      if(valueKind === 'string'){
        const quotation = {
          color: stringQuotationColor,
          value: stringQuotation
        }
        result.push(quotation)
        result.unshift(quotation)
      }
      return result
    }

    get nativeValueColor() {
      switch(this.valueKind){
        case 'string':
          return this.stringColor
        case 'number':
          return this.numberColor
        case 'boolean':
          return this.keyColor
        case 'null':
          return this.keyColor
        case 'undefined':
          return this.keyColor
        default:
          return this.stringColor
      }

    }

    get valueKind() {
      if(this.result === null){
        return 'null'
      }
      if(this.result === undefined){
        return 'undefined'
      }
      return typeof this.nativeValue
    }

    onInput(value) {
      this.nativeValue = value
    }

  }
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
