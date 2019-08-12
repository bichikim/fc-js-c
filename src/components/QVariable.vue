<template lang="pug">
  .q-line-variable.q-btn-item(
    :class="{[`bg-${backgroundColor}`]: true, 'q-btn--push': backgroundPush}"
  )
    slot(name="kind" v-if="nativeKind !== ''" v-bind="bindKind")
      q-btn-change.pad(
        :color="kindColor"
        :list="kindList"
        :push="push"
        v-model="nativeKind"
      )
    slot(name="name" v-bind="bindName")
      q-btn-input.pad(:push ="push" :color="nameColor" v-model="nativeName")
    slot(name="operator" v-bind="bindOperator")
      q-btn-change.pad(:push="push" :color="operatorColor" :list="operatorList" v-model="nativeOperator")
    slot(name="value" v-bind="bindValue")
      q-btn-transformer(:list="['value', 'calculation', 'function']" v-model="nativeValueKind" :active="showTransformer")
        template(#select-value="{color, push}")
          q-btn-value.pad(
            :backgroundColor="color"
            :backgroundPush="push"
            :push="push"
            v-bind="bindValue"
            :value="valueValue"
            @input="nativeValue = $event"
          )
        template(#select-calculation="{color, push}")
          q-calculation(
            :backgroundColor="color"
            :backgroundPush="push"
            :push="push"
            v-bind="bindValue"
            :value="calculationValue"
            @input="nativeValue = $event"
          )
        template(#select-function="{color, push}")
          q-btn(:push="push")
</template>


<style lang="stylus" scoped>
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
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
  import QBtnChange from '@/components/QBtnChange.vue'
  import QBtnInput from '@/components/QBtnInput.vue'
  import QBtnValue from '@/components/QBtnValue.vue'
  import {CodeStyle, Memories, Result} from './types'
  import QBtnTransformer from '@/components/QBtnTransformer.vue'
  import QCalculation from '@/components/QCalculation.vue'
  import {VariableKind, Operator, ValueKind, VariableInfo} from './_QVariable'

  @Component({
    components: {QCalculation, QBtnTransformer, QBtnChange, QBtnInput, QBtnValue}
  })
  export default class QVariable extends Vue {
    @Prop({default: 'bar'}) value: any
    @Prop({default: 'value'}) valueKind: ValueKind
    @Prop({default: true}) push: boolean
    @Prop({default: 'const'}) kind: VariableKind
    @Prop({default: 'foo'}) name: string
    @Prop({default: '='}) operator: Operator
    @Prop({default: 'blue'}) kindColor: string
    @Prop({default: 'cyan'}) nameColor: string
    @Prop({default: 'amber'}) operatorColor: string
    @Prop({default: 'green'}) stringColor: string
    @Prop({default: 'red'}) numberColor: string
    @Prop({default: 'blue'}) keyColor: string
    @Prop({default: 'cyan'}) variableColor: string
    @Prop({default: 'white'}) backgroundColor: string
    @Prop({default: false}) backgroundPush: boolean
    @Prop({default: true}) showTransformer: boolean

    @Watch('value', {immediate: true})
    __value(value) {
      this.nativeValue = value
    }

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

    @Watch('valueKind', {immediate: true})
    __valueKind(value) {
      this.nativeValueKind = value
    }

    @Watch('variable', {immediate: true})
    __variable(value) {
      this.$nextTick(() => {
        this.$emit('change', value)
      })
    }

    nativeValue: string | number | null = 'bar'
    // nativeError?: string | null = null
    nativeKind: VariableKind = 'const'
    nativeName: string = 'foo'
    nativeOperator: Operator = '='
    nativeValueKind: ValueKind = 'value'
    valueTypeList: string[] = ['value', 'calculation']

    get valueValue() {
      const {nativeValue} = this
      if(Array.isArray(nativeValue)) {
        return nativeValue.join(' ')
      }
      if(typeof nativeValue === 'function') {
        return String(nativeValue)
      }
      return nativeValue
    }

    get variable() {
      const {nativeKind, nativeName, nativeOperator, nativeValue, nativeValueKind} = this
      return {
        kind: nativeKind,
        name: nativeName,
        operator: nativeOperator,
        value: nativeValue,
        valueKind: nativeValueKind
      }
    }

    get calculationValue() {
      const {nativeValue} = this
      if(Array.isArray(nativeValue)) {
        return nativeValue
      }
      if(typeof nativeValue === 'function') {
        return [String(nativeValue)]
      }
      return [nativeValue]
    }

    get bindKind() {
      const {kindColor, push, nativeKind, kindList} = this
      return {color: kindColor, push, value: nativeKind, list: kindList}
    }

    get bindName() {
      const {push, nameColor, nativeName} = this
      return {push, color: nameColor, value: nativeName}
    }

    get bindOperator() {
      const {push, operatorColor, operatorList, nativeOperator} = this
      return {push, color: operatorColor, list: operatorList, value: nativeOperator}
    }

    get bindValue() {
      const {
        push, valueTypeList, stringColor, numberColor,
        keyColor, variableColor,
      } = this
      return {
        push, list: valueTypeList, stringColor,
        numberColor, keyColor,
        variableColor,
      }
    }

    // noinspection JSMethodCanBeStatic
    get kindList(): VariableKind[] {
      return ['let', 'const']
    }

    // noinspection JSMethodCanBeStatic
    get operatorList(): Operator[] {
      return ['=', '=%', '=*', '=+', '=-', '=/']
    }

  }
</script>

