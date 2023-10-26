declare global {
  declare const process: {
    env: NodeJS.ProcessEnv
  }

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
}
