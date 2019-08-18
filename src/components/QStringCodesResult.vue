<template lang="pug">
  .q-string-codes-result
    template(v-for="item in resultList")
      q-chip(removable :key="item.name" @remove="removeWatcher(item.name)") {{`${item.name}: ${item.value}`}}
    q-btn-input(:push="push" value="" dense @change="addWatcher" :init-after-change="true")
      q-icon(name="add" )
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator'
import {codeRunner} from './code-runner'
import QBtnInput from '@/components/QBtnInput.vue'

@Component({
  components: {QBtnInput}
})
export default class QStringCodesResult extends Vue {
  @Prop({default: ''}) codes: string
  @Prop({default: true}) push: boolean
  @Prop({default: () => ([])}) watchers: string[]

  @Watch('watchers', {immediate: true})
  __watchers() {
    this.nativeWatchers = this.watchers
  }

  nativeWatchers: string[] = []

  errorWatchers: string[] = ['__error', '__column', '__line']

  get resultList() {
    const watchers = [...this.nativeWatchers, ...this.errorWatchers]
    const result = codeRunner(this.codes, this.nativeWatchers)
    return watchers.reduce<Array<{name: string, value: any}>>((_result, key) => {
      const value = result[key]
      if(!value){
        return _result
      }
      _result.push({
        name: key,
        value: result[key],
      })
      return _result
    }, [])
  }

  addWatcher(value) {
    this.nativeWatchers.push(value)
  }

  removeWatcher(value){
    const index = this.nativeWatchers.findIndex((item) => (item === value))
    this.nativeWatchers.splice(index, 1)
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
