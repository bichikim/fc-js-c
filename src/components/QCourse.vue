<template lang="pug">
  q-card
    q-parallax(
      :height="150"
      )
      template(#media)
        img(src="~assets/background.jpg")
      h3.text-white.banner
        slot(name="title") unknown
    q-separator(v-if="$slots.default")
    q-card-section(v-if="$slots.default")
      .text-subtitle1.text-grey-8 구문
      .text-h6.q-pa-md
        slot
    q-separator(v-if="$slots.code")
    q-card-section(v-if="$slots.code")
      .text-subtitle1.text-grey-8 코드
      prism-editor.text-h6(
        :code="code.text"
        :key="index"
        :value="code.text"
        language="js"
        readonly
        v-for="(code, index) in $slots.code"
        )
    q-separator(v-if="$slots.explanation")
    q-card-section(v-if="$slots.explanation")
      .text-subtitle1.text-grey-8 의미
      .text-h6.q-pa-md
        slot(name="explanation")
    q-separator(v-if="$slots.reference")
    q-card-section(v-if="$slots.reference")
      .text-subtitle1.text-grey-8 참고
      .text-h6.q-pa-md
        slot(name="reference")
</template>

<script lang="ts">
  import {
    Component, Vue, Watch
  } from 'vue-property-decorator'

  @Component
  export default class QCourse extends Vue {
  }
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
