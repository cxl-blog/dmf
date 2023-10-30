import { HtmlHTMLAttributes } from 'vue'

export {}

declare module 'vue' {
  export interface GlobalComponents {
    View: Component<UniHelper.ViewProps & HtmlHTMLAttributes>
    /**
     * 文本组件
     *
     * 用于包裹文本内容
     */
    Text: Component<UniHelper.TextProps & HtmlHTMLAttributes>
  }
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    View: Component<UniHelper.ViewProps & HtmlHTMLAttributes>
    /**
     * 文本组件
     *
     * 用于包裹文本内容
     */
    Text: Component<UniHelper.TextProps & HtmlHTMLAttributes>
  }
}
