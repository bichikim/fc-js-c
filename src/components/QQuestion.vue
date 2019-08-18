<template lang="pug">
  q-card
    q-card-section
      .text-subtitle1.text-grey-8 문제
      slot(name="title") unknown
    q-separator(v-if="$slots['explanation']")
    q-card-section(v-if="$slots['explanation']")
      .text-subtitle1.text-grey-8 의미
      q-markdown
        slot(name="explanation")
    q-separator(v-if="$slots['result']")
    q-card-section(v-if="$slots['result']")
      .text-subtitle1.text-grey-8 결과
      div
        slot(name="result")
    q-separator
    q-card-section
      .text-subtitle1.text-grey-8 코드
      .code-section
        prism-editor(v-model="nativeCode" :code="nativeCode" language="js")
    q-separator(v-if="codeResult")
    q-card-section(v-if="codeResult")
      .text-subtitle1.text-grey-8 코드 결과
      div
        slot(name="code-result" :code="nativeCode")
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator'

  @Component
  export default class QQuestion extends Vue {
    @Prop({default: ''}) code: string
    @Prop({default: false}) codeResult: boolean

    @Watch('code', {immediate: true})
    __code(value) {
      this.nativeCode = value
    }

    nativeCode: string = ''
  }
</script>

<style lang="stylus">
  code.hljs.javascript
    background-color rgba(0, 0, 0, 0)
</style>
<style lang="stylus" scoped>
  .code-section
    position relative

    .input
      position relative
      left 0
      top 0

    .code
      position absolute
      pointer-events none
      width 100%
      left 0
      top 0
</style>
