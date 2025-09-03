import React from 'react'
import FormBranchManagement from '@/features/pages/warehouse/warehouse-branch-list/FormBranchManagement'
import { dummyBranchManagement } from '@/plugins/types/warehouse-type'
import { Params } from '@/plugins/types'

export default async function EditBranchManagementPage(props: { params: Params }) {
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
            <FormBranchManagement mode='edit' initialValues={dataByid} slug={params.slug} />
        </div>
    )
}


