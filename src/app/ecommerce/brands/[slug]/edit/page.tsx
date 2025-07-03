import React from 'react'
import FormBrands from '@/features/pages/brands/formBrands/FormBrands'
import { getBrands } from '@/services/brands-service'
import { Params } from '@/plugins/types'

export default async function EditBrandsPage(props: { params: Params }) {
    let dataForm = []
    const params = await props.params;
    const slug = params.slug;
    try {
        const res = await getBrands(slug)
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


