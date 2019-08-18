<template lang="pug">
  q-page(padding)
    q-course
      template(#unit) 값 저장하기
      template(#title) 값을 계산하여 저장 하자
      template(#code-block)
        q-codes(:codes="codes" @chnage="codes = $event")
      template(#code)
        q-codes-display(:codes="codes")
      template(#explanation)
        q-codes-explain(:codes="codes")
      template(#reference)
        q-description(
          title="산술 연산자"
          :row="referenceOperator"
          color="amber"
        )
        q-description(
          title="비교 연산자"
          :row="referenceCompareOperator"
        )
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
  @Component({
    components: {QDescription, QCodesExplain, QCodesDisplay, QCodes, QCourse}
  })
  export default class ChangeMemoryPage extends Vue {
    codes: CodeInfo[] = [
      {transformer: false, structure: {infoKey: 'variableInfo', kind: 'const', name: '상자', operator: '=', value: {
        infoKey: 'calculationInfo', value: ['5', '+', '4']
      }}}
    ]

    referenceOperator = [
      {
        name: '+',
        description: '왼쪽 값과 오른쪽 값을 더한다'
      },
      {
        name: '-',
        description: '왼쪽 값과 오른쪽 값을 더한다'
      },
      {
        name: '*',
        description: '왼쪽 값과 오른쪽 값을 더한다'
      },
      {
        name: '/',
        description: '왼쪽 값과 오른쪽 값을 더한다'
      },
      {
        name: '%',
        description: '왼쪽 값과 오른쪽 값을 더한다'
      },
    ]

    referenceCompareOperator = [
      {
        name: '&&',
        description: '왼쪽이 참이라면 오른쪽'
      },
      {
        name: '||',
        description: '왼쪽이 거짓이라면 오른쪽'
      }
    ]
  }
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
