import React from 'react'
import GoodReceiptLists from '@/features/pages/suppliers/good-receipts'

export default async function GoodReceiptPageUrl() {
    let data: any = []
    // try {
    //     const res = await getCreditSupplier()
    //     data = res.data

    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <GoodReceiptLists goodReceiptDatas={data} />

        </div>
    )
}

