<template lang="pug">
  .q-function(
    @mouseover="onMouseover"
    @mouseout="onMouseout")
    q-btn-transformer(
      :list="['function', 'arrow function']"
      v-model="nativeFunctionKind"
      )
      template(#select-function="{color, push}")
        q-btn.pad(label="function" :push="push" :color="keyColor" no-caps)
        q-btn-input.pad(:push="push" dense placeHolder="+" v-show="showName" @show="onShow" @hide="onHide" @change="onNameChange")
        q-btn(label="(" :push="push" :color="keyColor" no-caps dense)
        q-btn-group(:push="push")
          q-btn-input(:push="push")
        q-btn.pad(label=")" :push="push" :color="keyColor" no-caps dense)
        q-btn(label="{" :push="push" :color="keyColor" dense no-caps)
        q-codes
        br
        q-btn(label="}" :push="push" :color="keyColor" dense no-caps)
</template>

<style scoped lang="stylus">
  .perms
    display inline-block

  .enter
    display block

  .pad:first-child
    margin-left 0

  .pad:last-child
    margin-right 0

  .pad
    margin-right $flex-gutter-md
</style>
<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import {Code} from './_QCodes'
import QBtnTransformer from '@/components/QBtnTransformer.vue'
import QBtnInput from '@/components/QBtnInput.vue'
import QCodes from '@/components/QCodes.vue'
@Component({
  components: {QCodes, QBtnInput, QBtnTransformer}
})
export default class QFunction extends Vue {
  @Prop({default: ''}) name: string
  @Prop() functionThis: string
  @Prop({default: true}) push: boolean
  @Prop({default: () => ([])}) codes: Code[]
  @Prop() parameters: any[]
  @Prop({default: 'blue'}) keyColor: string

  nativeName: string = ''
  nativeFunctionKind: 'function' | 'arrow' = 'function'
  nativeShowEmptyName: boolean = false
  nativeOpenNameInput: boolean = false

  get showName() {
    return this.nativeName !== '' || this.nativeShowEmptyName
  }

  onMouseover() {
    this.nativeShowEmptyName = true
  }

  onMouseout() {
    if(this.nativeOpenNameInput) {
      return
    }
    this.nativeShowEmptyName = false
  }

  onShow() {
    this.nativeOpenNameInput = true
  }

  onHide() {
    this.nativeOpenNameInput = false
    this.nativeShowEmptyName = false
  }

  onNameChange(value) {
    this.nativeName = value
  }
}
</script>

