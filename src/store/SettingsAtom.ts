import { atom } from 'jotai'
import { TaxType, TemplateType } from '@/plugins/types/settings-type'

export const taxAtom = atom<TaxType[]>([])
export const emailAtom = atom<TemplateType[]>([])
export const smsAtom = atom<TemplateType[]>([])
