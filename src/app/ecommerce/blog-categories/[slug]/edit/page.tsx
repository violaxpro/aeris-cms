import React from 'react'
import FormBlogCategory from '@/features/pages/management/blog/blog-categories/FormBlogCategory';
import { Params } from '@/plugins/types'

export default async function EditBlogCategoryPage(props: { params: Params }) {
    let dataForm = []
    const params = await props.params;
    const slug = params.slug;
    // try {
    //     const res = await getPriceLevel(slug)
    //     if (res?.data) {
    //         dataForm = res.data
    //     }

    // } catch (error) {
    //     console.log(error)
    // }

    return (
        <div>
            <FormBlogCategory mode="edit" slug={slug} />
        </div>
    )
}

