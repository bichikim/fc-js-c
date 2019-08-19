<template lang="pug">
  q-page(padding)
    q-course
      template(#unit) Javascript 세상
      template(#title) Javascript 소개
      .section
        .text-h5 시작은 미약하나 끝은 장대하리
        .text-subtitle1 내용
      .section
        .text-h5 모든 시작엔 engine 8
      .section
        .text-h5 그리고 Node js
      .section
        .text-h5 Web / Server / App
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import QCourse from '@/components/QCourse.vue'



@Component({
  components: {
    QCourse,
  },
})
export default class IntroPage extends Vue {

}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
