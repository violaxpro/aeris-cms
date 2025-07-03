import baseService from "./base-service";
import { BrandType } from "@/data/brands-data";

const apiBrand = '/admin/product/brand'

export async function getBrands(param?: string | number) {
    const url = param ? `${apiBrand}/${param}` : apiBrand
    const res = await baseService(url)
    return res.data
}

export async function addBrand(params: BrandType) {
    try {
        const res = await baseService.post(apiBrand, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateBrand(id: string | number, params: BrandType) {
    try {
        const res = await baseService.put(`${apiBrand}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteBrand(id: string | number) {
    try {
        const res = await baseService.delete(`${apiBrand}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}





