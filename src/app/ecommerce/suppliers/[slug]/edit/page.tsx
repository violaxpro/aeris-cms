import React from 'react'
import FormSuppliers from '@/features/pages/suppliers/supplier-list/FormSuppliers'
import { Params } from '@/plugins/types'
import { getSupplier } from '@/services/supplier-list-service'

export default async function EditSuppliersPage(props: { params: Params }) {
    let dataForm = []
    const params = await props.params;
    const slug = params.slug;
    try {
        const res = await getSupplier(slug)
        if (res?.data) {
            dataForm = res.data
        }

    } catch (error) {
        console.error(error)
    }

    return (
        <div>
            <FormSuppliers mode="edit" initialValues={dataForm} slug={params.slug} />
        </div>
    )
}

