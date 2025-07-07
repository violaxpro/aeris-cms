import React from 'react'
import FormReturnSupplier from '@/features/pages/suppliers/return-supplier/FormReturnSupplier'
import { getProduct } from '@/services/products-service'

export default async function CreateReturnSupplierPage() {
    let data = []
    try {

        const res = await getProduct()
        if (res.data) {
            data = res.data
        }

    } catch (error) {
        console.error(error)
    }
    return (
        <div>
            <FormReturnSupplier mode='create' dataTable={data} />
        </div>
    )
}

