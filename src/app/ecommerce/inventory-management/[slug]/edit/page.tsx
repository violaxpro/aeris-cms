import React from 'react'
import FormInventoryManagement from '@/features/pages/warehouse/inventory-list/FormInventoryManagement'
import { inventoryListDummyData } from '@/plugins/types/warehouse-type'
import { Params } from '@/plugins/types'

export default async function EditWhatsappCampaignsPage(props: { params: Params }) {
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
            <FormInventoryManagement mode='edit' initialValues={dataByid} slug={params.slug} />
        </div>
    )
}


