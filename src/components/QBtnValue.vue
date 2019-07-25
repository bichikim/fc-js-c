<template lang="pug">
  .div
    q-btn.bg-white(dense v-if="valueKind === 'string'" :push="push" :label="stringQuotation")
    q-btn-input(:push="push" :color="nativeValueColor" v-model="nativeValue")
    q-btn.bg-white(dense v-if="valueKind === 'string'" :push="push" :label="stringQuotation")
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator'
import QBtnInput from '@/components/QBtnInput.vue'
@Component({
  components: { QBtnInput }
})
export default class QBtnValue extends Vue {
  @Prop() value: any
  @Prop({default: 'green'}) valueStringColor: string
  @Prop({default: 'red'}) valueNumberColor: string
  @Prop({default: 'blue'}) valueKeyColor: string
  @Prop({default: '"'}) stringQuotation: '"' | '\''
  @Prop({default: true}) push: boolean

  nativeValue: string | number | null = 'bar'

  @Watch('value', {immediate: true})
  __value(value) {
    this.nativeValue = value
  }

  @Watch('codify', {immediate: true})
  __checkChange() {
    this.$emit('change-code', {
      color: this.nativeValueColor,
      value: this.nativeValue,
    })
  }

  get codify() {
    return {
      color: this.nativeValueColor,
      value: this.nativeValue,
    }
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

  get valueKind() {
    if(this.nativeValue === 'true' || this.nativeValue === 'false'){
      return 'boolean'
    }
    if(this.nativeValue === 'null'){
      return 'null'
    }
    return typeof this.nativeValue
  }

}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
