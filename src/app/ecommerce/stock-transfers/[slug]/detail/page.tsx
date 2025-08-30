import React from 'react'
import DetailStockTransfer from '@/features/pages/warehouse/stock-transfer/DetailStockTransfer';
import { Params } from '@/plugins/types'
import { dummyStockTransfer } from '@/plugins/types/warehouse-type';

export default async function DetailStockTransferPage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    let data
    try {
        // const res = await getPriceLevel(slug)
        // if (res?.data) {
        //     dataForm = res.data
        // }
        const dataByid = dummyStockTransfer.find((item) => {
            return item.transfer_number === slug
        })
        data = dataByid
    } catch (error) {
        console.log(error)
    }


    return (
        <div>
            <DetailStockTransfer slug={slug} data={data} />
        </div>
    )
}


