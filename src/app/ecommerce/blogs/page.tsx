import React from 'react'
import BlogsList from '@/features/pages/management/blog/blog'

export default async function BlogsPageUrl() {
    let blogs: any = [];
    //   try {

    //   } catch (error) {
    //     console.error('Fetch error:', error);
    //   }


    return (
        <div>
            <BlogsList blogsData={blogs} />
        </div>
    )

}


