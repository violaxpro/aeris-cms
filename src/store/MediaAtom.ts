import { atom } from 'jotai'
import { MediaType } from '@/plugins/types/management-type'

export const mediaAtom = atom<MediaType[]>([])