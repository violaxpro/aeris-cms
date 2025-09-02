import React from 'react'
import FormEmailCampaigns from '@/features/pages/marketing/email-campaigns/FormEmailCampaigns'
import { dummyEmailCampaigns } from '@/plugins/types/marketing-type'
import { Params } from '@/plugins/types'

export default async function EditEmailCampaignsPage(props: { params: Params }) {
    let dataByid: any = []
    const params = await props.params;
    const slug = params.slug;
    try {
        // const res = await dummyOutbound(slug)
        // if (res?.data) {
        //     dataByid = res.data
        // }
        const filter = dummyEmailCampaigns.find((item) => {
            return item.id.toString() === slug
        })
        dataByid = filter
    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <FormEmailCampaigns mode='edit' initialValues={dataByid} slug={params.slug} />
        </div>
    )
}


