<template lang="pug">
  q-card.q-course
    q-parallax(
      :height="150"
      )
      template(#media)
        img(src="~assets/background.jpg")
      .unit(v-if="$slots.unit")
        .text-white.text-subtitle1.q-pa-md.text-light
            slot(name="unit")
      h3.text-white.banner.text-light
        slot(name="title") unknown
    q-separator(v-if="$slots['code-block']")
    q-card-section(v-if="$slots['code-block']")
      .text-subtitle1.text-grey-8 코드 블럭
      slot(name="code-block")
    q-separator(v-if="$slots.code")
    q-card-section(v-if="$slots.code")
      .text-subtitle1.text-grey-8 코드
      slot(name="code")
    q-separator(v-if="$slots.explanation")
    q-card-section(v-if="$slots.explanation")
      .text-subtitle1.text-grey-8 의미
      slot(name="explanation")
    q-separator(v-if="$slots.result")
    q-card-section(v-if="$slots.result")
      .text-subtitle1.text-grey-8 결과
      slot(name="result")
    q-separator(v-if="$slots.reference")
    q-card-section(v-if="$slots.reference")
      .text-subtitle1.text-grey-8 참고
      .q-gutter-y-md
        slot(name="reference")
    slot
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend()
</script>

<style scoped lang="stylus">
  .q-course
    position relative
  .unit
    position absolute
    left 0
    top 0
</style>
