import React, { useState, useEffect } from 'react'
import Input from "@/components/input"
import Textarea from "@/components/textarea"
import QuillInput from '@/components/quill-input'
import { CategoriesForm } from './GeneralForm'
import { stripHTML } from '@/plugins/validators/common-rules'

const SEOForm = ({ data, parentId, onChange, formDataCreate }: CategoriesForm) => {
    const titleLength = formDataCreate?.seo.metaTitle?.length || 0;
    const isTitleInvalid = titleLength !== 0 && (titleLength < 55 || titleLength > 65);
    const descLength = formDataCreate?.seo.metaDescription?.length || 0;
    const isDescInvalid = descLength !== 0 && (descLength < 145 || descLength > 165);

    const handleQuillChange = (value: string) => {
        const updated = { ...formDataCreate.seo, pageDesc: value }
        onChange(updated);
    };

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        let updated: any = { [id]: value };
        onChange(updated);

    };

    return (
        <div className='flex flex-col gap-4'>
            <Input
                id='url_logo'
                label='URL Logo'
                type='text'
                value={formDataCreate.seo.url_logo}
                onChange={handleChange}
                placeholder='https://example.com/logo.png'
            />
            <Input
                id='url_banner'
                label='URL Banner'
                type='text'
                value={formDataCreate.seo.url_banner}
                onChange={handleChange}
                placeholder='https://example.com/banner.jpg'
            />
            <Input
                id='metaTitle'
                label='Meta Title'
                type='text'
                value={formDataCreate.seo.metaTitle}
                onChange={handleChange}
                notes={
                    <span className={isTitleInvalid ? 'text-red-500' : 'text-gray-400'}>
                        min.55 / max.65, Character {titleLength}
                    </span>
                }
                placeholder='Enter SEO-friendly title'
            />
            <Textarea
                id='metaDescription'
                label='Meta Description'
                value={formDataCreate.seo.metaDescription}
                onChange={handleChange}
                notes={
                    <span className={isDescInvalid ? 'text-red-500' : 'text-gray-400'}>
                        min.145 / max.165, Character {descLength}
                    </span>
                }
                placeholder='Enter SEO-friendly description '
            />
            <QuillInput
                value={formDataCreate.seo.pageDesc}
                onChange={handleQuillChange}
                label="Page Description"
                className="col-span-full [&_.ql-editor]:min-h-[100px]"
                labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                notes="Don't use H1 tag on description"
                placeholder='Add detailed page content here.'
            />

        </div>
    )
}

export default SEOForm
