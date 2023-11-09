import { DIVINATION_SYMBOL } from '@/constants/divination'

const data = Object.values(DIVINATION_SYMBOL).map(item => item.key)

export type DivinationState = {
  mode: string
}

export type DivinationSymbolType = ConstantArrValues<typeof data>
