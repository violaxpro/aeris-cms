import React, { useState } from 'react'
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"

type formProps = {
    data?: any
}
const GeneralForm = ({ data }: formProps) => {
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
                data && <Input
                    id='id'
                    label='ID'
                    type='text'
                    value={data.key}
                    readOnly={true}
                />
            }
            <Input
                id='name'
                label='Name'
                type='text'
                value={data ? data.text : formData.name}
                onChange={handleChange}
            />
            <Checkbox
                label='Searchable'
                text='Show this category in search box category list'
                onChange={(val) => setFormData({ ...formData, isSearch: val })}
                checked={formData.isSearch}
            />
            <Checkbox
                label='Show on Category Page'
                text='Show on Category Page'
                onChange={(val) => setFormData({ ...formData, isShow: val })}
                checked={formData.isShow}
            />
            <Checkbox
                label='Status'
                text='Enable the category'
                onChange={(val) => setFormData({ ...formData, isStatus: val })}
                checked={formData.isStatus}
            />

        </div>
    )
}

export default GeneralForm
