<template lang="pug">
  q-page(padding).q-gutter-y-md
    q-course
      template(#unit) 값 저장하기
      template(#title) 저장한 값을 변경하여 보자
      template(#code-block)
        q-codes(:codes="codes" @change="codes = $event")
      template(#code)
        q-codes-display(:codes="codes")
      template(#explanation)
        q-codes-explain(:codes="codes")
      template(#reference)
        q-description(
          title="대입 연산자"
          :row="referenceOperator"
          color="amber"
        )
    q-question(code="let 바다 = \"고기\"\nlet 대지 = \"물고기\"" :code-result="true")
      template(#title) 아래의 코드에 코드를 추가하여 아래의 결과를 출력 하도록 작성 하세요 (미리 작성된 코드는 변경 하지마세요)
      template(#result)
        q-chip 바다: 물고기
        q-chip 대지: 고기
      template(#code-result="{code}")
        q-string-codes-result(:codes="code" :watchers="['바다', '대지']")
    q-question(code="let 사과_개수 = 5\n사과_개수 += 3" :code-result="true")
      template(#title) 아래의 코드에 결과 값을 쓰세요.
      template(#code-result="{code}")
        q-input(label="사과_개수")


</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import QCourse from '@/components/QCourse.vue'
import QCodes from '@/components/QCodes.vue'
import {CodeInfo} from '@/components/_QCodes'
import QCodesDisplay from '@/components/QCodesDisplay.vue'
import QCodesExplain from '@/components/QCodesExplain.vue'
import QDescription from '@/components/QDescription.vue'
import QQuestion from '@/components/QQuestion.vue'
import QStringCodesResult from '@/components/QStringCodesResult.vue'
@Component({
  components: {QStringCodesResult, QQuestion, QDescription, QCodesExplain, QCodesDisplay, QCodes, QCourse}
})
export default class ChangeMemoryPage extends Vue {
  codes: CodeInfo[] = [
    {transformer: false, structure: {infoKey: 'variableInfo', kind: 'let', name: '상자', operator: '=', value: '"공"', }},
    {transformer: false, structure: {infoKey: 'variableInfo', kind: '', name: '상자', operator: '=', value: '"글러브"', }}
  ]

  referenceOperator = [
    {
      name: '=',
      description: '오른 쪽 값을 왼쪽 이름으로 저장'
    },
    {
      name: '+=',
      description: '왼쪽 이름으로 저장된 값에 오른 쪽 값을 더한 값을 왼쪽 이름으로 저장'
    },
    {
      name: '-=',
      description: '왼쪽 이름으로 저장된 값에 오른 쪽 값을 뺀 값을 왼쪽 이름으로 저장'
    },
    {
      name: '*=',
      description: '왼쪽 이름으로 저장된 값에 오른 쪽 값을 곱한 값을 왼쪽 이름으로 저장'
    },
    {
      name: '/=',
      description: '왼쪽 이름으로 저장된 값에 오른 쪽 값을 나눈 값을 왼쪽 이름으로 저장'
    },
    {
      name: '%=',
      description: '왼쪽 이름으로 저장된 값에 오른 쪽 값을 나눈 나머지 값을 왼쪽 이름으로 저장'
    },
  ]

}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
