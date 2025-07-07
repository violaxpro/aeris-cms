import React from 'react'
import { Params } from '@/plugins/types'
import { getAttributebyId } from '@/services/attributes-service';
import DetailAttribute from '@/features/pages/catalogue/attributes/formAttributes/DetailAttribute';

export default async function DetailAttributePage(props: { params: Params }) {
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
            <DetailAttribute data={dataForm} />

        </div>
    )
}

