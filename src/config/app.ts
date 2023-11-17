export type AppState = {
  title: string
  pages: PageConfig[]
  pageLoading: boolean
  scheme: 'light' | 'dark' | undefined
}
