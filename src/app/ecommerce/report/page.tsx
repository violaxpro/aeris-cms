import React from 'react'
import ReportList from '@/features/pages/employee-management/report'
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
            <ReportList data={data} />
        </div>
    )
}


