export type AppState = {
  title: string
  pages: PageConfig[]
  pageLoading: boolean
  scheme: 'light' | 'dark' | undefined
  /**
   * @description 导航高度
   */
  navbarHeight: number
}
