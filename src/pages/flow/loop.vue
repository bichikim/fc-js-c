<template lang="pug">
  q-page(padding)
    q-course
      template(#unit) 흐름 제어
      template(#title) 흐름 반복 하기
      template(#code-block)
        q-codes(:codes="codes" @change="chodes = $evnet")
      template(#code)
        q-codes-display(:codes="codes")
      template(#explanation)
        q-codes-explain(:codes="codes")
      template(#reference)
        q-description
</template>

<script lang="ts">
  import {
    Component, Prop, Vue,
  } from 'vue-property-decorator'
  import QCodes from '@/components/QCodes.vue'
  import QCourse from '@/components/QCourse.vue'
  import {CodeInfo} from '@/components/_QCodes'
  import QDescription from '@/components/QDescription.vue'
  import QCodesDisplay from '@/components/QCodesDisplay.vue'
  import QCodesExplain from '@/components/QCodesExplain.vue'




  @Component({
    components: {
      QDescription,
      QCodes, QCourse, QCodesDisplay, QCodesExplain
    }
  })
  export default class LoopPage extends Vue {
    codes: CodeInfo[] = [

    ]
  }
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
