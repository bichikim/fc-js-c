<template lang="pug">
  q-btn(v-bind="$attrs")
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator'

@Component
export default class QBtnInput extends Vue {

}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
