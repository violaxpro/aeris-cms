import baseService from "./base-service";

const apiCategories = '/admin/product/categories'

export async function getCategories() {
    const res = await baseService(apiCategories)
    return res.data
}