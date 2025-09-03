import React from 'react'
import DetailInventoryManagement from '@/features/pages/warehouse/inventory-list/DetailInventoryManagement'
import { inventoryListDummyData } from '@/plugins/types/warehouse-type'
import { Params } from '@/plugins/types'

export default async function EditInventoryManagementPage(props: { params: Params }) {
    let dataByid: any = []
    const params = await props.params;
    const slug = params.slug;
    try {
        // const res = await dummyOutbound(slug)
        // if (res?.data) {
        //     dataByid = res.data
        // }
        const filter = inventoryListDummyData.find((item) => {
            return item.id.toString() === slug
        })
        dataByid = filter
    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <DetailInventoryManagement data={dataByid} slug={params.slug} />
        </div>
    )
}


