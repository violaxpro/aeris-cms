import React from 'react'
import DetailPayment from '@/features/pages/suppliers/payments/DetailPayment';
import { Params } from '@/plugins/types'
import { dummyPayments } from '@/plugins/types/suppliers-type';

export default async function DetailPaymentPage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    let data
    try {
        // const res = await getPriceLevel(slug)
        // if (res?.data) {
        //     dataForm = res.data
        // }
        const dataByid = dummyPayments.find((item) => {
            return item.paymentNo === slug
        })
        data = dataByid
    } catch (error) {
        console.log(error)
    }


    return (
        <div>
            <DetailPayment slug={slug} data={data} />
        </div>
    )
}


