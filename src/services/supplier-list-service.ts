import baseService from "./base-service";
import { SupplierListType } from "@/plugins/types/suppliers-type";

const apiSupplier = '/admin/supplier'

export async function getSupplier(param?: string | number) {
    const url = param ? `${apiSupplier}/${param}` : apiSupplier
    const res = await baseService(url)
    return res.data
}

export async function addSupplierList(params: SupplierListType) {
    try {
        const res = await baseService.post(apiSupplier, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateSupplierList(id: string | number, params: SupplierListType) {
    try {
        const res = await baseService.put(`${apiSupplier}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}


export async function deleteSupplierList(id: string | number) {
    try {
        const res = await baseService.delete(`${apiSupplier}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}










