import baseService from "./base-service";
import { ReturnSalesType } from "@/plugins/types/sales-type";

const api = '/admin/sales/rma'

export async function getReturnSales(param?: string | number) {
    const url = param ? `${api}/${param}` : api
    const res = await baseService(url)
    return res.data
}

export async function addReturnSales(params: ReturnSalesType) {
    try {
        const res = await baseService.post(api, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateReturnSales(id: string | number, params: ReturnSalesType) {
    try {
        const res = await baseService.put(`${api}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}


export async function deleteReturnSales(id: string | number) {
    try {
        const res = await baseService.delete(`${api}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}










