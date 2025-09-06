import baseService from "./base-service";
import { AttributesType } from "@/data/attributes-data";

const apiAttributes = '/admin/catalogue/attribute'

export async function getAttributes(
    { page = 1, perPage = 10 }: { page?: number; perPage?: number } = {},
    param?: string | number
) {
    try {
        let url = apiAttributes;

        if (param) {
            url = `${apiAttributes}/${param}`;
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

export async function getAttributebyId(slug: string) {
    const url = `${apiAttributes}/${slug}`;
    try {
        const res = await baseService(url);
        return res.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}


export async function addAttribute(params: AttributesType) {
    try {
        const res = await baseService.post(apiAttributes, params)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function updateAttribute(id: string | number, params: AttributesType) {
    try {
        const res = await baseService.put(`${apiAttributes}/${id}`, params)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}


export async function deleteAttribute(id: string | number) {
    try {
        const res = await baseService.delete(`${apiAttributes}/${id}`)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}





