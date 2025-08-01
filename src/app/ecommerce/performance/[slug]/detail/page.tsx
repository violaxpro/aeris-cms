import React from 'react'
import DetailPerformance from '@/features/pages/employee-management/performance/DetailPerformance';
import { Params } from '@/plugins/types'

export default async function DetailPerformancePage(props: { params: Params }) {
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
            <DetailPerformance slug={slug} />

        </div>
    )
}

