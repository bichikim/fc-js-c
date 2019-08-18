<template lang="pug">
  q-page(padding)
    q-course
      template(#unit) 값 저장하기
      template(#title) 값에는 형식이 있다
      template(#code-block)
        q-codes(:codes="codes" @change="codes = $event")
      template(#code)
        q-codes-display(:codes="codes")
      template(#explanation)
        q-codes-explain(:codes="codes")
      template(#reference)
        q-description(
          title="숫자(Number) 타입"
          :row="referenceNumber"
          color="red"
        )
        q-description(
          title="문자(String) 타입"
          :row="referenceString"
          color="green"
        )
        q-description(
          title="불린(Boolean) 타입"
          :row="referenceBoolean"
          color="blue"
        )
        q-description(
          title="null 타입"
          :row="referenceNull"
          color="blue"
        )
        q-description(
          title="undefined 타입"
          :row="referenceUndefined"
          color="blue"
        )
        q-description(
          title="함수(Function) 타입"
          :row="referenceFunction"
          color="blue"
        )
        q-description(
          title="객체(Object) 타입"
          :row="referenceObject"
        )
        q-description(
          title="배열(Array) 타입"
          :row="referenceArray"
        )
</template>

<script lang="ts">
  import {
    Component, Prop, Vue,
  } from 'vue-property-decorator'
  import QCourse from '@/components/QCourse.vue'
  import TestLayout from '@/layouts/TestLayout.vue'
  import QCodesDisplay from '@/components/QCodesDisplay.vue'
  import QCodesExplain from '@/components/QCodesExplain.vue'
  import {CodeInfo} from '@/components/_QCodes'
  import QCodes from '@/components/QCodes.vue'
  import QDescription from '@/components/QDescription.vue'


  @Component({
    components: {QDescription, QCodesExplain, QCodesDisplay, TestLayout, QCourse, QCodes}
  })
  export default class TypePage extends Vue {
    codes: CodeInfo[] = [
      {transformer: false, structure: {infoKey: 'variableInfo', kind: 'let', name: '상자', operator: '=', value: 10}}
    ]

    referenceNumber = [
      {
        name: '-9 ~ 9',
        description: '정수 / 음의 정수 (10, 1, 94 )'
      },
      {
        name: '-9.9999 ~ 9.9999',
        description: '부동소수점 (10.10, 1.56, 94.01)'
      },
      {
        name: 'NaN',
        description: '숫자 조작에 실패 했을 경우 숫자가 아닌 값 (Number(\'foo\'))'
      },
      {
        name: 'Infinity',
        description: '양의 무한대 (음은 -Infinity) (10 / 0)'
      }
    ]

    referenceString = [
      {
        name: '\'abc\' "ㄱㄴㄷ" `#$@`',
        description: '문자'
      },
      {
        name: '\\ \\\' \n',
        description: '코드와 인식이 어려운 문자를 입력 할 때 사용'
      }
    ]

    referenceBoolean = [
      {
        name: 'true false',
        description: '참 거짓'
      }
    ]

    referenceNull = [
      {
        name: 'null',
        description: '빈 값 (메모리에 비어 있는 값이라는 값이 저장 되어 있음)'
      }
    ]

    referenceUndefined = [
      {
        name: 'undefined',
        description: '메모레가 비어 있음'
      }
    ]

    referenceFunction = [
      {
        name: '() => {}',
        description: '선언 시 상위 스코프의 this 가 반인딩 됨 bind 할 수 없음'
      },
      {
        name: 'function name() {}',
        description: '동적으로 this 를 반인딩 할 수 있다'
      }
    ]

    referenceObject = [
      {
        name: 'const foo = {...}',
        description: '키(key) 와 값(value)을 쌍으로 정의 하는 값 묶음 ({foo: 1, bar: 3, john: 90})',
      },
      {
        name: 'const foo = new Foo(...)',
        description: '클래스 생성자를 통해 생성된 키(key) 와 값(value)을 쌍으로 정의 하는 값 묶음 ({foo: 1, bar: 3, john: 90})',
      }
    ]

    referenceArray = [
      {
        name: 'const foo = []',
        description: '연속된 자료형 ([\'foo\', \'bar\', \'john\' ])'
      }
    ]
  }
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
