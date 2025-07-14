
import { atom } from 'jotai'
import { OrderType, QuoteType, TransactionType, ReturnSalesType } from '@/plugins/types/sales-type'

export const orderAtom = atom<OrderType[]>([])

export const quoteAtom = atom<QuoteType[]>([])

export const transactionAtom = atom<TransactionType[]>([])

export const returnSalesAtom = atom<ReturnSalesType[]>([])



