import React from 'react'
import AttributesList from "@/features/pages/catalogue/attributes"
import { getAttributes } from '@/services/attributes-service'

export default async function AttributesPage() {
    let attributes = { data: [], page: 1, perPage: 10, count: 0 }
    try {
        attributes = await getAttributes({ page: 1, perPage: 10 })
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <AttributesList attributesData={attributes} />

        </div>
    )
}


