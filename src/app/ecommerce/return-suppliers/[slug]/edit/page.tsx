import React from 'react'
import FormReturnSupplier from '@/features/pages/suppliers/return-supplier/FormReturnSupplier'
import { getReturnSupplier } from '@/services/return-supplier'
import { Params } from '@/plugins/types'

export default async function EditReturnSupplierPage(props: { params: Params }) {
    let dataForm = []
    const params = await props.params;
    const slug = params.slug;
    try {
        const res = await getReturnSupplier(slug)
        if (res?.data) {
            dataForm = res.data
        }

    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <FormReturnSupplier mode='edit' dataTable={dataForm} />
        </div>
    )
}

