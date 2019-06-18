/* tslint:disable:callable-types */
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    __qClosePopup: (event?: Event) => void
  }
}

declare module 'vue/types/options' {
  // noinspection TsLint
  interface ComponentOptions<V extends Vue> {
  }
}
