import type { PageMetaDatum } from '@uni-helper/vite-plugin-uni-pages'

declare global {
  declare type PageConfig = PageMetaDatum & {
    navbarTitle: string
    /**
     * @description 是否关闭navbar
     */
    navbarDisabled: boolean
    navbarDisableAutoBack: boolean
    /**
     * @description 底部活动路径
     */
    activeTabPath: string
  }
}
