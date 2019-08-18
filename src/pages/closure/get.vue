<template lang="pug">
  q-page(padding)
    q-course
      template(#unit) 값 가져오기
      template(#title) 다른 변수 값을 가져오기
      template(#code-block)
        q-codes(:codes="codes" @change="codes = $event")
      template(#code)
        q-codes-display(:codes="codes")
      template(#explanation)
        q-codes-explain(:codes="codes")
      template(#reference)
        q-description(
          title="정의 순서"
          :row="referenceOrder"
        )
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
export default class ClosureGetPage extends Vue {
  codes: CodeInfo[] = [
    {transformer: false, structure: {kind: 'const', infoKey: 'variableInfo', name: 'foo', operator: '=', value: 50}},
    {transformer: false, structure: {kind: 'const', infoKey: 'variableInfo', name: 'bar', operator: '=', value: 70}},
    {transformer: false, structure: {kind: 'const', infoKey: 'variableInfo', name: 'john', operator: '=', value: {
      infoKey: 'calculationInfo', value: ['foo', '+', 'bar']
    }}}
  ]

  referenceOrder = [
    {
      name: 'up ~ down',
      description: '위에서 아래로 정의 된 것을 들고 올 수 있다.'
    }
  ]
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
