import React from 'react'
import FormCustomers from '@/features/pages/customers/FormCustomers'
import { Params } from '@/plugins/types'

export default async function EditCustomersPage(props: { params: Params }) {
    let dataForm = []
    const params = await props.params
    const slug = params.slug
    // try {
    //     const res = await getProduct(slug)
    //     dataForm = res.data

    // } catch (error) {

    // }
    return (
        <div>
            <FormCustomers mode='edit' />
        </div>
    )
}

