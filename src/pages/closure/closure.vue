<template lang="pug">
  q-page(padding)
    q-course
      template(#unit) 값 가져오기
      template(#title) 이웃한 스코프에서 값 가져오기
      template(#code-block)
        q-codes(:codes="codes" @change="chodes = $event")
      template(#code)
        q-codes-display(:codes="codes")
      template(#explanation)
        q-codes-explain(:codes="codes")
      template(#reference)
        q-description(
          title="스코프 탐색"
          :row="referenceScope"
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
export default class GetPage extends Vue {
  codes: CodeInfo[] = [
    {transformer: false, structure: {kind: 'const', infoKey: 'variableInfo', name: 'foo', operator: '=', value: 50}},
    {transformer: false, structure: {kind: 'let', infoKey: 'variableInfo', name: 'bar', operator: '=', value: 70}},
    {structure: {infoKey: 'scopeInfo', codes: [
          {transformer: false, structure: {kind: '', infoKey: 'variableInfo', name: 'bar', operator: '=', value: {
                infoKey: 'calculationInfo', value: ['foo', '+', 'bar']
              }}},
        ]}},
  ]

  referenceScope = [
    {
      name: '찾는 순서',
      description: '스코프 안에서 변수 이름을 찾기 -> 없다면 -> 스코프 한단계 밖의 변수 이름 찾기'
    }
  ]
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
