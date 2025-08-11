import React from 'react'
import ProductForm from '@/features/pages/catalogue/product-service/product/form-product/FormProduct'

export default async function createProductUrl() {
    return (
        <div>
            <ProductForm mode='create' />
        </div>
    )
}

