<template lang="pug">
  q-btn-group(:push="push" :class="{[`bg-${color}`]: true}")
    .content.q-btn-item(:class="{'q-btn--push': push}")
      slot(:name="`select-${nativeSelect}`" v-bind="bindSelect")
        span There's not a slot
    q-btn(:push="push" dense @click="open = !open" :color="color")
      q-icon.transition(name="arrow_drop_down" :class="{open}")
      q-menu(v-model="open" no-parent-event)
        q-list
          q-item(v-for="item in list" v-close-popup clickable @click="nativeSelect = item")
            slot(name="item" v-bind="bindItem(item)")
              q-item-section
                q-item-label
                  span {{item}}
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
  import QBtnInput from '@/components/QBtnInput.vue'

  @Component({
    components: {QBtnInput}
  })
  export default class QBtnTransformer extends Vue {
    @Prop({default: true}) push: boolean
    @Prop({default: () => ([])}) list: string[]
    @Prop({default: 'grey'}) color: string
    @Prop({default: 'default'}) select: string

    @Watch('select', {immediate: true})
    __select(value) {
      this.nativeSelect = value
    }

    @Watch('nativeSelect')
    __nativeSelect(value) {
      this.$emit('input', value)
    }

    get bindSelect() {
      const {push, color} = this
      return {push, color}
    }

    bindItem(item) {
      return {value: item}
    }

    open: boolean = false

    nativeSelect: string = 'default'
  }
</script>

<style lang="stylus" scoped>
  .open
    transform rotate(180deg)

  .transition
    transition-property transform
    transition-duration .3s
</style>
