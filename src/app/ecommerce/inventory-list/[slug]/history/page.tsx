import React from 'react'
import InventoryListsHistory from '@/features/pages/warehouse/inventory-list/InventoryListHistory';
import { Params } from '@/plugins/types'
import { inventoryListDummyData } from '@/plugins/types/warehouse-type';

export default async function InventoryListHistoryPage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    let data
    try {
        const dataByid = inventoryListDummyData.find((item) => {
            return item.sku === slug
        })
        data = dataByid
    } catch (error) {

    }

    return (
        <div>
            <InventoryListsHistory slug={slug} historyData={data} />
        </div>
    )
}


