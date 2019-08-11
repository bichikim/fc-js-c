<template lang="pug">
  .q-btn-calculation(
  )
    template(v-for="(item, index) in nativeValue")
      slot(name="calculate" v-bind="bindCalculate")
        q-btn-value.pad(
          :push="push"
          v-if="isValue(item)"
          :value="item"
          @input="changeValue(index, $event)"
          :close="index === nativeValue.length - 1 && index !== 0"
          @close="removeValue(index)"
          )
        q-btn-change.pad(
          :push="push"
          v-else
          :list="operators"
          :value="item"
          @input="changeValue(index, $event)"
          :close="index === nativeValue.length - 1"
          @close="removeValue(index)"
          )
    slot(name="add-operator-btn" v-if="!isLastValue")
      q-btn-input.pad(dense :push="push" icon="ion-add" :color="addValueColor" @change="addValue")
    slot(name="add-value-btn" v-else)
      q-btn.pad(dense :push="push" icon="ion-add" :color="addOperatorsColor")
        q-popup-proxy
          q-list
            template(v-for="operator in operators")
              q-item(clickable v-close-popup @click="addValue(operator)")
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
  import QBtnValue from '@/components/QBtnValue.vue'
  import QBtnChange from '@/components/QBtnChange.vue'
  import QBtnInput from '@/components/QBtnInput.vue'




  @Component({
    components: {
      QBtnChange,
      QBtnValue,
      QBtnInput,
    }
  })
  export default class QCalculation extends Vue {
    @Prop() push: boolean
    @Prop() value: string[]
    @Prop({default: 'green'}) valueStringColor: string
    @Prop({default: 'red'}) valueNumberColor: string
    @Prop({default: 'blue'}) valueKeyColor: string
    @Prop({default: 'blue'}) addOperatorsColor: string
    @Prop({default: 'green'}) addValueColor: string

    nativeValue: string[] = []
    operators: string[] = ['+', '-', '*', '/', '%', '||', '&&']

    @Watch('value', {immediate: true})
    __value(value) {
      this.nativeValue = value
    }

    @Watch('nativeValue')
    __nativeValue(value) {
      this.$emit('input', value)
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
      return this.isValue(last(this.nativeValue))
    }

    removeValue(index) {
      this.nativeValue.splice(index, 1)
    }

    changeValue(index, value){
      this.nativeValue.splice(index, 1, value)
    }

    addValue(operator) {
      this.nativeValue.push(operator)
    }

  }
</script>
