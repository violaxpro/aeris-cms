import React from 'react'
import FormReturnSales from '@/features/pages/sales/rma/FormReturnSales'

export default async function EditReturnSupplierPage() {
    // let data = []
    // try {

    //     const res = await getProduct()
    //     if (res.data) {
    //         data = res.data
    //     }

    // } catch (error) {
    //     console.error(error)
    // }
    return (
        <div>
            <FormReturnSales mode='edit' />
        </div>
    )
}

