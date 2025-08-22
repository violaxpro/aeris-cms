import React from 'react'
import DetailGoodReceipt from '@/features/pages/suppliers/good-receipts/DetailGoodReceipt';
import { Params } from '@/plugins/types'
import { dummyGoodReceipts } from '@/plugins/types/suppliers-type';

export default async function DetailGoodReceiptPage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    let data
    try {
        // const res = await getPriceLevel(slug)
        // if (res?.data) {
        //     dataForm = res.data
        // }
        const dataByid = dummyGoodReceipts.find((item) => {
            return item.grnNo === slug
        })
        data = dataByid
    } catch (error) {
        console.log(error)
    }


    return (
        <div>
            <DetailGoodReceipt slug={slug} data={data} />
        </div>
    )
}


