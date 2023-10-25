declare global {
  declare interface Fn<T = any> {
    (...arg: T[]): T
  }

  declare type ConstantObjValues<T extends Record<keyof any, keyof any>> = T[keyof T]

  declare type ConstantArrValues<T extends Array> = T[number]

  declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

  declare type ComponentRef<T> = InstanceType<T>
}
