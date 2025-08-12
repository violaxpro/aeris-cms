import React from 'react'
import FormCoupon from '@/features/pages/marketing/coupon/FormCoupon';
import { Params } from '@/plugins/types'

export default async function EditCouponPage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    // let dataForm = []
    // try {
    //     const res = await getAttributebyId(slug)
    //     if (res?.data) {
    //         dataForm = res.data
    //     }
    // } catch (error) {
    //     console.error(error)
    // }
    return (
        <div>
            <FormCoupon mode='edit' slug={slug} />

        </div>
    )
}

