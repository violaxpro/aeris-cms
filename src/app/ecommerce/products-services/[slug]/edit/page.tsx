import React from 'react'
import ProductForm from '@/features/pages/catalogue/product-service/product/form-product/FormProduct'
import { getProductById } from '@/services/products-service'
import { Params } from '@/plugins/types'

export default async function EditProductUrl(props: { params: Params }) {
    let dataForm = []
    const params = await props.params
    const slug = params.slug
    try {
        const res = await getProductById(slug)
        dataForm = res.data

    } catch (error) {

    }
    return (
        <div>
            <ProductForm mode="edit" initialValues={dataForm} slug={slug} />
        </div>
    )
}

