import React from 'react'
import Attendance from '@/features/pages/employee-management/time-attendance/attendance'
// import { getAttributes } from '@/services/attributes-service'

export default async function AttendancePage() {
    let data: any = []
    // try {
    //     const res = await getAttendance()
    //     data = res.data
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <Attendance data={data} />

        </div>
    )
}


