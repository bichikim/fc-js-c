<template lang="pug">
  q-page.q-gutter-y-md(padding)
    q-course
      template(slot="title") 조건에 의한 흐름 하기
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
export default class IfPage extends Vue {

}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
