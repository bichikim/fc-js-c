<template lang="pug">
  q-page(padding)
    q-course
      template(#unit) 흐름 제어
      template(#title) 코드 기본 흐름
      template(#code-block)
        q-codes(:codes="codes" @change="chodes = $event")
      template(#code)
        q-codes-display(:codes="codes")
      template(#explanation)
        q-codes-explain(:codes="codes")
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'
import QCodes from '@/components/QCodes.vue'
import QCourse from '@/components/QCourse.vue'
import {CodeInfo} from '@/components/_QCodes'
import QDescription from '@/components/QDescription.vue'
import QCodesDisplay from '@/components/QCodesDisplay.vue'
import QCodesExplain from '@/components/QCodesExplain.vue'

@Component({
  components: {
    QDescription,
    QCodes, QCourse, QCodesDisplay, QCodesExplain
  }
})
export default class FlowPage extends Vue {
  codes: CodeInfo[] = [
    {transformer: false, structure: {kind: 'let', infoKey: 'variableInfo', name: 'foo', operator: '=', value: 50}},
    {structure: {infoKey: 'scopeInfo', codes: [
          {transformer: false, structure: {kind: 'const', infoKey: 'variableInfo', name: 'john', operator: '=', value: {
                infoKey: 'calculationInfo', value: ['foo', '+', 5]
              }}},
          {transformer: false, structure: {kind: '', infoKey: 'variableInfo', name: 'foo', operator: '=', value: 'john'}}
        ]}},
    {transformer: false, structure: {kind: 'const', infoKey: 'variableInfo', name: 'bar', operator: '=', value: {
          infoKey: 'calculationInfo',
          value: ['john']
        }}},
  ]
}
</script>

<style scoped lang="stylus">
  .main
    display flex
</style>
