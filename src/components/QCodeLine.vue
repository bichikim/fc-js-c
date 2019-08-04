<template lang="pug">
  div
    span(
      v-for="(code, index) in codes"
      :class="{[`text-${code.color}`]: true}"
      :key="code.value"
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
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
