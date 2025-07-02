import React, { useState } from 'react'
import FormGroup from '@/components/form'
import cn from '@/core/utils/class-names'
import Input from "@/components/input"
import Select from "@/components/select"
import TextArea from "@/components/textarea"
import CheckboxInput from '@/components/checkbox'
import Button from "@/components/button"
import dynamic from 'next/dynamic';
import { getBrands } from '@/services/brands-service'
import { getCategories } from '@/services/category-service'

const QuillInput = dynamic(() => import('@/components/quill-input'), { ssr: false, loading: () => <p>Loading editor...</p>, });

const ProductGeneral = ({ className }: { className?: string }) => {
    const [optionBrands, setOptionBrands] = useState([])
    const [optionCategories, setOptionCategories] = useState([])

    const [formData, setFormData] = useState({
        productName: '',
        brand: '',
        categories: [],
        description: '',
        metaTitle: '',
        metaDescription: '',
        taxClass: '',
        tags: [],
        manualUrl: '',
        warranty: '',
        status: false
    });

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };


    const handleChangeSelect = (id: string, value: string | string[]) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleQuillChange = (value: string) => {
        setFormData({ ...formData, description: value });
    };

    
    const optionsBrand = [
        { value: '1', label: 'Brand A' },
        { value: '2', label: 'Brand B' },
    ]
    const optionsCategories = [
        { value: '1', label: 'Category A' },
        { value: '2', label: 'Category B' },
    ]

    const optionsTaxClass = [
        { value: '1', label: 'GST' },
        { value: '2', label: 'GSB' },
    ]


    return (
        <div>
            <FormGroup
                title="General"
                description="General information about the product."
            >
                <Input
                    id='productName'
                    label='Name'
                    type='text'
                    placeholder='Product Name'
                    onChange={handleChange}
                    value={formData.productName}
                />
                <Select
                    id="brand"
                    label="Brand"
                    placeholder="Select Brand"
                    value={formData.brand}
                    onChange={(val) => handleChangeSelect("brand", val)}
                    options={optionsBrand}
                />
                <Select
                    id="categories"
                    modeType='multiple'
                    label="Categories"
                    placeholder="Select Categories"
                    value={formData.categories || undefined}
                    onChange={(val) => handleChangeSelect("categories", val)}
                    options={optionsCategories}
                />
                <div className='col-span-full w-full'>
                    <QuillInput
                        value={formData.description}
                        onChange={handleQuillChange}
                        label="Description"
                        className="col-span-full [&_.ql-editor]:min-h-[100px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                </div>
                <div className='col-span-full w-full'>
                    <Input
                        id='metaTitle'
                        label='Meta Title'
                        type='text'
                        placeholder='Input Meta Title'
                        onChange={handleChange}
                        value={formData.metaTitle}
                        notes='min.50 / max.65, Character 0'
                    />
                </div>
                <div className='col-span-full w-full'>
                    <TextArea
                        label='Meta Description'
                        placeholder='Input Meta Description'
                        onChange={handleChange}
                        value={formData.metaDescription}
                        notes='min.50 / max.65, Character 0'
                    />
                </div>
                <Select
                    id="taxClass"
                    label="Tax Class"
                    placeholder="Select Tax Class"
                    value={formData.taxClass}
                    onChange={(val) => handleChangeSelect("taxClass", val)}
                    options={optionsTaxClass}
                />
                <Select
                    id="tags"
                    modeType='tags'
                    label="Tags"
                    placeholder="Select Tags"
                    onChange={(val) => handleChangeSelect("tags", val)}
                    value={formData.tags}
                    options={optionsCategories}
                />
                <Input
                    id='manualUrl'
                    label='Manual URL'
                    type='text'
                    placeholder='Input Manual URL'
                    onChange={handleChange}
                    value={formData.manualUrl}
                />
                <Input
                    id='warranty'
                    label='Warranty (month)'
                    type='number'
                    placeholder='Warranty (month)'
                    onChange={handleChange}
                    value={formData.warranty}
                />
                <CheckboxInput
                    label='Status'
                    text="Check this to enable this product"
                    checked={formData.status}
                    onChange={(val) => setFormData({ ...formData, status: val })}
                />

            </FormGroup>
            <div className='flex justify-end'>
                <Button
                    label='Save'
                    btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                />
            </div>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />

        </div>
    )
}

export default ProductGeneral
