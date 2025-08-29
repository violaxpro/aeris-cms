import React from 'react'
import DetailInbound from '@/features/pages/warehouse/inbound/DetailInbound';
import { Params } from '@/plugins/types'
import { dummyInbound } from '@/plugins/types/warehouse-type';

export default async function DetailInboundPage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    let data
    try {
        // const res = await getPriceLevel(slug)
        // if (res?.data) {
        //     dataForm = res.data
        // }
        const dataByid = dummyInbound.find((item) => {
            return item.po_number === slug
        })
        data = dataByid
    } catch (error) {
        console.log(error)
    }


    return (
        <div>
            <DetailInbound slug={slug} data={data} />
        </div>
    )
}


