import React from 'react'
import FormSerialNumber from '@/features/pages/suppliers/purchases/FormSerialNumber'
import { Params } from '@/plugins/types'

export default async function CreateSerialNumber(props: { params: Params }) {
    // let dataForm = []
    const params = await props.params;
    const slug = params.slug;
    // try {
    //     const res = await getBrands(slug)
    //     if (res?.data) {
    //         dataForm = res.data
    //     }

    // } catch (error) {
    //     console.log(error)
    // }
    return (
        <div>
            <FormSerialNumber mode='edit' slug={slug} />
        </div>
    )
}


