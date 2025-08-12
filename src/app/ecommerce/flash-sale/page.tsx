import React from 'react'
import FlashSale from '@/features/pages/marketing/flash-sale'
import { getUsers } from '@/services/users-service'
import { flashSaleData } from '@/plugins/types/marketing-type'

export default async function FlashSalePage() {
    // let users = []
    // try {
    //     const res = await getUsers()
    //     users = res ? res.data : dummyUser
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <FlashSale flashSaleData={flashSaleData} />
        </div>
    )
}

