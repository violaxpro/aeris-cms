import React from 'react'
import CouponList from '@/features/pages/marketing/coupon'
import { getUsers } from '@/services/users-service'
import { dummyCoupon } from '@/plugins/types/marketing-type'

export default async function CouponPage() {
    // let users = []
    // try {
    //     const res = await getUsers()
    //     users = res ? res.data : dummyUser
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <CouponList couponData={dummyCoupon} />
        </div>
    )
}

