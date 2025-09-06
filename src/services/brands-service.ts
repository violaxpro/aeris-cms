import baseService from "./base-service";
import { BrandType } from "@/data/brands-data";

const apiBrand = '/admin/catalogue/brand'

export async function getBrands(
    { page = 1, perPage = 10 }: { page?: number; perPage?: number } = {}
) {
    try {
        const res = await baseService(apiBrand, {
            params: { page, perPage }
        });

        return res.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null
        }
        throw error
    }
}

export async function getBrandById(slug: string) {
    const url = `${apiBrand}/${slug}`;
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


export async function addBrand(params: BrandType) {
    try {
        const res = await baseService.post(apiBrand, params)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function updateBrand(id: string | number, params: BrandType) {
    try {
        const res = await baseService.put(`${apiBrand}/${id}`, params)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function deleteBrand(id: string | number) {
    try {
        const res = await baseService.delete(`${apiBrand}/${id}`)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}





