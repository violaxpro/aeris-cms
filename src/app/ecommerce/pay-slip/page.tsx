import React from 'react'
import PaySlip from '@/features/pages/employee-management/pay-slip'
// import { getAttributes } from '@/services/attributes-service'

export default async function PaySlipPage() {
    let data: any = []
    // try {
    //     const res = await getPaySlip()
    //     data = res.data
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <PaySlip data={data} />

        </div>
    )
}


