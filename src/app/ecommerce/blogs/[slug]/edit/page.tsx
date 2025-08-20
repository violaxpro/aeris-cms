import React from 'react'
import FormBlog from '@/features/pages/management/blog/blog/FormBlog';
import { Params } from '@/plugins/types'

export default async function EditBlogPage(props: { params: Params }) {
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
            <FormBlog mode="edit" slug={slug} />
        </div>
    )
}

