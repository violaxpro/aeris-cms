import baseService from "./base-service";
import { PriceLevelType } from "@/data/price-level-data";

const apiPriceLevel = '/admin/product/price-level'

export async function getPriceLevel(param?: string | number) {
    try {
        const url = param ? `${apiPriceLevel}/${param}` : apiPriceLevel
        const res = await baseService.get(url)
        return res.data
    } catch (error) {
        console.error(error)
    }

}

export async function addPriceLevel(params: PriceLevelType) {
    try {
        const res = await baseService.post(apiPriceLevel, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updatePriceLevel(id: string | number, params: PriceLevelType) {
    try {
        const res = await baseService.put(`${apiPriceLevel}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function deletePriceLevel(id: string | number) {
    try {
        const res = await baseService.delete(`${apiPriceLevel}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}



