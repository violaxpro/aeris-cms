import React from 'react'
import DetailOutbound from '@/features/pages/warehouse/outbound/DetailOutbound';
import { Params } from '@/plugins/types'
import { dummyOutbound } from '@/plugins/types/warehouse-type';

export default async function DetailOutboundPage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    let data
    try {
        // const res = await getPriceLevel(slug)
        // if (res?.data) {
        //     dataForm = res.data
        // }
        const dataByid = dummyOutbound.find((item) => {
            return item.order_number === slug
        })
        data = dataByid
    } catch (error) {
        console.log(error)
    }


    return (
        <div>
            <DetailOutbound slug={slug} data={data} />
        </div>
    )
}


