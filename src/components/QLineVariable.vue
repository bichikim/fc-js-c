<template lang="pug">
  .q-line-variable.q-btn-item(
    :class="{[`bg-${backgroundColor}`]: true, 'q-btn--push': backgroundPush}"
  )
    q-btn-change.pad(
      :color="kindColor"
      :list="kindList"
      :push="push"
      v-if="nativeKind !== ''"
      v-model="nativeKind"
    )
    q-btn-input.pad(:push ="push" :color="nameColor" v-model="nativeName")
    q-btn-change.pad(:push="push" :color="operatorColor" :list="operatorList" v-model="nativeOperator")
    q-btn-transformer(:list="['value', 'calculation']" select="value")
      template(#value="{color, push}")
        q-btn-value.pad(
          :push="push"
          @codify="handleCodify"
          @result="handleResult"
          v-bind="{valueStringColor, valueNumberColor, valueKeyColor, backgroundColor: color, backgroundPush: push}"
          v-model="nativeValue"
        )
      template(#calculation="{color, push}")
        q-btn-calculation(
          :push="push"
          @codify="handleCodify"
          v-bind="{}"
          v-model="nativeValue"
        )
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
  import QBtnCalculation from '@/components/QBtnCalculation.vue'

  type VariableKind = 'const' | 'let' | ''
  type Operator = '=' | '=+' | '=*' | '=/' | '=%' | '=-'


  @Component({
    components: {QBtnCalculation, QBtnTransformer, QBtnChange, QBtnInput, QBtnValue}
  })
  export default class QLineVariable extends Vue {
    @Prop({default: 'bar'}) value: any
    @Prop({default: true}) push: boolean
    @Prop({default: 'const'}) kind: VariableKind
    @Prop({default: 'foo'}) name: string
    @Prop({default: '='}) operator: Operator
    @Prop({default: () => ({})}) previousMemories: Memories
    @Prop({default: 'blue'}) kindColor: string
    @Prop({default: 'cyan'}) nameColor: string
    @Prop({default: 'amber'}) operatorColor: string
    @Prop({default: 'green'}) valueStringColor: string
    @Prop({default: 'red'}) valueNumberColor: string
    @Prop({default: 'blue'}) valueKeyColor: string
    @Prop({default: 'white'}) backgroundColor: string
    @Prop({default: false}) backgroundPush: boolean

    @Watch('value', {immediate: true})
    __value(value) {
      this.nativeValue = value
    }

    @Watch('nativeValue', {immediate: true})
    __nativeValue(nativeValue) {
      if(nativeValue !== this.value){
        this.$emit('input', nativeValue)
      }
    }

    @Watch('codify', {immediate: true})
    __codify(value) {
      this.$nextTick(() => {
        this.$emit('codify', value)
      })
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

    @Watch('memories', {immediate: true})
    __memories(value) {
      this.$nextTick(() => {
        this.$emit('memories', value)
      })
    }

    nativeValue: string | number | null = 'bar'
    nativeResult: string | number | null = null
    nativeError?: string | null = null
    nativeCode: CodeStyle[] | null = null
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

    get previousResult(): Result | undefined {
      return this.previousMemories[this.nativeName]
    }

    get error() {
      const {previousResult, nativeKind, nativeName} = this
      if(previousResult && previousResult.freeze && nativeKind === ''){
        return `TypeError: invalid assignment to const ${nativeName}`
      }
      if(previousResult && nativeKind !== ''){
        return `SyntaxError: Identifier '${nativeName}' has already been declared`
      }
      return undefined
    }

    get memories() {
      return {
        [this.nativeName]: this.result,
      }
    }

    get resultValue() {
      const {previousResult} = this
      const nativeResult: any = this.nativeResult
      const {value: myPreviousValue} = previousResult || {value: undefined}
      switch(this.nativeOperator){
        case '=':
          return nativeResult
        case '=+':
          return myPreviousValue + nativeResult
        case '=%':
          return myPreviousValue % nativeResult
        case '=/':
          return myPreviousValue / nativeResult
        case '=*':
          return myPreviousValue * nativeResult
        case '=-':
          return myPreviousValue - nativeResult
      }
      return nativeResult
    }

    get result() {
      const {nativeKind, resultValue} = this
      return {
        freeze: nativeKind === 'const',
        value: resultValue
      }
    }

    get codify(): CodeStyle[] {
      const result: CodeStyle[] = []
      const {
        nativeKind, kindColor, nameColor, nativeName,
        nativeOperator, operatorColor, nativeCode,
      } = this
      if(nativeKind !== ''){
        result.push({
          color: kindColor,
          value: nativeKind
        })
      }
      result.push({
        color: nameColor,
        value: nativeName
      })
      result.push({
        color: operatorColor,
        value: nativeOperator
      })
      if(nativeCode){
        result.push(...nativeCode)
      }

      return result
    }

    handleCodify(payload) {
      this.nativeCode = payload
    }

    handleResult(payload) {
      this.nativeResult = payload
    }
  }
</script>

