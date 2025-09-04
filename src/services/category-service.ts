import baseService from "./base-service";
import { CategoryType } from "@/data/categories-data";

const apiCategories = '/admin/catalogue/categories'

export async function getCategories(param?: string | number[]) {
    const url = param ? `${apiCategories}/${param}` : apiCategories
    const res = await baseService(url)
    return res.data
}

export async function getCategorybyId(id?: string | number[]) {
    const url = id ? `${apiCategories}/${id}` : apiCategories
    const res = await baseService(url)
    return res.data
}


export async function addCategory(params: CategoryType) {
    try {
        const res = await baseService.post(apiCategories, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateCategory(id: string | number, params: CategoryType) {
    try {
        const res = await baseService.put(`${apiCategories}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}


export async function deleteCategory(id: string | number) {
    try {
        const res = await baseService.delete(`${apiCategories}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}





