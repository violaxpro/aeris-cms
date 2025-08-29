import React from 'react'
import FormInbound from '@/features/pages/warehouse/inbound/FormInbound'
import { dummyInbound } from '@/plugins/types/warehouse-type'
import { Params } from '@/plugins/types'

export default async function EditInboundPage(props: { params: Params }) {
    let dataByid: any = []
    const params = await props.params;
    const slug = params.slug;
    try {
        // const res = await dummyOutbound(slug)
        // if (res?.data) {
        //     dataByid = res.data
        // }
        const filter = dummyInbound.find((item) => {
            return item.po_number === slug
        })
        dataByid = filter
    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <FormInbound mode='edit' initialValues={dataByid} slug={params.slug} />

        </div>
    )
}


