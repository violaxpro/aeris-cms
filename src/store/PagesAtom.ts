import { atom } from 'jotai'
import { PagesType } from '@/plugins/types/pages-type'

export const pagesAtom = atom<PagesType[]>([])