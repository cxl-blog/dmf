declare global {
  declare const wx: {
    cloud: {
      callContainer: (params: any) => Promise<any>
      init: (params: any) => void
    }
    checkSession: (params: { success?: Fn; fail?: Fn; complete?: Fn }) => void
    login: (params: { success?: Fn; fail?: Fn; complete?: Fn; timeout?: number }) => void
    getUserProfile: (params: {
      success?: Fn
      fail?: Fn
      complete?: Fn
      desc: string
      lang?: 'en' | 'zh-CN' | 'zh-TW'
    }) => void
    showModal: (params: {
      title?: string
      content?: string
      showCancel?: boolean
      cancelText?: string
      cancelColor?: string
      confirmText?: string
      confirmColor?: string
      editable?: boolean
      placeholderText?: string
      success?: Fn
      fail?: Fn
      complete?: Fn
    }) => void
  }
}

export {}
