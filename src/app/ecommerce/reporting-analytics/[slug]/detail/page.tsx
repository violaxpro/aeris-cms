import React from 'react'
import DetailReportingAnalytics from '@/features/pages/warehouse/reporting-analytics/DetailReportingAnalytics'
import { dummyReportingAnalytics } from '@/plugins/types/warehouse-type'
import { Params } from '@/plugins/types'

export default async function DetailReportingAnalyticsPage(props: { params: Params }) {
    let dataByid: any = []
    const params = await props.params;
    const slug = params.slug;
    try {
        // const res = await dummyOutbound(slug)
        // if (res?.data) {
        //     dataByid = res.data
        // }
        const filter = dummyReportingAnalytics.find((item) => {
            return item.id.toString() === slug
        })
        dataByid = filter
    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <DetailReportingAnalytics data={dataByid} slug={params.slug} />
        </div>
    )
}


