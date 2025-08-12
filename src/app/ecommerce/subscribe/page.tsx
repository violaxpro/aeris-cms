import React from 'react'
import SubscribeList from '@/features/pages/users/subscribe'
import { getUsers } from '@/services/users-service'
import { dummyUser } from '@/plugins/types/users-type'

export default async function SubscribePage() {
    let users = []
    try {
        const res = await getUsers()
        users = res ? res.data : dummyUser
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <SubscribeList subscribeData={users} />
        </div>
    )
}

