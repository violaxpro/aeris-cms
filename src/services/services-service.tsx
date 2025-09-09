import baseService from "./base-service";

const apiServices = '/admin/catalogue/product/service'
export async function getServices(
    { page = 1, perPage = 10 }: { page?: number; perPage?: number } = {},
    param?: string | number
) {
    try {
        let url = apiServices;

        if (param) {
            url = `${apiServices}/${param}`;
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

export async function getServiceById(slug: string) {
    const url = `${apiServices}/${slug}`;
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

export async function addService(params: any) {
    try {
        const res = await baseService.post(apiServices, params)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function updateService(id: string | number, params: any) {
    try {
        const res = await baseService.put(`${apiServices}/${id}`, params)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function deleteService(id: string | number) {
    try {
        const res = await baseService.delete(`${apiServices}/${id}`)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}










