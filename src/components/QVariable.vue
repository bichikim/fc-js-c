<template lang="pug">
  .q-variable.q-btn-item(
    :class="{[`bg-${backgroundColor}`]: true, 'q-btn--push': backgroundPush}"
  )
    slot(name="kind" v-if="nativeKind !== ''" v-bind="bindKind")
      q-btn-change.pad(
        :color="kindColor"
        :list="kindList"
        :push="push"
        v-model="nativeKind"
        tooltip="저장 키워드"
      )
    slot(name="name" v-bind="bindName")
      q-btn-input.pad(:push ="push" :color="nameColor" v-model="nativeName" tooltip="저장 별명")
    slot(name="operator" v-bind="bindOperator")
      q-btn-change.pad(:push="push" :color="operatorColor" :list="operatorList" v-model="nativeOperator" tooltip="대입 연산자")
    slot(name="value" v-bind="bindValue")
      q-btn-transformer(:list="valueTypeList" :value="valueKind" :active="showTransformer")
        template(#select-value="{color, push}")
          q-btn-value.pad(
            :backgroundColor="color"
            :backgroundPush="push"
            :push="push"
            v-bind="bindValue"
            :value="nativeValue"
            @input="nativeValue = $event"
            tooltip="값"
          )
        template(#select-calculation-info="{color, push}")
          q-calculation(
            :backgroundColor="color"
            :backgroundPush="push"
            :push="push"
            v-bind="bindValue"
            :value="nativeValue.value"
            @input="nativeValue.value = $event"
            tooltip="수식"
          )
        template(#select-function-info="{color, push}")
          q-btn(:push="push")
</template>


<style lang="stylus" scoped>
  .q-variable
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
  import {VariableKind, Operator, ValueKind, VariableInfo, Value} from './_QVariable'

  @Component({
    components: {QCalculation, QBtnTransformer, QBtnChange, QBtnInput, QBtnValue}
  })
  export default class QVariable extends Vue {
    @Prop() value: any
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

    @Watch('variable', {immediate: true})
    __variable(value) {
      this.$nextTick(() => {
        this.$emit('change', value)
      })
    }

    nativeValue: Value = 'bar'
    // nativeError?: string | null = null
    nativeKind: VariableKind = 'const'
    nativeName: string = 'foo'
    nativeOperator: Operator = '='
    valueTypeList: string[] = ['value', 'calculationInfo', 'functionInfo']

    get valueKind() {
      const {nativeValue} = this
      if(typeof nativeValue === 'object' && nativeValue !== null) {
        return nativeValue.infoKey

      }
      return 'value'
    }

    set valueKind(value) {
      if(value === 'value'){
        if(typeof this.nativeValue === 'object' && this.nativeValue !== null) {
          if(this.nativeValue.infoKey === 'calculationInfo'){
            this.nativeValue = String(this.nativeValue.value.join(' '))
            return
          }
          if(this.nativeValue.infoKey === 'functionInfo') {
            this.nativeValue = this.nativeValue.name
          }
        }
        return
      }
      if(typeof this.nativeValue === 'object' && this.nativeValue !== null) {
        if(value === 'calculationInfo'){
          this.nativeValue = {infoKey: value, value: []}
          return
        }
        if(value === 'functionInfo') {
          this.nativeValue = {infoKey: value, name: '', codes: [], kind: 'function', prams: []}
        }
      }
    }

    get variable() {
      const {nativeKind, nativeName, nativeOperator, nativeValue} = this
      return {
        infoKey: 'variableInfo',
        kind: nativeKind,
        name: nativeName,
        operator: nativeOperator,
        value: nativeValue,
      }
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
      if(this.nativeKind === ''){
        return ['=', '=%', '=*', '=+', '=-', '=/']
      }
      return ['=']
    }

  }
</script>

