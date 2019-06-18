<template lang="pug">
  q-page.q-gutter-y-md(padding)
    q-course
      .unit(slot="unit") 변수
      .title(slot="title") 어떻게 메모리에 저장 할까?
      .q-gutter-x-md
        q-btn-change(push :list="['let', 'const']" color="red" v-model="variableType")
        q-btn-input(push color="blue" v-model="variableName")
        q-btn(push color="purple" :label="equal")
        q-btn(dense push v-if="!isNumeric" label="\"")
        q-btn-input(push color="green" v-model="value")
        q-btn(dense push v-if="!isNumeric" label="\"")
      template(slot="code") {{code}}
      template(slot="explanation") {{explanation}}
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

<style scoped lang="stylus">
  .title
    text-transform capitalize
</style>
