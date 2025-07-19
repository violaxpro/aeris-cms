import React from 'react'
import FormSlider from '@/features/pages/management/appearance/slider/FormSlider'
// import { getProduct } from '@/services/products-service'
import { Params } from '@/plugins/types'

export default async function EditSlidePage(props: { params: Params }) {
    // let dataForm = []
    // const params = await props.params
    // const slug = params.slug
    // try {
    //     const res = await getProduct(slug)
    //     dataForm = res.data

    // } catch (error) {

    // }
    return (
        <div>
            <FormSlider mode="edit" />
        </div>
    )
}

