import baseService from "./base-service";

const url = '/admin/product/cdn/upload'

export async function uploadImages(params: any) {
    try {
        const res = await baseService.post(url, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}






