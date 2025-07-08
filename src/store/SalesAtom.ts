
import { atom } from 'jotai'
import { OrderType } from '@/plugins/types/sales-type'

export const orderAtom = atom<OrderType[]>([])
