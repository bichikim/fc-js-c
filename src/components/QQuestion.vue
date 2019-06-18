<template lang="pug">
  q-card
    q-card-section
      .text-subtitle1.text-grey-8 문제
      .text-h5
        slot(name="title") unknown
    q-separator(v-if="$slots['explanation']")
    q-card-section(v-if="$slots['explanation']")
      .text-subtitle1.text-grey-8 의미
      q-markdown.text-h5
        slot(name="explanation")
    q-card-section
      .text-subtitle1.text-grey-8 코드
      .code-section
        prism-editor(v-model="code" :code="code" language="js")
    q-separator
</template>

<script lang="ts">
  import {
    Component, Vue,
  } from 'vue-property-decorator'
  import hljs from 'highlight.js/lib/highlight'

  @Component
  export default class QQuestion extends Vue {
    code: string = ''
  }
</script>

<style lang="stylus">
  code.hljs.javascript
    background-color rgba(0, 0, 0, 0)
</style>
<style scoped lang="stylus">
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
