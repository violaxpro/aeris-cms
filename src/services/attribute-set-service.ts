import baseService from "./base-service";
import { AttributeSetType } from "@/data/attributes-data";

const apiAttributeSet = '/admin/catalogue/attribute/set'

export async function getAttributeSet(
    { page = 1, perPage = 10 }: { page?: number; perPage?: number } = {},
    param?: string | number
) {
    try {
        let url = apiAttributeSet;

        if (param) {
            url = `${apiAttributeSet}/${param}`;
        }
        const res = await baseService(url, {
            params: { page, perPage }
        });

        return res.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function addAttributeSet(params: AttributeSetType) {
    try {
        const res = await baseService.post(apiAttributeSet, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}



