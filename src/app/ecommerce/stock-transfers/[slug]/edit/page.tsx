import React from 'react'
import FormStockTransfer from '@/features/pages/warehouse/stock-transfer/FormStockTransfer'
import { dummyStockTransfer } from '@/plugins/types/warehouse-type'
import { Params } from '@/plugins/types'

export default async function EditStockTransferPage(props: { params: Params }) {
    let dataByid: any = []
    const params = await props.params;
    const slug = params.slug;
    try {
        // const res = await dummyOutbound(slug)
        // if (res?.data) {
        //     dataByid = res.data
        // }
        const filter = dummyStockTransfer.find((item) => {
            return item.transfer_number === slug
        })
        dataByid = filter
    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <FormStockTransfer mode='edit' initialValues={dataByid} slug={params.slug} />
        </div>
    )
}


