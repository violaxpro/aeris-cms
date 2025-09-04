import React, { useState, useEffect } from 'react'
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"
import { ChildFormProps } from '@/plugins/types/form-type'
import { formCategoryProps } from '@/plugins/types/treeTypes'
import { slugify } from '@/plugins/validators/common-rules'

export type generalCategoriesForm = {
    data?: any
    parentId?: string | number | null
    onChange: (params: any) => void
    formDataCreate?: any
}
const GeneralForm = ({ data, parentId, onChange, formDataCreate }: generalCategoriesForm) => {
    console.log(data)
    // const [formData, setFormData] = useState({
    //     name: '',
    //     slug: '',
    //     isSearch: false,
    //     isShow: false,
    //     isStatus: false
    // })

    // useEffect(() => {
    //     setFormData({
    //         name: data && data.categoriesData ? data.categoriesData.name : '',
    //         slug: data && data.categoriesData ? data.categoriesData.slug : '',
    //         isSearch: data && data.categoriesData ? data.categoriesData.show_in_search : false,
    //         isShow: data && data.categoriesData ? data.categoriesData.show_in_page : false,
    //         isStatus: data && data.categoriesData ? data.categoriesData.enabled : false,
    //     })
    // }, [data])


    const handleChange = (e: any) => {
        const { id, value } = e.target;
        let updated: any = { [id]: value };
        if (id == 'name') {
            updated = { ...updated, slug: slugify(value) };
        }
        onChange(updated)
    };

    const handleChangeCheckbox = (field: any) => (val: boolean) => {
        const updated = { [field]: val };
        onChange(updated);
    };

    return (
        <div className='flex flex-col gap-4'>
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
                value={formDataCreate.general.name}
                onChange={handleChange}
            />
            <Input
                id='slug'
                label='Url Slug'
                type='text'
                value={formDataCreate.general.slug}
                onChange={handleChange}
            />
            <Checkbox
                label='Searchable'
                text='Show this category in search box category list'
                onChange={handleChangeCheckbox('isSearch')}
                checked={formDataCreate.general.isSearch}
            />
            <Checkbox
                label='Show on Category Page'
                text='Show on Category Page'
                onChange={handleChangeCheckbox('isShow')}

                checked={formDataCreate.general.isShow}
            />
            <Checkbox
                label='Status'
                text='Enable the category'
                onChange={handleChangeCheckbox('isStatus')}
                checked={formDataCreate.general.isStatus}
            />

        </div>
    )
}

export default GeneralForm
