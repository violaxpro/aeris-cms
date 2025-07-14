import baseService from "./base-service";
import { BillType } from "@/plugins/types/suppliers-type";

const api = '/admin/product/bill'

export async function getBill(param?: string | number) {
    const url = param ? `${api}/${param}` : api
    try {
        const res = await baseService(url)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null
        }
        throw error
    }
}

export async function addBill(params: BillType) {
    try {
        const res = await baseService.post(api, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateBill(id: string | number, params: BillType) {
    try {
        const res = await baseService.put(`${api}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteBill(id: string | number) {
    try {
        const res = await baseService.delete(`${api}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}





