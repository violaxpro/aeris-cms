import baseService from "./base-service";

const apiOptions = '/admin/catalogue/option'

export async function getOptions(
    { page = 1, perPage = 10 }: { page?: number; perPage?: number } = {},
    param?: string | number
) {
    try {
        let url = apiOptions;

        if (param) {
            url = `${apiOptions}/${param}`;
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

export async function getOptionsById(slug: string) {
    const url = `${apiOptions}/${slug}`;
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

export async function addOptions(params: any) {
    try {
        const res = await baseService.post(apiOptions, params)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function updateOptions(id: string | number, params: any) {
    try {
        const res = await baseService.put(`${apiOptions}/${id}`, params)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function deleteOptions(id: string | number) {
    try {
        const res = await baseService.delete(`${apiOptions}/${id}`)
        return res.data
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}






