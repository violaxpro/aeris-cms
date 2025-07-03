import React from 'react'
import { getPriceLevel } from '@/services/price-level-service'
import FormPriceLevel from '@/features/pages/price-level/FormPriceLevel'
import { Params } from '@/plugins/types'

export default async function EditPriceLevelPage(props: { params: Params }) {
    let dataForm = []
    const params = await props.params;
    const slug = params.slug;
    try {
        const res = await getPriceLevel(slug)
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

