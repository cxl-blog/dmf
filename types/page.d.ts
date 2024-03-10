import type { PageMetaDatum } from '@uni-helper/vite-plugin-uni-pages'

declare global {
  declare type PageConfig = PageMetaDatum & {
    /**
     * @description 是否关闭navbar
     */
    navbarDisabled: boolean
    /**
     * @description navbar左侧是否禁止出现返回图标
     */
    navbarDisableAutoBack: boolean
    /**
     * @description 底部活动路径
     */
    activeTabPath: string
  }
}
