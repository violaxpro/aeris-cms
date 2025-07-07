import baseService from "./base-service";
import { ReturnSupplierType } from "@/plugins/types/suppliers-type";

const api = '/admin/supplier'

export async function getReturnSupplier(param?: string | number) {
    const url = param ? `${api}/${param}` : api
    const res = await baseService(url)
    return res.data
}

export async function addReturnSupplier(params: ReturnSupplierType) {
    try {
        const res = await baseService.post(api, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateReturnSupplier(id: string | number, params: ReturnSupplierType) {
    try {
        const res = await baseService.put(`${api}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}


export async function deleteReturnSupplier(id: string | number) {
    try {
        const res = await baseService.delete(`${api}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}










