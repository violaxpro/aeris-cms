import React from 'react'
import FormPaySlip from '@/features/pages/employee-management/pay-slip/FormPaySlip'
import { Params } from '@/plugins/types'

export default async function EditPaySlipPage(props: { params: Params }) {
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
            <FormPaySlip mode='edit' slug={slug} />
        </div>
    )
}

