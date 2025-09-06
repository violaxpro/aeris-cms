import React from 'react'
import { getPriceLevelById } from '@/services/price-level-service'
import FormPriceLevel from '@/features/pages/catalogue/price-level/FormPriceLevel'
import { Params } from '@/plugins/types'

export default async function EditPriceLevelPage(props: { params: Params }) {
    let dataForm: any = []
    const params = await props.params;
    const slug = params.slug;
    try {
        const res = await getPriceLevelById(slug)
        if (res?.data) {
            dataForm = res.data
        }

    } catch (error) {
        console.log(error)
    }

    return (
        <div>
            <FormPriceLevel mode="edit" initialValues={dataForm} slug={params.slug} />
        </div>
    )
}

