<template lang="pug">
  q-table.table(
    flat
    bordered
    :title="title"
    hide-bottom
    hide-header
    :columns="columns"
    :class="{[`bg-${color}`]: true}"
    :table-class="$style['q-description']"
    row-key="name"
    :data="[...row]"
  )
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'

@Component
export default class QDescription extends Vue {
  @Prop() title: string
  @Prop() row: Array<{name: string, description: string}> = []
  @Prop({default: 'blue'}) color: string

  columns = [
    {
      name: 'name',
      label: '표현',
      align: 'left',
      field: 'name',
    },
    {
      name: 'description',
      label: '설명',
      align: 'left',
      field: 'description',
    }
  ]
}
</script>
<style scoped lang="stylus">
  .table
    color white
</style>
<style module lang="stylus">
  .q-description
    background-color white
    color black

</style>
