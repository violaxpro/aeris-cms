import baseService from "./base-service";
import { ProductDataType } from "@/data/products-data";

const apiProduct = '/admin/product/catalog'

export async function getProduct(param?: string | number) {
    const url = param ? `${apiProduct}/${param}` : apiProduct
    const res = await baseService(url)
    return res.data
}

export async function addProduct(params: ProductDataType) {
    try {
        const res = await baseService.post(apiProduct, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateProduct(id: string | number, params: ProductDataType) {
    try {
        const res = await baseService.put(`${apiProduct}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}


export async function deleteProduct(id: string | number) {
    try {
        const res = await baseService.delete(`${apiProduct}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}







