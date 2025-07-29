import React from 'react'
import LeavePermit from '@/features/pages/employee-management/time-attendance/leave-permit'
// import { getAttributes } from '@/services/attributes-service'

export default async function LeavePermitPage() {
    let data: any = []
    // try {
    //     const res = await getAttendance()
    //     data = res.data
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <LeavePermit data={data} />

        </div>
    )
}


