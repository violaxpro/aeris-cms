import React from 'react'
import FormReportingAnalytics from '@/features/pages/warehouse/reporting-analytics/FormReportingAnalytics'
import { dummyReportingAnalytics } from '@/plugins/types/warehouse-type'
import { Params } from '@/plugins/types'

export default async function EditReportingAnalyticsPage(props: { params: Params }) {
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
            <FormReportingAnalytics mode='edit' initialValues={dataByid} slug={params.slug} />
        </div>
    )
}


