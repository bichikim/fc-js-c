<template lang="pug">
  template(v-if="kind === 'function'")
    q-function(
      :key="key"
    )
  template(v-if="kind === 'variable'")
    q-function(
      :key="key"
      @change="$emit('change', $event)"
      :showTransformer="transformer"
      v-bind="structure"
    )

</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import QFunction from '@/components/QFunction.vue'

  @Component({
    components: {QFunction}
  })
  export default class QCode extends Vue {

  }
</script>

<style lang="stylus" scoped>
  .main
    display flex
</style>
