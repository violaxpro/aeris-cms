import baseService from "./base-service";

const apiAttributes = '/admin/product/attribute'

export async function getAttributes(param?: string | number) {
    const url = param ? `${apiAttributes}/${param}` : apiAttributes
    const res = await baseService(url)
    return res.data
}


