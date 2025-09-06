import React from 'react'
import TagsList from '@/features/pages/catalogue/tags'
import { getTags } from '@/services/tags-service'

export default async function TagsPageUrl() {
    let tags = { data: [], page: 1, perPage: 10, count: 0 }
    try {
        tags = await getTags({ page: 1, perPage: 10 })
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <TagsList tagDatas={tags} />

        </div>
    )
}


