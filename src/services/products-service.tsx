import baseService from "./base-service";

const apiProduct = '/admin/product/catalog'

export async function getProduct(param?: string | number) {
    const url = param ? `${apiProduct}/${param}` : apiProduct
    const res = await baseService(url)
    return res.data
}


