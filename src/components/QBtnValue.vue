<template lang="pug">
  .q-btn-value
    slot(name="default" v-bind="bindDefault")
      q-btn-input(
        :color="nativeValueColor"
        :push="push"
        :value="String(nativeValue)"
        :close="close"
        @close="$emit('close')"
        @input="onInput"
        :tooltip="tooltip"
      )
</template>

<script lang="ts">
  import {
    Component, Prop, Vue, Watch
  } from 'vue-property-decorator'
  import QBtnInput from '@/components/QBtnInput.vue'
  import {getKind, getKindColor} from './_QBtnValue'


  import {CodeStyle} from './types'

  const isStringValue = (value) => (/^".+"$/.test(value))

  @Component({
    components: {QBtnInput}
  })
  export default class QBtnValue extends Vue {
    @Prop() value: any
    @Prop({default: true}) push: boolean
    @Prop({default: 'green'}) stringColor: string
    @Prop({default: 'red'}) numberColor: string
    @Prop({default: 'blue'}) keyColor: string
    @Prop({default: 'cyan'}) variableColor: string
    @Prop({default: false}) close: boolean
    @Prop() backgroundColor: string
    @Prop() backgroundPush: string
    @Prop() tooltip: string

    nativeValue: any = 'bar'

    @Watch('value', {immediate: true})
    __value(value) {
      this.nativeValue = value
    }

    @Watch('result', {immediate: true})
    __result(value) {
      this.$emit('input',value)
    }

    get bindDefault() {
      const {push, nativeValue, nativeValueColor, onInput} = this
      return {push, value: nativeValue, color: nativeValueColor, onInput}
    }

    get result() {
      const {nativeValue} = this

      if(nativeValue === 'true') {
        return true
      }

      if(nativeValue === 'false') {
        return false
      }

      if(nativeValue === 'null') {
        return null
      }


      if(nativeValue === 'undefined'){
        return undefined
      }

      if(typeof nativeValue === 'boolean'){
        return nativeValue
      }

      if(!nativeValue){
        return nativeValue
      }

      const numberValue = Number(nativeValue)

      if(!Number.isNaN(numberValue)) {
        return numberValue
      }

      return nativeValue
    }


    get nativeValueColor() {
      const colorName = this.valueKind
      switch(colorName){
        case 'number':
          return this.numberColor
        case 'string':
          return this.stringColor
        case 'variable':
          return this.variableColor
        default:
          return this.keyColor
      }
    }

    get valueKind() {
      if(isStringValue(this.result)){
        return 'string'
      }
      const kind = getKind(this.result)
      if(kind === 'string'){
        return 'variable'
      }
      return kind
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
