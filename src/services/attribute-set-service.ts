import baseService from "./base-service";
import { AttributeSetType } from "@/data/attributes-data";

const apiAttributeSet = '/admin/product/attribute/set'

export async function getAttributeSet(param?: string | number) {
    const url = param ? `${apiAttributeSet}/${param}` : apiAttributeSet
    const res = await baseService(url)
    return res.data
}

export async function addAttributeSet(params: AttributeSetType) {
    try {
        const res = await baseService.post(apiAttributeSet, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}



