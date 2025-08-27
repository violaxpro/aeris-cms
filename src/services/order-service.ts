import baseService from "./base-service";
import { OrderType } from "@/plugins/types/sales-type";

const api = '/admin/invoice'

export async function getOrder(param?: string | number) {
    const url = param ? `${api}/${param}` : api
    const res = await baseService(url)
    return res.data
}

export async function getOrderbyId(param?: string | number) {
    const url = param ? `${api}/detail/${param}` : api
    const res = await baseService(url)
    return res.data
}


export async function addOrder(params: OrderType) {
    try {
        const res = await baseService.post(api, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateOrder(id: string | number, params: OrderType) {
    try {
        const res = await baseService.put(`${api}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}


export async function deleteOrder(id: string | number) {
    try {
        const res = await baseService.delete(`${api}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}





