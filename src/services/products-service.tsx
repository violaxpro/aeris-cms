import baseService from "./base-service";
import { ProductDataType } from "@/data/products-data";

const apiProduct = '/admin/catalogue/product'

export async function getProduct(
    { page = 1, perPage = 10 }: { page?: number; perPage?: number } = {},
    param?: string | number
) {
    try {
        let url = apiProduct;

        if (param) {
            url = `${apiProduct}/${param}`;
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

export async function getProductById(slug: string) {
    const url = `${apiProduct}/${slug}`;
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

export async function addProduct(params: ProductDataType) {
    try {
        const res = await baseService.post(apiProduct, params)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function updateProduct(id: string | number, params: ProductDataType) {
    try {
        const res = await baseService.put(`${apiProduct}/${id}`, params)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function deleteProduct(id: string | number) {
    try {
        const res = await baseService.delete(`${apiProduct}/${id}`)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}







