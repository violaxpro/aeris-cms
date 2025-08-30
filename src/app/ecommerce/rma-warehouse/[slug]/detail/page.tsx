import React from 'react'
import DetailReturnWarehouse from '@/features/pages/warehouse/return-warehouse/DetailReturnWarehouse';
import { Params } from '@/plugins/types'
import { rmaDummyData } from '@/plugins/types/warehouse-type';

export default async function DetailReturnWarehousePage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    let data
    try {
        // const res = await getPriceLevel(slug)
        // if (res?.data) {
        //     dataForm = res.data
        // }
        const dataByid = rmaDummyData.find((item) => {
            return item.rma_no === slug
        })
        data = dataByid
    } catch (error) {
        console.log(error)
    }


    return (
        <div>
            <DetailReturnWarehouse slug={slug} data={data} />
        </div>
    )
}


