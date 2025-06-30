import React, { useState } from 'react'
import Input from "@/components/input"
import Textarea from "@/components/textarea"
import QuillInput from '@/components/quill-input'

const SEOForm = () => {
    const [formData, setFormData] = useState({
        url: '',
        metaTitle: '',
        metaDescription: '',
        pageDesc: '',

    })

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
                value={formData.metaTitle}
                onChange={handleChange}
                notes='Character Count : 0'
            />
            <Textarea
                label='Meta Description'
                value={formData.metaDescription}
                onChange={handleChange}
                notes='Character Count : 0'
            />
            <QuillInput
                value={formData.pageDesc}
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
