import React from 'react'
import CreditSupplierList from '@/features/pages/suppliers/credit-supplier'
import { getCreditSupplier } from '@/services/credit-suppliers-service'

export default async function CreditSupplierPage() {
    let creditSuppliers = []
    try {
        const res = await getCreditSupplier()
        creditSuppliers = res.data

    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <CreditSupplierList creditSuppliersData={creditSuppliers} />

        </div>
    )
}

