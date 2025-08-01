import React from 'react'
import BenefitList from '@/features/pages/employee-management/benefit'
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
            <BenefitList data={data} />

        </div>
    )
}


