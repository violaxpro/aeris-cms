import React, { useState } from 'react'
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"

export type formProps = {
    data?: any
    parentId?: string | number | null
}
const GeneralForm = ({ data, parentId }: formProps) => {
    console.log(data)
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        isSearch: false,
        isShow: false,
        isStatus: false
    })

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
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
                value={parentId
                    ? ''
                    : data && data.categoriesData
                        ? data.categoriesData.name
                        : formData.name}
                onChange={handleChange}
            />
            <Checkbox
                label='Searchable'
                text='Show this category in search box category list'
                onChange={(val) => setFormData({ ...formData, isSearch: val })}
                checked={parentId ? '' : data && data.categoriesData ? data.categoriesData.show_in_search : formData.isSearch}
            />
            <Checkbox
                label='Show on Category Page'
                text='Show on Category Page'
                onChange={(val) => setFormData({ ...formData, isShow: val })}
                checked={parentId ? '' : data && data.categoriesData ? data.categoriesData.show_in_page : formData.isShow}
            />
            <Checkbox
                label='Status'
                text='Enable the category'
                onChange={(val) => setFormData({ ...formData, isStatus: val })}
                checked={parentId ? '' : data && data.categoriesData ? data.categoriesData.enabled : formData.isStatus}
            />

        </div>
    )
}

export default GeneralForm
