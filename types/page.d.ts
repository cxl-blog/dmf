import type { PageMetaDatum } from '@uni-helper/vite-plugin-uni-pages'

declare global {
  declare type PageConfig = PageMetaDatum & {
    navbarTitle: string
    navbarDisableAutoBack: boolean
    activeTabPath: string
  }
}
