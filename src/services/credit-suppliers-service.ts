import baseService from "./base-service";
import { CreditSupplierType } from "@/plugins/types/suppliers-type";

const api = '/admin/supplier'

export async function getCreditSupplier(param?: string | number) {
    const url = param ? `${api}/${param}` : api
    const res = await baseService(url)
    return res.data
}

export async function addCreditSupplier(params: CreditSupplierType) {
    try {
        const res = await baseService.post(api, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateCreditSupplier(id: string | number, params: CreditSupplierType) {
    try {
        const res = await baseService.put(`${api}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}


export async function deleteCreditSupplier(id: string | number) {
    try {
        const res = await baseService.delete(`${api}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}










