import React from 'react'
import FormOptions from '@/features/pages/catalogue/options/FormOptions'
import { getOptionsById } from '@/services/options-service';
import { Params } from '@/plugins/types'

export default async function EditOptionsPage(props: { params: Params }) {
    let dataForm = []
    const params = await props.params;
    const slug = params.slug;
    try {
        const res = await getOptionsById(slug)
        if (res?.data) {
            dataForm = res.data
        }

    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <FormOptions mode='edit' initialValues={dataForm} slug={slug} />
        </div>
    )
}


