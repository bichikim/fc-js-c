<template lang="pug">
  q-card
    q-parallax(
      src="https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_960_720.png"
      :height="150"
      )
      h3.text-white.banner
        slot(name="title") unknown
    q-separator
    q-card-section
      .text-subtitle1.text-grey-8 구문
      .text-h5
        slot
    q-separator
    q-card-section
      .text-subtitle1.text-grey-8 설명
      slot(name="explanation")
</template>

<script lang="ts">
  import {
    Component, Vue,
  } from 'vue-property-decorator'
  import hljs from 'highlight.js/lib/highlight'

  @Component
  export default class QCourse extends Vue {
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
