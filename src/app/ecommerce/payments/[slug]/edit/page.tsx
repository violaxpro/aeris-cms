import React from 'react'
import FormPayment from '@/features/pages/suppliers/payments/FormPayment';
import { dummyPayments } from '@/plugins/types/suppliers-type';
import { Params } from '@/plugins/types'

export default async function EditPaymentPage(props: { params: Params }) {
    let dataForm
    const params = await props.params;
    const slug = params.slug;
    try {
        // const res = await getPriceLevel(slug)
        // if (res?.data) {
        //     dataForm = res.data
        // }
        const dataByid = dummyPayments.find((item) => {
            return item.paymentNo === slug
        })
        dataForm = dataByid
    } catch (error) {
        console.log(error)
    }

    return (
        <div>
            <FormPayment mode="edit" slug={slug} initialValues={dataForm} />
        </div>
    )
}

