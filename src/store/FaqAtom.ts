import { atom } from 'jotai'
import { FaqCategoriesType, FaqType } from '@/plugins/types/management-type'

export const faqCategoryAtom = atom<FaqCategoriesType[]>([])
export const faqAtom = atom<FaqType[]>([])