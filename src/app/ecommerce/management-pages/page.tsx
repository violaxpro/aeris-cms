import React from 'react'
import ManagementPageList from '@/features/pages/management/pages'

export default async function ManagementPageUrl() {
    let datas: any = [];
    //   try {

    //   } catch (error) {
    //     console.error('Fetch error:', error);
    //   }


    return (
        <div>
            <ManagementPageList pageDatas={datas} />
        </div>
    )

}


