import React, { useState } from 'react'
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"
import FormGroup from '@/components/form'
import Textarea from '@/components/textarea'
import FileUploader from '@/components/input-file'


type formProps = {
    data?: any
}
const GeneralForm = ({ data }: formProps) => {
    console.log(data)
    const [formData, setFormData] = useState({
        name: '',
        discountPercent: '',
        status: false,
        metaTitle: '',
        metaDescription: '',
        urlBanner: '',
        urlLogo: ''
    })
    const [formErrors, setFormErrors] = useState({
        name: '',
        status: false,
        urlLogo: ''
    })

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSuccess = (file: any) => {
        console.log('Uploaded:', file);
    };

    const handleError = (file: any) => {
        console.error('Failed to upload:', file);
    };

    const handleSubmit = async () => {
        let errors: any = {}
        if (!formData.name) {
            errors.name = 'Name is required'
        }
        setFormErrors(errors)
        const data = {
            name: formData.name
        }

    }
    return (
        <div className='flex flex-col gap-2'>
            <FormGroup
                title="General Information"
            >
                <Input
                    id='name'
                    label='Name'
                    type='text'
                    value={data ? data.text : formData.name}
                    onChange={handleChange}
                />
                <Input
                    id='discount'
                    label='Discount Percent'
                    type='number'
                    value={data ? data.text : formData.discountPercent}
                    onChange={handleChange}
                />
                <Checkbox
                    label='Status'
                    text='Enable the brand'
                    onChange={(val) => setFormData({ ...formData, status: val })}
                    checked={formData.status}
                />
            </FormGroup>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />
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
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />
            <FormGroup
                title="Images"
                description="Add images here"
            >
                <div className='flex col-span-full gap-4'>
                    <FileUploader
                        label='Url Logo'
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                    <FileUploader
                        label='Url Banner'
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                </div>
            </FormGroup>

        </div>
    )
}

export default GeneralForm
