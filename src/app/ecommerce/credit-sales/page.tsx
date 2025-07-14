import React from 'react'
import CreditSalesList from '@/features/pages/sales/credit'
import { creditSalesData } from '@/plugins/types/sales-type'

export default async function CreditSalesPage() {
    // let creditSuppliers = []
    // try {
    //     const res = await getCreditSupplier()
    //     creditSuppliers = res.data

    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <CreditSalesList creditSalesData={creditSalesData} />

        </div>
    )
}

