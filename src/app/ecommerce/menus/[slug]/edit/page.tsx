import React from 'react'
import FormMenu from '@/features/pages/management/menus/FormMenu';
import { Params } from '@/plugins/types'

export default async function EditMenuPage(props: { params: Params }) {
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
            <FormMenu mode="edit" slug={slug} />
        </div>
    )
}

