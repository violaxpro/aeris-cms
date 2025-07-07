import React from 'react'
import AttributesList from "@/features/pages/catalogue/attributes"
import { getAttributes } from '@/services/attributes-service'

export default async function AttributesPage() {
    let attributes = []
    try {
        const res = await getAttributes()
        attributes = res.data
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <AttributesList attributesData={attributes} />

        </div>
    )
}


