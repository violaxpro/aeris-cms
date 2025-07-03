
import { atom } from 'jotai'
import { PriceLevelType } from '@/data/price-level-data'

export const priceLevelsAtom = atom<PriceLevelType[]>([])
