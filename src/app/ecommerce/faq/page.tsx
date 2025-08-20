import React from 'react'
import FaqList from '@/features/pages/management/faq/faq'

export default async function FaqPage() {
    let datas: any = [];
    //   try {

    //   } catch (error) {
    //     console.error('Fetch error:', error);
    //   }


    return (
        <div>
            <FaqList faqDatas={datas} />
        </div>
    )

}


