import baseService from "./base-service";
import { AttributesType } from "@/data/attributes-data";

const apiAttributes = '/admin/product/attribute'

export async function getAttributes(param?: string | number) {
    const url = param ? `${apiAttributes}/${param}` : apiAttributes
    const res = await baseService(url)
    return res.data
}

export async function getAttributebyId(param?: string | number) {
    const url = param ? `${apiAttributes}/detail/${param}` : apiAttributes
    const res = await baseService(url)
    return res.data
}


export async function addAttribute(params: AttributesType) {
    try {
        const res = await baseService.post(apiAttributes, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateAttribute(id: string | number, params: AttributesType) {
    try {
        const res = await baseService.put(`${apiAttributes}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}


export async function deleteAttribute(id: string | number) {
    try {
        const res = await baseService.delete(`${apiAttributes}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}





