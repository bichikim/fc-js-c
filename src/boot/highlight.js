import "prismjs"
import 'prismjs/themes/prism-okaidia.css'
import VuePrismEditor from "vue-prism-editor"
export default async ({Vue}) => {
  Vue.component("prism-editor", VuePrismEditor)
}
