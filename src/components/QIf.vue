<template lang="pug">
  .q-if
    template(v-for="(condition, index) in conditions")
      q-btn-change(:list="ifKind(index)" :value="condition.infoKey")
      q-btn(dense :push="push" label="(")
      q-btn-transformer(:list="valueTypeList"  :value="valueKind")
        template(#select-value="{color, push}")
          q-btn-value(:push="push" :value="condition.condition")
      q-btn(dense :push="push" label=")")

</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import QBtnChange from '@/components/QBtnChange.vue'
import {IfSession} from '@/components/_QIf'
import {CodeInfo} from '@/components/_QCodes'
import QBtnInput from '@/components/QBtnInput.vue'
import QBtnTransformer from '@/components/QBtnTransformer.vue'
import QBtnValue from '@/components/QBtnValue.vue'




@Component({
  components: {
    QBtnValue,
    QBtnTransformer,
    QBtnInput,
    QBtnChange,
  }
})
export default class QIf extends Vue {
  @Prop({default: () => ([{infoKey: 'if', condition: ''}])}) conditions: IfSession[]
  @Prop() codeList: Array<Array<CodeInfo>>
  @Prop({default: true}) push: boolean

  valueTypeList = ['value', 'calculationInfo']

  valueKind = 'value'

  ifKind(index) {
    if(index === 0){
      return ['if']
    }
    return ['else if', 'else']
  }
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
