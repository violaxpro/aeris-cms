import React from 'react'
import DetailBranchManagement from '@/features/pages/warehouse/warehouse-branch-list/DetailBranchManagement'
import { dummyBranchManagement } from '@/plugins/types/warehouse-type'
import { Params } from '@/plugins/types'

export default async function DetailBranchManagementPage(props: { params: Params }) {
    let dataByid: any = []
    const params = await props.params;
    const slug = params.slug;
    try {
        // const res = await dummyOutbound(slug)
        // if (res?.data) {
        //     dataByid = res.data
        // }
        const filter = dummyBranchManagement.find((item) => {
            return item.warehouse_code === slug
        })
        dataByid = filter
    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <DetailBranchManagement data={dataByid} slug={params.slug} />
        </div>
    )
}


