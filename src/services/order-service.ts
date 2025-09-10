import baseService from "./base-service";
import { OrderType } from "@/plugins/types/sales-type";

const api = '/admin/sales/invoice'

export async function getOrder(
    { page = 1, perPage = 10 }: { page?: number; perPage?: number } = {}
) {
    try {
        const res = await baseService(api, {
            params: { page, perPage }
        });

        return res.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null
        }
        throw error
    }
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





