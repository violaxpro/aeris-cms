import React from 'react'
import FormReturnWarehouse from '@/features/pages/warehouse/return-warehouse/FormReturnWarehouse'
import { rmaDummyData } from '@/plugins/types/warehouse-type'
import { Params } from '@/plugins/types'

export default async function EditReturnWarehousePage(props: { params: Params }) {
    let dataByid: any = []
    const params = await props.params;
    const slug = params.slug;
    try {
        // const res = await dummyOutbound(slug)
        // if (res?.data) {
        //     dataByid = res.data
        // }
        const filter = rmaDummyData.find((item) => {
            return item.rma_no === slug
        })
        dataByid = filter
    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <FormReturnWarehouse mode='edit' initialValues={dataByid} slug={params.slug} />
        </div>
    )
}


