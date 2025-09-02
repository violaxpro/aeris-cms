import React from 'react'
import DetailSmsCampaign from '@/features/pages/marketing/sms-campaigns/DetailSmsCampaign'
import { dummySmsCampaigns } from '@/plugins/types/marketing-type'
import { Params } from '@/plugins/types'

export default async function DetailSmsCampaignsPage(props: { params: Params }) {
    let dataByid: any = []
    const params = await props.params;
    const slug = params.slug;
    try {
        // const res = await dummyOutbound(slug)
        // if (res?.data) {
        //     dataByid = res.data
        // }
        const filter = dummySmsCampaigns.find((item) => {
            return item.id.toString() === slug
        })
        dataByid = filter
    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <DetailSmsCampaign data={dataByid} slug={params.slug} />
        </div>
    )
}


