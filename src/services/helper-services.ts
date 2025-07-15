import baseService from "./base-service";

const api = '/admin/product/price-level/calculate'

export async function calculatePriceLevel(param?: string | number) {
    const url = param ? `${api}/${param}` : api
    const res = await baseService(url)
    return res.data
}