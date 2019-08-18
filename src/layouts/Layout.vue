<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header
      q-toolbar
        q-btn(flat round dense @click='leftDrawerOpen = !leftDrawerOpen' aria-label="menu")
          q-icon(name="ion-menu")
        q-toolbar-title(@click="$router.push('/')") JS Basic
    q-drawer(v-model="leftDrawerOpen")
      q-list
        q-item(to="/#")
          q-item-section(avatar)
            q-icon(name="ion-home")
          q-item-section 홈
        q-expansion-item(icon="ion-snow" label="Javascript 세상" :contentInsetLevel="contentInsetLevel")
          q-list
            q-item(to="/javascript/server")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 서버
            q-item(to="/javascript/ai")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 인공지능
            q-item(to="/javascript/app")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 웹 / 모바일 / 테스크탑
        q-expansion-item(icon="ion-snow" label="프로그래밍" :contentInsetLevel="contentInsetLevel")
          q-list
            q-item(to="/programming/difference")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 프로그래밍 언어와 자연어 차이
            q-item(to="/programming/what-can-do")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 프로그래밍 언어가 하는 일
        q-expansion-item(icon="ion-snow" label="값 저장하기" :contentInsetLevel="contentInsetLevel")
          q-list
            q-item(to="/variable/variable")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 어떻게 메모리에 저장 할까?
            q-item(to="/variable/change-memory")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 저장한 값을 변경하여 보자
            q-item(to="/variable/calculate")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 값을 계산하여 저장 하자
            q-item(to="/variable/type")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 값에는 형식이 있다.
        q-expansion-item(icon="ion-snow" label="값 가져오기" :contentInsetLevel="contentInsetLevel")
          q-list
            q-item(to="/closure/get")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 다른 변수 값을 가져오기
            q-item(to="/closure/scope")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 가져올수 있는 범위 스코프
            q-item(to="/closure/closure")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 이웃한 스코프에서 값 가져오기
        q-expansion-item(icon="ion-snow" label="흐름 제어" :contentInsetLevel="contentInsetLevel")
          q-list
            q-item(to="/flow/flow")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 코드 기본 흐름
            q-item(to="/flow/if")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 조건에 의한 흐름 제어
            q-item(to="/flow/loop")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 흐름 반복 하기
        q-expansion-item(icon="ion-snow" label="코드 묶음" :contentInsetLevel="contentInsetLevel")
          q-list
            q-item(to="/function/function")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 함수로 코드 묶음 만들기
            q-item(to="/function/object")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 오브젝트로 코드 묶음 만들기
            q-item(to="/function/class")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 클래스로 코드 묶음 만들기
        q-expansion-item(icon="ion-snow" label="언어 더 알기" :contentInsetLevel="contentInsetLevel")
          q-list
            q-item(to="/deep-dive/hoisting")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section Hoisting
            q-item(to="/deep-dive/symbol")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section Symbol
            q-item(to="/deep-dive/prototype")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section Prototype
            q-item(to="/deep-dive/error")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section Error
            q-item(to="/deep-dive/destructuring-assignment")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section Destructuring Assignment

    q-page-container
      router-view
</template>
<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      contentInsetLevel: 0.5
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
