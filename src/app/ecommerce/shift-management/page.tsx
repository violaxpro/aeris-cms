import React from 'react'
import ShiftManagement from '@/features/pages/employee-management/time-attendance/shift-management'
// import { getAttributes } from '@/services/attributes-service'

export default async function ShiftManagementPage() {
    let data: any = []
    // try {
    //     const res = await getAttendance()
    //     data = res.data
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <ShiftManagement data={data} />
        </div>
    )
}


