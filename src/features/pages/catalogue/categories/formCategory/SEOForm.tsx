import React, { useState, useEffect } from 'react'
import Input from "@/components/input"
import Textarea from "@/components/textarea"
import QuillInput from '@/components/quill-input'
import { generalCategoriesForm } from './GeneralForm'
import { stripHTML } from '@/plugins/validators/common-rules'

const SEOForm = ({ data, parentId, onChange }: generalCategoriesForm) => {
    const [formData, setFormData] = useState({
        url_logo: '',
        url_banner: '',
        metaTitle: '',
        metaDescription: '',
        pageDesc: '',
    })

    useEffect(() => {
        setFormData({
            url_logo: data && data.categoriesData ? data.categoriesData.url_logo : '',
            url_banner: data && data.categoriesData ? data.categoriesData.url_banner : '',
            metaTitle: data && data.categoriesData ? data.categoriesData.meta_title : '',
            metaDescription: data && data.categoriesData ? stripHTML(data.categoriesData.meta_description) : '',
            pageDesc: data && data.categoriesData ? data.categoriesData.page_description : '',
        })
    }, [data])

    console.log(parentId, data, 'forn seo')

    const handleQuillChange = (value: string) => {
        setFormData(prev => {
            const updated = { ...prev, pageDesc: value }
            onChange(updated);
            return updated;
        })
    };

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData(prev => {
            const updated = { ...prev, [id]: value }
            onChange(updated);
            return updated;
        });
    };

    const metaTitle = formData.metaTitle;
    const titleLength = metaTitle?.length || 0;
    const isTitleInvalid = titleLength > 65;

    const metaDescription = formData.metaDescription;
    const descLength = metaDescription?.length || 0;
    const isDescInvalid = descLength > 165;

    return (
        <div className='flex flex-col gap-4'>
            <Input
                id='url_logo'
                label='URL Logo'
                type='text'
                value={formData.url_logo}
                onChange={handleChange}
            />
            <Input
                id='url_banner'
                label='URL Banner'
                type='text'
                value={formData.url_banner}
                onChange={handleChange}
            />
            <Input
                id='metaTitle'
                label='Meta Title'
                type='text'
                value={formData.metaTitle}
                onChange={handleChange}
                notes={
                    <span className={isTitleInvalid ? 'text-red-500' : 'text-gray-400'}>
                        min.55 / max.65, Character {titleLength}
                    </span>
                }
            />
            <Textarea
                id='metaDescription'
                label='Meta Description'
                value={formData.metaDescription}
                onChange={handleChange}
                notes={
                    <span className={isDescInvalid ? 'text-red-500' : 'text-gray-400'}>
                        min.145 / max.165, Character {descLength}
                    </span>
                }
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
