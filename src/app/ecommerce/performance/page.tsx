import React from 'react'
import PerformanceView from '@/features/pages/employee-management/performance'
// import { getAttributes } from '@/services/attributes-service'

export default async function PerformancePage() {
    let data: any = []
    // try {
    //     const res = await getAttendance()
    //     data = res.data
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <PerformanceView data={data} />

        </div>
    )
}


