import React, { useState } from 'react'
import Input from "@/components/input"
import Textarea from "@/components/textarea"
import FormGroup from '@/components/form'

const SEOForm = () => {
    const [formData, setFormData] = useState({
        metaTitle: '',
        metaDescription: '',
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
            <FormGroup
                title="SEO Information"
                column={1}
            >
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
            </FormGroup>


        </div>
    )
}

export default SEOForm
