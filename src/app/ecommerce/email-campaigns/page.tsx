import React from 'react'
import EmailCampaignsList from '@/features/pages/marketing/email-campaigns'

export default async function EmailCampaignsPage() {
    // let users = []
    // try {
    //     const res = await getUsers()
    //     users = res ? res.data : dummyUser
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <EmailCampaignsList />
        </div>
    )
}

