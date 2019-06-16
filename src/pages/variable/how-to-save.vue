<template lang="pug">
  q-page.q-gutter-y-md(padding)
    q-course
      .unit(slot="unit") 변수
      .title(slot="title") 어떻게 메모리에 저장 할까?
      .q-gutter-x-md
        q-btn-change(push :list="['let', 'const']" color="red")
        q-btn-input(push)
    q-example
      template(slot="title") 정적 저장
      template const 종류 = '고양이'
      template(slot="human-language") `고양이` 라는 값을 `종류` 라는 이름으로 변하지 않는 저장소에 저장해라
</template>

<script lang="ts">
  import {
    Component, Vue,
  } from 'vue-property-decorator'
  import QCourse from '@/components/QCourse.vue'
  import QExample from '@/components/QExample.vue'
  import QBtnChange from '@/components/QBtnChange.vue'
  import QBtnInput from '@/components/QBtnInput.vue'

  @Component({
    components: {
      QBtnInput,
      QBtnChange,
      QCourse,
      QExample,
    },
  })
  export default class HowToSavePage extends Vue {

  }
</script>

<style scoped lang="stylus">
  .title
    text-transform capitalize
</style>
