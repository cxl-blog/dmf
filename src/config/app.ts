export type AppState = {
  title: string
  pages: PageConfig[]
  pageLoading: boolean
  scheme: 'light' | 'dark' | undefined
  layout: {
    /**
     * @description 导航头部高度
     */
    navbarHeight: number
    /**
     * @description 手机状态栏高度
     */
    statusHeight: number
  }
}
