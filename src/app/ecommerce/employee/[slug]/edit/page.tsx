import React from 'react'
import FormEmployee from '@/features/pages/employee-management/employee/FormEmployee';
import { Params } from '@/plugins/types'

export default async function FormEmployeePage(props: { params: Params }) {
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
            <FormEmployee mode='edit' slug={slug} />

        </div>
    )
}

