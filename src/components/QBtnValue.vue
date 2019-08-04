<template lang="pug">
  .div
    q-btn.bg-white(dense v-if="valueKind === 'string'" :push="push" :label="stringQuotation")
    q-btn-input(:push="push" :color="nativeValueColor" :value="nativeValue" @input="handleInput")
    q-btn.bg-white(dense v-if="valueKind === 'string'" :push="push" :label="stringQuotation")
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
    @Prop() backgroundColor: string
    @Prop() backgroundPush: string
    @Prop({default: 'green'}) valueStringColor: string
    @Prop({default: 'red'}) valueNumberColor: string
    @Prop({default: 'blue'}) valueKeyColor: string
    @Prop({default: 'black'}) stringQuotationColor: string
    @Prop({default: '"'}) stringQuotation: '"' | '\''
    @Prop({default: true}) push: boolean

    nativeValue: string | number | null = 'bar'

    @Watch('value', {immediate: true})
    __value(value) {
      this.nativeValue = value
    }

    @Watch('codify', {immediate: true})
    __checkChange(value) {
      this.$emit('change-code', value)
    }



    get codify() {
      const {valueKind, stringQuotationColor, stringQuotation} = this
      const result: CodeStyle[] = []
      result.push(
        {
          color: this.nativeValueColor,
          value: String(this.nativeValue),
        }
      )
      if(valueKind === 'string'){
        const quotation = {
          color: stringQuotationColor,
          value: stringQuotation,
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
      }
      return this.valueStringColor
    }

    static transformKind(value) {
      switch(value){
        case 'true':
          return true
        case 'false':
          return false
        case 'null':
          return null
        case 'undefined':
          return undefined
        default:
          return value
      }
    }

    get valueKind() {
      if(this.nativeValue === null){
        return 'null'
      }
      return typeof this.nativeValue
    }

    handleInput(value) {
      this.nativeValue = QBtnValue.transformKind(value)
      this.$emit('input', this.nativeValue)
    }

  }
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
