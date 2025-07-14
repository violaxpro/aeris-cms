import baseService from "./base-service";
import { TransactionType } from "@/plugins/types/sales-type";

const api = '/admin/product/transaction'

export async function getTransaction(param?: string | number) {
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

export async function addTransaction(params: TransactionType) {
    try {
        const res = await baseService.post(api, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateTransaction(id: string | number, params: TransactionType) {
    try {
        const res = await baseService.put(`${api}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteTransaction(id: string | number) {
    try {
        const res = await baseService.delete(`${api}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}





