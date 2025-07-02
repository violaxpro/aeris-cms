import baseService from "./base-service";

const apiReviews = '/admin/product/reviews'

export async function getReviews(param?: string | number) {
    const url = param ? `${apiReviews}/${param}` : apiReviews
    const res = await baseService(url)
    return res.data
}


