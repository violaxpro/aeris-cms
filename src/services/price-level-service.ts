import baseService from "./base-service";

const apiPriceLevel = '/admin/product/price-level'

export async function getPriceLevel(param?: string | number) {
    const url = param ? `${apiPriceLevel}/${param}` : apiPriceLevel
    const res = await baseService(url)
    return res.data
}


