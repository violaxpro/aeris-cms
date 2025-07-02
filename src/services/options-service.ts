import baseService from "./base-service";

const apiOptions = '/admin/product/option'

export async function getOptions(param?: string | number) {
    const url = param ? `${apiOptions}/${param}` : apiOptions
    const res = await baseService(url)
    return res.data
}


