
import { atom } from 'jotai'
import { BrandType } from '@/data/brands-data'

export const brandAtom = atom<BrandType[]>([])
