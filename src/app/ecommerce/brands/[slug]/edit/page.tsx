import React from 'react'
import FormBrands from '@/features/pages/catalogue/brands/formBrands/FormBrands'
import { getBrandById } from '@/services/brands-service'
import { Params } from '@/plugins/types'

export default async function EditBrandsPage(props: { params: Params }) {
    let dataForm = []
    const params = await props.params;
    const slug = params.slug;
    try {
        const res = await getBrandById(slug)
        if (res?.data) {
            dataForm = res.data
        }

    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <FormBrands mode='edit' initialValues={dataForm} slug={params.slug} />

        </div>
    )
}


