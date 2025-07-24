import React from 'react'
import DetailOrder from '@/features/pages/sales/order/DetailOrder';
import { Params } from '@/plugins/types'
import { orderDummyData } from '@/plugins/types/sales-type';

export default async function DetailOrderPage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    let data
    try {

        const dataByid = orderDummyData.find((item) => {
            return item.po_number === slug
        })
        data = dataByid
    } catch (error) {

    }

    return (
        <div>
            <DetailOrder slug={slug} data={data} />
        </div>
    )
}


