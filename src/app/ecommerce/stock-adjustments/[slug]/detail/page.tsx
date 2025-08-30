import React from 'react'
import DetailStockAdjustment from '@/features/pages/warehouse/stock-adjustment/DetailStockAdjustment';
import { Params } from '@/plugins/types'
import { dummyStockAdjustment } from '@/plugins/types/warehouse-type';

export default async function DetailStockAdjustmentPage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    let data
    try {
        // const res = await getPriceLevel(slug)
        // if (res?.data) {
        //     dataForm = res.data
        // }
        const dataByid = dummyStockAdjustment.find((item) => {
            return item.adjustment_number === slug
        })
        data = dataByid
    } catch (error) {
        console.log(error)
    }


    return (
        <div>
            <DetailStockAdjustment slug={slug} data={data} />
        </div>
    )
}


