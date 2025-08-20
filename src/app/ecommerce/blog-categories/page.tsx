import React from 'react'
import BlogCategoriesList from '@/features/pages/management/blog/blog-categories'

export default async function BlogCategoryPage() {
    let blogs: any = [];
    //   try {

    //   } catch (error) {
    //     console.error('Fetch error:', error);
    //   }


    return (
        <div>
            <BlogCategoriesList blogCategoriesData={blogs} />
        </div>
    )

}


