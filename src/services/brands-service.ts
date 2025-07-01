import baseService from "./base-service";

const apiBrands = '/admin/product/brand'

export async function getBrands(param?: string | number) {
    const url = param ? `${apiBrands}/${param}` : apiBrands
    const res = await baseService(url)
    return res.data
}


