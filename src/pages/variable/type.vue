<template lang="pug">
  q-page.q-gutter-y-md(padding)
    q-course
      template(slot="title") 값을 계산하여 저장 하자
</template>

<script lang="ts">
  import {
    Component, Prop, Vue,
  } from 'vue-property-decorator'
  import QCourse from '@/components/QCourse.vue'
  @Component({
    components: { QCourse }
  })
  export default class TypePage extends Vue {

  }
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
