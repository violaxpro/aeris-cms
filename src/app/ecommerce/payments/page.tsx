import React from 'react'
import PaymentsLists from '@/features/pages/suppliers/payments'

export default async function PaymentsPageUrl() {
    let data: any = []
    // try {
    //     const res = await getCreditSupplier()
    //     data = res.data

    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <PaymentsLists paymentDatas={data} />

        </div>
    )
}

