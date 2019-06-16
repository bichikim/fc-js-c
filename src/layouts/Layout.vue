<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header
      q-toolbar
        q-btn(flat round dense @click='leftDrawerOpen = !leftDrawerOpen' aria-label="menu")
          q-icon(name="ion-menu")
        q-toolbar-title JS Basic
    q-drawer(v-model="leftDrawerOpen")
      q-list
        q-expansion-item(icon="ion-snow" label="변수" :contentInsetLevel="contentInsetLevel")
          q-list
            q-item(to="/variable/how-to-save")
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 어떻게 메모리에 저장 할까?
            q-item(clickable)
              q-item-section(avatar)
                q-icon(name="ion-snow")
              q-item-section 변하는 값 변하지 않는 값
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
