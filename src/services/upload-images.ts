import baseService from "./base-service";

const url = '/admin/catalogue/cdn/upload'

export async function uploadImages(params: any) {
    try {
        const res = await baseService.post(url, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}






