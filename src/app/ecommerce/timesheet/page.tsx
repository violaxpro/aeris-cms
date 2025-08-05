import React from 'react'
import Timesheet from '@/features/pages/employee-management/time-attendance/timesheet'
// import { getAttributes } from '@/services/attributes-service'

export default async function TimesheetPage() {
    let data: any = []
    // try {
    //     const res = await getAttendance()
    //     data = res.data
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <Timesheet data={data} />
        </div>
    )
}


