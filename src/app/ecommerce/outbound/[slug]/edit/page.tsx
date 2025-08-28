import React from 'react'
import FormOutbound from '@/features/pages/warehouse/outbound/FormOutbound'
import { dummyOutbound } from '@/plugins/types/warehouse-type'
import { Params } from '@/plugins/types'

export default async function EditOutboundPage(props: { params: Params }) {
    let dataByid: any = []
    const params = await props.params;
    const slug = params.slug;
    try {
        // const res = await dummyOutbound(slug)
        // if (res?.data) {
        //     dataByid = res.data
        // }
        const filter = dummyOutbound.find((item) => {
            return item.order_number === slug
        })
        dataByid = filter
    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <FormOutbound mode='edit' initialValues={dataByid} slug={params.slug} />

        </div>
    )
}


