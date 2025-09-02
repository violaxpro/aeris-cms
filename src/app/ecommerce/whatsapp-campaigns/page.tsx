import React from 'react'
import WhatsappCampaignsList from '@/features/pages/marketing/whatsapp-campaigns'

export default async function WhatsappCampaignsPage() {
    // let users = []
    // try {
    //     const res = await getUsers()
    //     users = res ? res.data : dummyUser
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <WhatsappCampaignsList />
        </div>
    )
}

