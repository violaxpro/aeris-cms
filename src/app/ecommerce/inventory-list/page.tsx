import React from 'react'
import InventoryList from '@/features/pages/warehouse/inventory-list'
import { inventoryListDummyData } from '@/plugins/types/warehouse-type'

export default async function InventoryListPage() {
    return (
        <div>
            <InventoryList inventoryLists={inventoryListDummyData} />
        </div>
    )
}

