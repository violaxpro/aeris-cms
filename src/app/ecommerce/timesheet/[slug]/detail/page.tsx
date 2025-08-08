import React from 'react'
import { Params } from '@/plugins/types'
import DetailTimesheet from '@/features/pages/employee-management/time-attendance/timesheet/DetailTimesheet'

export default async function DetailTimesheetPage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    let dataForm: any = []
    // try {
    //     const res = await getAttributebyId(slug)
    //     if (res?.data) {
    //         dataForm = res.data
    //     }
    // } catch (error) {
    //     console.error(error)
    // }
    return (
        <div>
            <DetailTimesheet data={dataForm} slug={slug} />

        </div>
    )
}

