import baseService from "./base-service";

const apiCategories = '/admin/product/categories'

export async function getCategories(param?: string | number[]) {
    const url = param ? `${apiCategories}/${param}` : apiCategories
    const res = await baseService(url)
    return res.data
}