import React from 'react'
import FormPages from '@/features/pages/management/pages/FormPages'
import { Params } from '@/plugins/types'

export default async function EditManagementPage(props: { params: Params }) {
    let dataForm = []
    const params = await props.params;
    const slug = params.slug;
    // try {
    //     const res = await getPriceLevel(slug)
    //     if (res?.data) {
    //         dataForm = res.data
    //     }

    // } catch (error) {
    //     console.log(error)
    // }

    return (
        <div>
            <FormPages mode="edit" slug={slug} />
        </div>
    )
}

