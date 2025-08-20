import React from 'react'
import MediaList from '@/features/pages/management/media'

export default async function MediaPage() {
    let datas: any = [];
    //   try {

    //   } catch (error) {
    //     console.error('Fetch error:', error);
    //   }


    return (
        <div>
            <MediaList mediaDatas={datas} />
        </div>
    )

}


