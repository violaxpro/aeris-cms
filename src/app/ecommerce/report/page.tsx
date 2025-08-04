import React from 'react'
import ReportView from '@/features/pages/employee-management/report'
// import { getAttributes } from '@/services/attributes-service'

export default async function ReportPage() {
    let data: any = []
    // try {
    //     const res = await getAttendance()
    //     data = res.data
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <ReportView data={data} />
        </div>
    )
}


