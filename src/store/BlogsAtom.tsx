import { atom } from 'jotai'
import { BlogType, BlogCategoriesType } from '@/plugins/types/blogs-type'

export const blogsAtom = atom<BlogType[]>([])
export const blogCategoriesAtom = atom<BlogCategoriesType[]>([])