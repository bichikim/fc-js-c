<template lang="pug">
  q-page.q-gutter-y-md(padding)
    q-course
      template(#unit) 변수
      template(#title) 어떻게 메모리에 저장 할까?
      .q-gutter-x-md
        q-codes(:codes="[variable]" @change="variable = $event[0]")
      template(slot="code")
        q-codes-display(:codes="[variable]")
      template(slot="explanation")
        q-codes-explain(:codes="[variable]")
      .q-gutter-y-md(slot="reference")
        q-description(
          title="선언 키워드"
          :row="referenceVariableType"
          color="blue"
        )
        q-description(
          title="저장 별명"
          :row="referenceVariable"
          color="cyan"
        )
        q-description(
          title="대입 연산자"
          :row="referenceEqual"
          color="amber"
        )
        q-description(
          title="값"
          :row="referenceValue"
        )
    q-question
      template(slot="title") 아래의 의미를 가지는 코드를 작성 하세요.
      template(slot="explanation") 통장에 돈을 변할 수 있는 값으로 저장 한다.
</template>

<script lang="ts">
  import {
    Component, Vue,
  } from 'vue-property-decorator'
  import {isNaN} from 'lodash'
  import QCourse from '@/components/QCourse.vue'
  import QExample from '@/components/QExample.vue'
  import QBtnChange from '@/components/QBtnChange.vue'
  import QBtnInput from '@/components/QBtnInput.vue'
  import QQuestion from '@/components/QQuestion.vue'
  import QVariable from '@/components/QVariable.vue'
  import QCodesDisplay from '@/components/QCodesDisplay.vue'
  import QCodes from '@/components/QCodes.vue'
  import QCodesExplain from '@/components/QCodesExplain.vue'
  import QDescription from '@/components/QDescription.vue'

  @Component({
    components: {
      QDescription,
      QCodesExplain,
      QCodes,
      QCodesDisplay,
      QVariable,
      QQuestion,
      QBtnInput,
      QBtnChange,
      QCourse,
      QExample,
    },
  })
  export default class HowToSavePage extends Vue {
    variable: any = {kind: 'variable', transformer: false, structure: {kind: 'let', name: '상자', operator: '=', value: '"공"', valueKind: 'value'}}

    referenceColumns = [
      {
        name: 'name',
        label: '표현',
        align: 'left',
        field: 'name',
      },
      {
        name: 'description',
        label: '설명',
        align: 'left',
        field: 'description',
      }
    ]

    referenceVariableType = [
      {
        name: 'let',
        description: '변할 수 있는 저장으로 지정'
      },
      {
        name: 'const',
        description: '변할 수 없는 저장으로 지정'
      }
    ]
    referenceVariable = [
      {
        name: '글자 (키워드 값 X, 숫자로 시작 X)',
        description: '메모리 별명'
      }
    ]

    referenceEqual = [
      {
        name: '=',
        description: '오른 쪽 값을 왼쪽 이름으로 저장'
      }
    ]

    referenceValue = [
      {
        name: '*',
        description: '저장할 값'
      }
    ]
  }
</script>
<style lang="stylus">
  .reference-variable-type
    .q-table__top
      background-color $blue
      color white
  .reference-variable
    .q-table__top
      background-color $cyan
      color white
  .reference-equal
    .q-table__top
      background-color $amber
      color white
  .reference-value-number
    .q-table__top
      background-color $red
      color white
  .reference-value-string
    .q-table__top
      background-color $green
      color white
</style>
<style scoped lang="stylus">
  .title
    text-transform capitalize

</style>
