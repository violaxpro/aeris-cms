import React from 'react'
import FormAttributes from '@/features/pages/catalogue/attributes/formAttributes/FormAttributes'
import { Params } from '@/plugins/types'
import { getAttributebyId } from '@/services/attributes-service';
import { getCategories } from '@/services/category-service';

export default async function EditAttributePage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    let dataForm = []
    try {
        const res = await getAttributebyId(slug)
        if (res?.data) {
            dataForm = res.data
        }
    } catch (error) {
        console.error(error)
    }
    return (
        <div>
            <FormAttributes mode='edit' slug={slug} initialValues={dataForm} />

        </div>
    )
}

