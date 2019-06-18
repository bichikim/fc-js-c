<template lang="pug">
  q-card
    q-parallax(
      src="https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_960_720.png"
      :height="150"
      )
      h3.text-white.banner
        slot(name="title") unknown
    q-separator(v-if="$slots.default")
    q-card-section(v-if="$slots.default")
      .text-subtitle1.text-grey-8 구문
      .text-h5
        slot
    q-separator(v-if="$slots.code")
    q-card-section(v-if="$slots.code")
      .text-subtitle1.text-grey-8 코드
      prism-editor(
        :code="code.text"
        :key="index"
        :value="code.text"
        language="js"
        readonly
        v-for="(code, index) in $slots.code"
        )
    q-separator
    q-card-section(v-if="$slots.explanation")
      .text-subtitle1.text-grey-8 설명
      slot(name="explanation")
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
