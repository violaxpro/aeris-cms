import React, { useState, useEffect } from 'react'
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"
import { ChildFormProps } from '@/plugins/types/form-type'
import { formCategoryProps } from '@/plugins/types/treeTypes'

export type generalCategoriesForm = {
    data?: any
    parentId?: string | number | null
    onChange: (params: any) => void
}
const GeneralForm = ({ data, parentId, onChange }: generalCategoriesForm) => {
    console.log(data)
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        isSearch: false,
        isShow: false,
        isStatus: false
    })


    useEffect(() => {
        setFormData({
            name: data && data.categoriesData ? data.categoriesData.name : '',
            slug: data && data.categoriesData ? data.categoriesData.slug : '',
            isSearch: data && data.categoriesData ? data.categoriesData.show_in_search : false,
            isShow: data && data.categoriesData ? data.categoriesData.show_in_page : false,
            isStatus: data && data.categoriesData ? data.categoriesData.enabled : false,
        })
    }, [data])


    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
        onChange({ [id]: value })
    };

    const handleCheckbox = (field: keyof typeof formData) => (val: boolean) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: val };
            onChange(updated);
            return updated;
        });
    };

    return (
        <div className='flex flex-col gap-2'>
            {
                data && data.categoriesData && <Input
                    id='id'
                    label='ID'
                    type='text'
                    value={data.categoriesData.id}
                    readOnly={true}
                />
            }
            <Input
                id='name'
                label='Name'
                type='text'
                value={formData.name}
                onChange={handleChange}
            />
            <Input
                id='slug'
                label='Url Slug'
                type='text'
                value={formData.slug}
                onChange={handleChange}
            />
            <Checkbox
                label='Searchable'
                text='Show this category in search box category list'
                onChange={handleCheckbox('isSearch')}
                checked={formData.isSearch}
            />
            <Checkbox
                label='Show on Category Page'
                text='Show on Category Page'
                onChange={handleCheckbox('isShow')}

                checked={formData.isShow}
            />
            <Checkbox
                label='Status'
                text='Enable the category'
                onChange={handleCheckbox('isStatus')}
                checked={formData.isStatus}
            />

        </div>
    )
}

export default GeneralForm
