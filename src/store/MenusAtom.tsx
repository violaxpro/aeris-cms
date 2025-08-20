import { atom } from 'jotai'
import { MenusType } from '@/plugins/types/management-type'

export const menusAtom = atom<MenusType[]>([])