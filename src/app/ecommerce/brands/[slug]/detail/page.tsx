import DetailBrand from "@/features/pages/catalogue/brands/formBrands/DetailBrands";
import { getBrandById } from "@/services/brands-service";
import { Params } from "@/plugins/types";

export default async function DetailPriceLevelPage(props: { params: Params }) {
    let dataForm = []
    const params = await props.params;
    const slug = params.slug;
    try {
        const res = await getBrandById(slug)
        dataForm = res.data


    } catch (error) {
        console.log(error)
    }

    return (
        <DetailBrand data={dataForm} />
    )
}