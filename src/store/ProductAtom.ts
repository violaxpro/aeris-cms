
import { atom } from 'jotai'
import { ProductDataType } from '@/data/products-data'

export const productAtom = atom<ProductDataType[]>([])
