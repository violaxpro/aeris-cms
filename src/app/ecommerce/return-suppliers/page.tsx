import React from 'react'
import ReturnSupplierList from '@/features/pages/suppliers/return-supplier'
import { getReturnSupplier } from '@/services/return-supplier'

export default async function ReviewsPageUrl() {
    let returnSupplierData = []
    try {
        const res = await getReturnSupplier()
        returnSupplierData = res.data

    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <ReturnSupplierList returnSupplierData={returnSupplierData} />

        </div>
    )
}

