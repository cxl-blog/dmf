import { UnConfig } from '@uni-helper/uni-network'

declare global {
  declare const process: {
    env: NodeJS.ProcessEnv
  }

  declare interface IntrinsicElementAttributes {}

  declare interface Fn<T = any> {
    (...arg: T[]): T
  }

  declare type ConstantObjValues<T extends Record<keyof any, keyof any>> = T[keyof T]

  declare type ConstantArrValues<T extends Array> = T[number]

  declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

  declare type ComponentRef<T> = InstanceType<T>

  // 用于获取泛型组件实例类型
  declare type GenericComponentRef<T> = ComponentPublicInstance &
    Parameters<NonNullable<NonNullable<ReturnType<T>['__ctx']>['expose']>>[0]

  declare type LocaleType = 'en' | 'zh-CN'

  // 后端接口返回数据定义
  declare type AppResponse<T = any> = {
    /**
     * @default 200
     */
    code?: number
    data?: T
    message?: string
  }

  declare type UnCustomConfig<T = any, D = any> = UnConfig<T, D> & {
    /**
     * @description 是否忽略请求错误自动弹出错误提示框
     */
    ignoreErrorMsg?: boolean
    /**
     * @description 是否开启取消请求功能
     */
    cancelable?: boolean
    /**
     * @description 自定义取消请求键值
     */
    cancelCustomKey?: string
    /**
     * @description 取消请求，是否严格模式，取消键值由
     * method url params/data 组成，非严格模式下由method url 组成
     */
    cancelUseStrict?: boolean
  }

  declare type UnCustomGetConfig<T = any, D = any> = Omit<
    UnCustomConfig<T, D>,
    UnCustomConfig['url'] | UnCustomConfig['method'] | UnCustomConfig['params']
  >

  declare type UnCustomPostConfig<T = any, D = any> = Omit<
    UnCustomConfig<T, D>,
    UnCustomConfig['url'] | UnCustomConfig['method'] | UnCustomConfig['data']
  >

  declare interface ImportMetaEnv {
    NODE_ENV: string
    VITE_BASE_PATH: string
    VITE_API_BASE_PATH: string
    VITE_WEIXIN_CLOUD_ENV: string
    VITE_X_WX_SERVICE: string
  }
}

export {}
