<template lang="pug">
  q-page.q-gutter-y-md(padding)
    q-course
      template(slot="unit") 변수
      template(slot="title") 어떻게 메모리에 저장 할까?
      .q-gutter-x-md
        q-btn-change(push :list="['let', 'const']" color="blue" v-model="variableType")
        q-btn-input(push color="cyan" v-model="variableName")
        q-btn(push color="amber" :label="equal")
        q-btn(dense push v-if="!isNumeric" label="\"")
        q-btn-input(push :color="isNumeric ? 'red' : 'green'" v-model="value")
        q-btn(dense push v-if="!isNumeric" label="\"")
      template(slot="code") {{code}}
      template(slot="explanation") {{explanation}}
      .q-gutter-y-md(slot="reference")
        q-table(
          flat
          bordered
          class="reference-variable-type"
          title="선언 키워드"
          hide-bottom
          hide-header
          :columns="referenceColumns"
          :data="referenceVariableType"
          row-key="name"
        )
        q-table(
          flat
          bordered
          class="reference-variable"
          title="저장 별명"
          hide-bottom
          hide-header
          :columns="referenceColumns"
          :data="referenceVariable"
          row-key="name"
        )
        q-table(
          flat
          bordered
          class="reference-equal"
          title="대입 연산자"
          hide-bottom
          hide-header
          :columns="referenceColumns"
          :data="referenceEqual"
          row-key="name"
        )
        q-table(
          flat
          bordered
          :class="isNumeric ? 'reference-value-number' : 'reference-value-string'"
          title="값"
          hide-bottom
          hide-header
          :columns="referenceColumns"
          :data="referenceValue"
          row-key="name"
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

  @Component({
    components: {
      QQuestion,
      QBtnInput,
      QBtnChange,
      QCourse,
      QExample,
    },
  })
  export default class HowToSavePage extends Vue {
    variableName: string = '상자'
    variableType: string = 'let'
    value: string = '공'
    equal: string = '='

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
        name: '*',
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

    get isNumeric(){
      return !isNaN(Number(this.value))
    }

    get saveWay() {
      return this.variableType === 'let' ? '변할 수 있는 값으로' : '변하지 않는 값으로'
    }

    get code(){
      const quoted = this.isNumeric ? '' : '"'
      return `${this.variableType } ${this.variableName} = ${quoted}${this.value}${quoted}`
    }

    get explanation(){
      return `${this.variableName}에 ${this.value}을 ${this.saveWay} 저장 하라`
    }
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
