import React from 'react'
import SupplierList from '@/features/pages/suppliers/supplier-list'
import { getSupplier } from '@/services/supplier-list-service'

export default async function ReviewsPageUrl() {
    let suppliers = []
    try {
        const res = await getSupplier()
        suppliers = res.data

    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <SupplierList suppliersData={suppliers} />

        </div>
    )
}

