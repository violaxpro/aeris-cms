
import { atom } from 'jotai'
import { OrderType, QuoteType } from '@/plugins/types/sales-type'

export const orderAtom = atom<OrderType[]>([])

export const quoteAtom = atom<QuoteType[]>([])

