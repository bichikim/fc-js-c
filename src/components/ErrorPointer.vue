<template lang="pug">
  .main
    white-space(:content="errorString")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import WhiteSpace from '@/components/WhiteSpace.vue'
@Component({
  components: {WhiteSpace}
})
export default class ErrorPointer extends Vue {
  get errorString() {
    return ''
  }
}
</script>

<style scoped lang="stylus">
  .main
    pointer-events none
    display none
    // background-color aqua
    width 100%
    height 100%
    // opacity 0.4
    padding 14px
    font-size 1em
    font-family: monospace, monospace
</style>
