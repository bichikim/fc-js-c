<template lang="pug">
  .main
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import {VariableKind, Operator, ValueKind} from './_QVariable'
import {getKindColor} from './_QBtnValue'


import {CodeStyle} from './types'

@Component
export default class QVariableCodeLine extends Vue {
  @Prop({default: 'bar'}) value: any
  @Prop({default: 'value'}) valueKind: ValueKind
  @Prop({default: true}) push: boolean
  @Prop({default: 'const'}) kind: VariableKind
  @Prop({default: 'foo'}) name: string
  @Prop({default: '='}) operator: Operator
  @Prop({default: 'blue'}) kindColor: string
  @Prop({default: 'cyan'}) nameColor: string
  @Prop({default: 'amber'}) operatorColor: string
  @Prop({default: 'green'}) valueStringColor: string
  @Prop({default: 'red'}) valueNumberColor: string
  @Prop({default: 'blue'}) valueKeyColor: string

  get codeLine(): CodeStyle[] {
    const {value, kind, name, kindColor, valueKeyColor, valueKind, valueNumberColor, nameColor,
    operator, operatorColor, valueStringColor
    } = this
    let valueColor
    switch(typeof value){
      case 'boolean':
        valueColor = valueKeyColor
         break
      case 'string':
        valueColor = valueStringColor
        break
      case 'number':
        valueColor = valueNumberColor
        break
      default:
        valueColor = valueKeyColor
    }
    return [
      {color: kindColor, value: kind},
      {color: nameColor, value: name},
      {color: operatorColor, value: operator},
      {color: valueColor, value}
    ]
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
