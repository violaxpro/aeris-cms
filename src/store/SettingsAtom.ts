import { atom } from 'jotai'
import { TaxType } from '@/plugins/types/settings-type'

export const taxAtom = atom<TaxType[]>([])