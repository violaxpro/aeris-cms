import React from 'react'
import FormGoodReceipt from '@/features/pages/suppliers/good-receipts/FormGoodReceipt';
import { dummyGoodReceipts } from '@/plugins/types/suppliers-type';
import { Params } from '@/plugins/types'

export default async function EditGoodReceiptPage(props: { params: Params }) {
    let dataForm
    const params = await props.params;
    const slug = params.slug;
    try {
        // const res = await getPriceLevel(slug)
        // if (res?.data) {
        //     dataForm = res.data
        // }
        const dataByid = dummyGoodReceipts.find((item) => {
            return item.grnNo === slug
        })
        dataForm = dataByid
    } catch (error) {
        console.log(error)
    }

    return (
        <div>
            <FormGoodReceipt mode="edit" slug={slug} initialValues={dataForm} />
        </div>
    )
}

