import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css';
export default async () => {
  hljs.registerLanguage('javascript', javascript)
}
