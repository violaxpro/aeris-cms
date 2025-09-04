import baseService from "./base-service";
import { PriceLevelType } from "@/data/price-level-data";

const apiPriceLevel = '/admin/catalogue/price-level'

export async function getPriceLevel(
    { page = 1, perPage = 10 }: { page?: number; perPage?: number } = {},
    param?: string | number
) {
    try {
        let url = apiPriceLevel;

        if (param) {
            url = `${apiPriceLevel}/${param}`;
        }
        const res = await baseService(url, {
            params: { page, perPage }
        });

        return res.data; //
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



