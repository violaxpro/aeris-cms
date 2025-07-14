import React from 'react'
import ReturnSales from '@/features/pages/sales/rma'
import { getReturnSales } from '@/services/return-sales-service'
import { returnData } from '@/plugins/types/sales-type'

export default async function ReturnSalesPage() {
    // let returnSales = []
    // try {
    //     const res = await getReturnSales()
    //     returnSales = res.data

    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <ReturnSales returnSales={returnData} />
        </div>
    )
}

