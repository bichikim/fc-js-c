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
        q-expansion-item(icon="ion-snow" label="변수" :contentInsetLevel="contentInsetLevel")
          q-list
            q-item(to="/variable/variable")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 어떻게 메모리에 저장 할까?
            q-item(to="/variable/calculate")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 값을 계산하여 저장 하자
        q-expansion-item(icon="ion-snow" label="흐름 제어" :contentInsetLevel="contentInsetLevel")
          q-list
            q-item(to="/flow/if")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 조건에 의한 흐름 제어 하기
            q-item(to="/flow/loop")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 흐름 반복 하기
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
