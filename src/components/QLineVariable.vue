<template lang="pug">
  .main.q-btn-item(
    :class="{[`bg-${backgroundColor}`]: true, 'q-btn--push': backgroundPush}"
    )
    q-btn-change.pad(
      v-if="nativeKind !== ''"
      :push="push"
      :color="kindColor"
      :list="kindList"
      v-model="nativeKind"
      @input="handleChange"
      )
    q-btn-input.pad(:push="push" :color="nameColor" v-model="nativeName")
    q-btn-change.pad(:push="push" :color="operatorColor" :list="operatorList" v-model="nativeOperator")
    q-btn-input.pad(:push="push" :color="nativeValueColor" v-model="nativeValue")
</template>


<style scoped lang="stylus">
  .main
    position relative
    box-sizing border-box
  .push
    border-radius 7px
  .pad:first-child
    margin-left $flex-gutter-sm
  .pad:not(:last-child)
    margin-right $flex-gutter-md
  .pad:last-child
    margin-right $flex-gutter-sm
</style>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator'
import QBtnChange from '@/components/QBtnChange.vue'
import QBtnInput from '@/components/QBtnInput.vue'
import {CodeStyle} from './types'
import {isNaN} from 'lodash'

type VariableKind = 'const' | 'let' | ''
type Operator = '=' | '=+' | '=*' | '=/' | '=%' | '=-'


interface Lines {
  [key: string]: LineData
}

interface LineData {
  freeze: boolean
  value: any
}

@Component({
  components: { QBtnChange, QBtnInput}
})
export default class QLineVariable extends Vue {
  @Prop({default: 'const'}) kind: VariableKind
  @Prop({default: 'foo'}) name: string
  @Prop({default: '='}) operator: Operator
  @Prop({default: 'bar'}) value: any
  @Prop({default: () => ({})}) previousLines: Lines
  @Prop({default: true}) push: boolean
  @Prop({default: 'blue'}) kindColor: string
  @Prop({default: 'cyan'}) nameColor: string
  @Prop({default: 'amber'}) operatorColor: string
  @Prop({default: 'green'}) valueStringColor: string
  @Prop({default: 'red'}) valueNumberColor: string
  @Prop({default: 'blue'}) valueBooleanColor: string
  @Prop({default: 'white'}) backgroundColor: string
  @Prop({default: false}) backgroundPush: boolean

  @Watch('kind', {immediate: true})
  __kind(value) {
    this.nativeKind = value
  }

  @Watch('name', {immediate: true})
  __name(value) {
    this.nativeName = value
  }

  @Watch('operator', {immediate: true})
  __operator(value) {
    this.nativeOperator = value
  }

  @Watch('value', {immediate: true})
  __value(value) {
    this.nativeValue = value
  }

  mounted() {
    this.handleChange()
  }


  nativeValue: string | number | null = 'bar'
  nativeKind: VariableKind = 'const'
  nativeName: string = 'foo'
  nativeOperator: Operator = '='

  // noinspection JSMethodCanBeStatic
  get kindList(): VariableKind[] {
    return ['let', 'const']
  }

  // noinspection JSMethodCanBeStatic
  get operatorList(): Operator[] {
    return ['=', '=%', '=*', '=+', '=-', '=/']
  }

  get nativeValueColor() {
    switch(this.valueKind){
      case 'string':
        return this.valueStringColor
      case 'number':
        return this.valueNumberColor
      case 'boolean':
        return this.valueBooleanColor
    }
    return this.valueStringColor
  }

  get valueKind() {
    return typeof this.nativeValue
  }

  get resultValue() {
    const {nativeOperator, previousLines, nativeName} = this
    const nativeValue: any = this.nativeValue
    const myPrevious = previousLines[nativeName]
    const {value: myPreviousValue} = myPrevious || {value: undefined}
    switch(this.nativeOperator){
      case '=':
        return nativeValue
      case '=+':
        return myPreviousValue + nativeValue
      case '=%':
        return myPreviousValue % nativeValue
      case '=/':
        return myPreviousValue / nativeValue
      case '=*':
        return myPreviousValue * nativeValue
      case '=-':
        return myPreviousValue - nativeValue
    }
    return nativeValue
  }

  get lineData() {
    const {nativeKind, resultValue, nativeName, previousLines} = this
    return {
      [nativeName]: {
        freeze: nativeKind === 'const',
        value: resultValue
      }
    }
  }

  get codify(): CodeStyle[]{
    const result: CodeStyle[] = []
    const {
      nativeKind, kindColor, nameColor, nativeName, nativeValue,
      nativeOperator, operatorColor, nativeValueColor,
    } = this
    if(nativeKind !== ''){
      result.push({
        color: kindColor,
        value: nativeKind,
      })
    }
    result.push({
      color: nameColor,
      value: nativeName,
    })
    result.push({
      color: operatorColor,
      value: nativeOperator,
    })
    result.push({
      color: nativeValueColor,
      value: String(nativeValue),
    })
    return result
  }


  handleChange() {
    this.$emit('change', this.lineData)
    this.$emit('change-code', this.codify)
  }
}
</script>

