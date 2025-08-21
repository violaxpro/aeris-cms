import React from 'react'
import DetailPaySlip from '@/features/pages/employee-management/pay-slip/DetailPaySlip'
import { Params } from '@/plugins/types'

export default async function DetailPaySlipPage(props: { params: Params }) {
    let dataForm = []
    const params = await props.params
    const slug = params.slug
    console.log(slug)
    // try {
    //     const res = await getProduct(slug)
    //     dataForm = res.data

    // } catch (error) {

    // }
    return (
        <div>
            <DetailPaySlip slug={slug} />
        </div>
    )
}

