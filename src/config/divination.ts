import { DIVINATION_SYMBOL } from '@/constants/divination'

const data = Object.values(DIVINATION_SYMBOL).map(item => item.key)

export type DivinationState = {
  category: number
  mode: string
}

export type DivinationSymbolType = ConstantArrValues<typeof data>

export type DivinationDetail = {
  id: number
  category: string
  description: string
  name: string
  hexagramRecord: string
  alias: string
  hexagramRecordExplanation: string
  symbol: string
  symbolicExplanation: string
  imageURL: string | null
}
