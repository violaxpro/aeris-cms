import React from 'react'
import Overtime from '@/features/pages/employee-management/time-attendance/overtime'
// import { getAttributes } from '@/services/attributes-service'

export default async function OvertimePage() {
    let data: any = []
    // try {
    //     const res = await getAttendance()
    //     data = res.data
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <div>
            <Overtime data={data} />

        </div>
    )
}


