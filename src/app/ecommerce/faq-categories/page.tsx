import React from 'react'
import FaqCategoriesList from '@/features/pages/management/faq/faq-categories'

export default async function FaqCategoriesPage() {
    let datas: any = [];
    //   try {

    //   } catch (error) {
    //     console.error('Fetch error:', error);
    //   }


    return (
        <div>
            <FaqCategoriesList faqCategoryDatas={datas} />
        </div>
    )

}


