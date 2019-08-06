<template lang="pug">
  div
    template(v-for="(code, index) in codes")
      slot(name="default" v-bind="bindDefault(code)")
        span(
          :class="{[`text-${code.color}`]: true}"
          :key="code.value + index"
          ) {{code.value + ((codes.length - 1) === index ? '' : ' ')}}

</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import {CodeStyle} from './types'

@Component
export default class QCodeLine extends Vue {
  @Prop() codes: CodeStyle[]

  bindDefault(item) {
    return {code: item}
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
