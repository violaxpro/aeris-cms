import { atom } from 'jotai'
import { UserType } from '@/plugins/types/users-type'

export const userATom = atom<UserType[]>([])