import React from 'react'
import FormStockAdjustment from '@/features/pages/warehouse/stock-adjustment/FormStockAdjustment'
import { dummyStockAdjustment } from '@/plugins/types/warehouse-type'
import { Params } from '@/plugins/types'

export default async function EditStockAdjustmentsPage(props: { params: Params }) {
    let dataByid: any = []
    const params = await props.params;
    const slug = params.slug;
    try {
        // const res = await dummyOutbound(slug)
        // if (res?.data) {
        //     dataByid = res.data
        // }
        const filter = dummyStockAdjustment.find((item) => {
            return item.adjustment_number === slug
        })
        dataByid = filter
    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <FormStockAdjustment mode='edit' initialValues={dataByid} slug={params.slug} />
        </div>
    )
}


