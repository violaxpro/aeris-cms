import baseService from "./base-service";
import { QuoteType } from "@/plugins/types/sales-type";

const api = '/admin/quotes'

export async function getQuote(param?: string | number) {
    const url = param ? `${api}/${param}` : api
    const res = await baseService(url)
    return res.data
}

export async function getQuotebyId(param?: string | number) {
    const url = param ? `${api}/detail/${param}` : api
    const res = await baseService(url)
    return res.data
}


export async function addQuote(params: QuoteType) {
    try {
        const res = await baseService.post(api, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateQuote(id: string | number, params: QuoteType) {
    try {
        const res = await baseService.put(`${api}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}


export async function deleteQuote(id: string | number) {
    try {
        const res = await baseService.delete(`${api}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}





