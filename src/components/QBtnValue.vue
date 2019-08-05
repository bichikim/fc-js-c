<template lang="pug">
  .div
    q-btn.bg-white(
      :label="stringQuotation"
      :push="push"
      dense
      v-if="valueKind === 'string'"
    )
    q-btn-input(
      :color="nativeValueColor"
      :push="push"
      :value="nativeValue"
      @input="handleInput"
    )
    q-btn.bg-white(
      :label="stringQuotation"
      :push="push"
      dense
      v-if="valueKind === 'string'"
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
    @Prop({default: 'green'}) valueStringColor: string
    @Prop({default: 'red'}) valueNumberColor: string
    @Prop({default: 'blue'}) valueKeyColor: string
    @Prop({default: 'black'}) stringQuotationColor: string
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
      this.$emit('result', this.result)
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
          return this.valueStringColor
        case 'number':
          return this.valueNumberColor
        case 'boolean':
          return this.valueKeyColor
        case 'null':
          return this.valueKeyColor
        case 'undefined':
          return this.valueKeyColor
        default:
          return this.valueStringColor
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

    handleInput(value) {
      this.nativeValue = value
    }

  }
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
