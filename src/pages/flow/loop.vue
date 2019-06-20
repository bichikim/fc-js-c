<template lang="pug">
  q-page.q-gutter-y-md(padding)
    q-course
      template(slot="title") 흐름 반복 하기
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import QCourse from '@/components/QCourse.vue'

@Component({
  components: {
    QCourse,
  }
})
export default class LoopPage extends Vue {

}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
