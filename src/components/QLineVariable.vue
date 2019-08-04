<template lang="pug">
  .q-line-variable.q-btn-item(
    :class="{[`bg-${backgroundColor}`]: true, 'q-btn--push': backgroundPush}"
    )
    q-btn-change.pad(
      v-if="nativeKind !== ''"
      :push="push"
      :color="kindColor"
      :list="kindList"
      v-model="nativeKind"
      )
    q-btn-input.pad(:push="push" :color="nameColor" v-model="nativeName")
    q-btn-change.pad(:push="push" :color="operatorColor" :list="operatorList" v-model="nativeOperator")
    q-btn-transformer(:list="['value', 'calculation']" defaultSelect="value")
      template(#value="{color, push}")
        q-btn-value.pad(
          :push="push"
          v-bind="{valueStringColor, valueNumberColor, valueKeyColor, backgroundColor: color, backgroundPush: push}"
          v-model="nativeValue"
          @change-code="handleValueChange"
          )
</template>


<style scoped lang="stylus">
  .q-line-variable
    position relative
    box-sizing border-box
  .push
    border-radius 7px
  .pad:first-child
    margin-left 0
  .pad:last-child
    margin-right 0
  .pad
    margin-right $flex-gutter-md

</style>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator'
import QBtnChange from '@/components/QBtnChange.vue'
import QBtnInput from '@/components/QBtnInput.vue'
import QBtnValue from '@/components/QBtnValue.vue'
import {CodeStyle} from './types'
import {isNaN} from 'lodash'
import QBtnTransformer from '@/components/QBtnTransformer.vue'

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
  components: {QBtnTransformer, QBtnChange, QBtnInput, QBtnValue}
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
  @Prop({default: 'blue'}) valueKeyColor: string
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

  @Watch('codify', {immediate: true})
  __codify(value){
    this.$emit('change-code', value)
  }


  nativeValue: string | number | null = 'bar'
  nativeKind: VariableKind = 'const'
  nativeName: string = 'foo'
  nativeOperator: Operator = '='
  codeValue: CodeStyle[] | null = null

  // noinspection JSMethodCanBeStatic
  get kindList(): VariableKind[] {
    return ['let', 'const']
  }

  // noinspection JSMethodCanBeStatic
  get operatorList(): Operator[] {
    return ['=', '=%', '=*', '=+', '=-', '=/']
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
      nativeOperator, operatorColor, codeValue, valueStringColor,
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
    if(codeValue){
      result.push(...codeValue)
    }

    return result
  }

  handleValueChange(payload){
    this.codeValue = payload
  }
}
</script>

