/**
 * 扩展修复@uni-helper/uni-app-types类型定义问题
 */
import { HtmlHTMLAttributes } from 'vue'

export {}

type _View = Component<UniHelper.ViewProps & HtmlHTMLAttributes>
type _Text = Component<UniHelper.TextProps & HtmlHTMLAttributes>

declare module 'vue' {
  export interface GlobalComponents {
    View: _View
    Text: _Text
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      view: _View
      text: _Text
    }
  }
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    View: _View
    Text: _Text
  }
}

declare module 'vue3/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      view: _View
      text: _Text
    }
  }
}
