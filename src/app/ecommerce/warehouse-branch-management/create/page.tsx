import React from 'react'
import FormBranchManagement from '@/features/pages/warehouse/warehouse-branch-list/FormBranchManagement'

export default async function CreateBranchManagementPage() {
    return (
        <div>
            <FormBranchManagement mode='create' />
        </div>
    )
}


