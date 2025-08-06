import React from 'react'
import DetailOrder from '@/features/pages/sales/order/DetailOrder';
import PackingSlip from '@/features/pages/sales/order/packing-slip'
import { Params } from '@/plugins/types'
import { orderDummyData } from '@/plugins/types/sales-type';

export default async function PackingSlipDetailPage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    let data
    try {

        const dataByid = orderDummyData.find((item) => {
            return item.invoice_number === slug
        })
        data = dataByid
    } catch (error) {

    }

    return (
        <div>
            <PackingSlip slug={slug} detailOrder={data} />
        </div>
    )
}


