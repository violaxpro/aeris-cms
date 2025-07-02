import baseService from "./base-service";

const apiTags = '/admin/product/tags'

export async function getTags(param?: string | number) {
    const url = param ? `${apiTags}/${param}` : apiTags
    const res = await baseService(url)
    return res.data
}


