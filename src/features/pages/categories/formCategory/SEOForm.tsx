import React, { useState } from 'react'
import Input from "@/components/input"
import Textarea from "@/components/textarea"
import QuillInput from '@/components/quill-input'
import { formProps } from './GeneralForm'
import { stripHTML } from '@/plugins/validators/common-rules'

const SEOForm = ({ data, parentId }: formProps) => {
    const [formData, setFormData] = useState({
        url: '',
        metaTitle: '',
        metaDescription: '',
        pageDesc: '',

    })

    console.log(parentId)

    const handleQuillChange = (value: string) => {
        setFormData({ ...formData, metaDescription: value });
    };

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    return (
        <div className='flex flex-col gap-2'>
            <Input
                id='url'
                label='URL'
                type='text'
                value={formData.url}
                onChange={handleChange}
            />
            <Input
                id='metaTitle'
                label='Meta Title'
                type='text'
                value={parentId ? '' : data && data.categoriesData ? data.categoriesData.meta_title : formData.metaTitle}
                onChange={handleChange}
                notes='Character Count : 0'
            />
            <Textarea
                label='Meta Description'
                value={parentId ? '' : data && data.categoriesData ? stripHTML(data.categoriesData.meta_description) : formData.metaDescription}
                onChange={handleChange}
                notes='Character Count : 0'
            />
            <QuillInput
                value={parentId ? '' : data && data.categoriesData ? data.categoriesData.page_description : formData.pageDesc}
                onChange={handleQuillChange}
                label="Page Description"
                className="col-span-full [&_.ql-editor]:min-h-[100px]"
                labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                notes="Don't use H1 tag on description"
            />

        </div>
    )
}

export default SEOForm
