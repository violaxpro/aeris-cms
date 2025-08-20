import { atom } from 'jotai'
import { BlogType } from '@/plugins/types/blogs-type'

export const blogsAtom = atom<BlogType[]>([])