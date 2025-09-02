import React from 'react'
import FormWhatsappCampaign from '@/features/pages/marketing/whatsapp-campaigns/FormWhatsappCampaign'
import { dummyWhatsappCampaigns } from '@/plugins/types/marketing-type'
import { Params } from '@/plugins/types'

export default async function EditWhatsappCampaignsPage(props: { params: Params }) {
    let dataByid: any = []
    const params = await props.params;
    const slug = params.slug;
    try {
        // const res = await dummyOutbound(slug)
        // if (res?.data) {
        //     dataByid = res.data
        // }
        const filter = dummyWhatsappCampaigns.find((item) => {
            return item.id.toString() === slug
        })
        dataByid = filter
    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <FormWhatsappCampaign mode='edit' initialValues={dataByid} slug={params.slug} />
        </div>
    )
}


