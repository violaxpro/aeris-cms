import React from 'react'
import SmsCampaignsList from '@/features/pages/marketing/sms-campaigns'

export default async function SmsCampaignsPage() {
    // let users = []
    // try {
    //     const res = await getUsers()
    //     users = res ? res.data : dummyUser
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <SmsCampaignsList />
        </div>
    )
}

