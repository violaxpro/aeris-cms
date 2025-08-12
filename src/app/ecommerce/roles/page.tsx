import React from 'react'
import RolesList from '@/features/pages/users/roles'
import { getRoles } from '@/services/roles-service'

export default async function RolesPage() {
    let roles: any = []
    try {
        const res = await getRoles()
        roles = res ? res.data : []
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <RolesList rolesData={roles} />
        </div>
    )
}

