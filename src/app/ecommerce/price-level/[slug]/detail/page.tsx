import DetailPriceLevel from "@/features/pages/catalogue/price-level/DetailPriceLevel";
import { getPriceLevel } from "@/services/price-level-service";
import { getBrands } from "@/services/brands-service";
import { getCategories } from "@/services/category-service";
import { Params } from '@/plugins/types'


export default async function DetailPriceLevelPage(props: { params: Params }) {
    let dataForm = []
    const params = await props.params;
    const slug = params.slug;
    try {
        const res = await getPriceLevel(slug)
        if (res?.data) {
            const categoryId = res.data.categoryId
            const fetchCategorybyId = await getCategories(categoryId);
            const dataCategory = fetchCategorybyId.data

            const brandId = res.data.brandId
            const fetchBrandbyId = await getBrands(brandId)
            const dataBrands = fetchBrandbyId.data

            dataForm = {
                ...res.data,
                category: dataCategory,
                brand: dataBrands
            }

        }

    } catch (error) {
        console.log(error)
    }

    return (
        <DetailPriceLevel data={dataForm} />
    )

}