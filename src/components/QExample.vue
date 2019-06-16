<template lang="pug">
  q-card
    q-card-section
      .text-subtitle1.text-grey-8 예제
      .text-h5
        slot(name="title") unknown
    q-separator
    q-card-section
      .text-subtitle1.text-grey-8 Javascript
      code.javascript.text-h5
        slot
    q-separator
    q-card-section
      .text-subtitle1.text-grey-8 의미
      q-markdown.text-h5
        slot(name="human-language")
</template>

<script lang="ts">
  import {
    Component, Vue,
  } from 'vue-property-decorator'
  import hljs from 'highlight.js/lib/highlight'

  @Component
  export default class QExample extends Vue {
    mounted(){
      this.highlightBlock()
    }
    updated(){
      this.highlightBlock()
    }

    highlightBlock(){
      this.$el.querySelectorAll('code.javascript').forEach((block) => {
        hljs.highlightBlock(block)
      })
    }
  }
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
