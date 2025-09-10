import baseService from "./base-service";
import { CategoryType } from "@/data/categories-data";

const apiCategories = '/admin/catalogue/categories'

export async function getCategories(
    { page = 1, perPage = 10 }: { page?: number; perPage?: number } = {},
    param?: string | number
) {
    try {
        let url = apiCategories;

        if (param) {
            url = `${apiCategories}/${param}`;
        }
        const res = await baseService(url, {
            params: { page, perPage }
        });

        return res.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
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





