import React from 'react'
import UsersList from '@/features/pages/users/users'
// import { getUsers } from '@/services/users-service'
import { dummyUser } from '@/plugins/types/users-type'

export default async function UsersPage() {
    // let users = []
    // try {
    //     const res = await getUsers()
    //     users = res ? res.data : dummyUser
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <UsersList usersData={dummyUser} />
        </div>
    )
}

