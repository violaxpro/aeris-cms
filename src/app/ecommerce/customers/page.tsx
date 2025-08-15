import React from 'react'
import CustomersList from '@/features/pages/customers'
// import { getUsers } from '@/services/users-service'
import { dummyUser } from '@/plugins/types/users-type'

export default async function CustomersPage() {
    let users = []
    // try {
    //     const res = await getUsers()
    //     users = res ? res.data : dummyUser
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <CustomersList customersData={dummyUser} />
        </div>
    )
}

