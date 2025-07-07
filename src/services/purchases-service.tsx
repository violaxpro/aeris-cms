import baseService from "./base-service";
import { PurchasesType } from "@/plugins/types/suppliers-type";

const api = '/admin/supplier'

export async function getPurchases(param?: string | number) {
    const url = param ? `${api}/${param}` : api
    const res = await baseService(url)
    return res.data
}

export async function addPurchases(params: PurchasesType) {
    try {
        const res = await baseService.post(api, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updatePurchases(id: string | number, params: PurchasesType) {
    try {
        const res = await baseService.put(`${api}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}


export async function deletePurchases(id: string | number) {
    try {
        const res = await baseService.delete(`${api}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}










