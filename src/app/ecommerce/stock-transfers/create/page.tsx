import React from 'react'
import FormStockTransfer from '@/features/pages/warehouse/stock-transfer/FormStockTransfer'

export default async function CreateStockTransferPage() {
    return (
        <div>
            <FormStockTransfer mode='create' />
        </div>
    )
}


