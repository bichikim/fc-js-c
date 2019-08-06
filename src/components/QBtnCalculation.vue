<template lang="pug">
  .q-btn-calculation(
  )
    template(v-for="item in nativeCalculates")
      slot(name="calculate" v-bind="bindCalculate")
        q-btn-input.pad(:push="push" v-if="isValue(item)" :value="item")
        q-btn-change.pad(:push="push" v-else :list="operators" :value="item")
    slot(name="add-operator-btn" v-if="!isLastValue")
      q-btn-input.pad(dense :push="push" icon="ion-add" :color="addValueColor")
    slot(name="add-value-btn" v-else)
      q-btn.pad(dense :push="push" icon="ion-add" :color="addOperatorsColor")
        q-popup-proxy
          q-list
            template(v-for="operator in operators")
              q-item(clickable v-close-popup @click="onAddOperator(operator)")
                q-item-section
                  q-item-label {{operator}}
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
  import {last} from 'lodash'
  import QBtnInput from '@/components/QBtnInput.vue'
  import QBtnChange from '@/components/QBtnChange.vue'



  @Component({
    components: {
      QBtnChange,
      QBtnInput,
    }
  })
  export default class QBtnCalculation extends Vue {
    @Prop() push: boolean
    @Prop() value: string
    @Prop({default: 'green'}) valueStringColor: string
    @Prop({default: 'red'}) valueNumberColor: string
    @Prop({default: 'blue'}) valueKeyColor: string
    @Prop({default: 'blue'}) addOperatorsColor: string
    @Prop({default: 'green'}) addValueColor: string

    nativeValue: string = ''
    nativeCalculates: string[] = []
    operators: string[] = ['+', '-', '*', '/', '%', '||', '&&']

    @Watch('value', {immediate: true})
    __value(value) {
      this.nativeValue = value
      this.nativeCalculates = this.nativeValue.split(' ')
    }

    isValue(value?: string): boolean {
      if(!value){
        return true
      }
      return this.operators.findIndex((operator: string) => (operator === value)) < 0
    }

    bindCalculate(item) {
      return {value: item}
    }

    get isLastValue() {
      return this.isValue(last(this.nativeCalculates))
    }

    onAddOperator(operator) {
      this.nativeCalculates.push(operator)
    }

  }
</script>
