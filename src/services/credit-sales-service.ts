import baseService from "./base-service";
import { CreditSalesType } from "@/plugins/types/sales-type";

const api = '/admin/sales/credit'

export async function getCreditSales(param?: string | number) {
    const url = param ? `${api}/${param}` : api
    const res = await baseService(url)
    return res.data
}

export async function addCreditSales(params: CreditSalesType) {
    try {
        const res = await baseService.post(api, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateCreditSales(id: string | number, params: CreditSalesType) {
    try {
        const res = await baseService.put(`${api}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}


export async function deleteCreditSales(id: string | number) {
    try {
        const res = await baseService.delete(`${api}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}










