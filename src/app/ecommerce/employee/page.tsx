import React from 'react'
import Employee from '@/features/pages/employee-management/employee'
// import { getAttributes } from '@/services/attributes-service'

export default async function EmployeePage() {
    let data: any = []
    // try {
    //     const res = await getEmployee()
    //     data = res.data
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <Employee data={data} />

        </div>
    )
}


