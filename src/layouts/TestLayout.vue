<template lang="pug">
  q-layout
    q-page-container
      router-view
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'

@Component
export default class TestLayout extends Vue {

}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
