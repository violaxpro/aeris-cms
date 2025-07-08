import React from 'react'
import OrderList from '@/features/pages/sales/order'
import { orderDummyData } from '@/plugins/types/sales-type'

export default async function OrderPage() {

    let data = []
    return (
        <div>
            <OrderList orderData={orderDummyData}/>
        </div>
    )
}

