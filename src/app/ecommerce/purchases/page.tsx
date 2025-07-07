import React from 'react'
import PurchasesList from '@/features/pages/suppliers/purchases'
import { getCreditSupplier } from '@/services/credit-suppliers-service'

export default async function ReviewsPageUrl() {
    let data = []
    try {
        const res = await getCreditSupplier()
        data = res.data

    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <PurchasesList purchasesData={data} />

        </div>
    )
}

