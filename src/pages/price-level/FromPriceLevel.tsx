'use client'
import React, { useState } from 'react';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/interfaces/form-interface';
import FormGroup from '@/components/form';
import Input from "@/components/input"
import Select from "@/components/select"
import { categories } from '@/data/product-categories';

const PriceLevelForm: React.FC<FormProps> = ({ mode, initialValues }) => {
    const [formData, setFormData] = useState({
        brand: '',
        categories: '',
        sub_categories: '',
        warranty: ''
    })

    const breadcrumb = [
        { label: 'Catalogue' },
        { label: 'Price Level', url: '/ecommerce/price-level' },
        { label: mode === 'create' ? 'Create Price Level' : 'Edit Price Level' },
    ];

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleChangeSelect = (id: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const optionsBrand = [
        { value: '1', label: 'Brand A' },
        { value: '2', label: 'Brand B' },
    ]
    const optionsCategories = [
        { value: '1', label: 'Category A' },
        { value: '2', label: 'Category B' },
    ]

    return (
        <>
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Price Level' : 'Edit Price Level'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    {/* Tab Content */}
                    <div>
                        <FormGroup
                            title="General"
                            description="General information about the product."
                        >
                            <Select
                                id="brand"
                                label="Brand"
                                placeholder="Select Brand"
                                // value={formData.brand}
                                onChange={(val) => handleChangeSelect("brand", val)}
                                options={optionsBrand}
                            />
                            <Select
                                id="categories"
                                label="Categories"
                                placeholder="Select Categories"
                                // defaultValue={formData.categories}
                                onChange={(val) => handleChangeSelect("categories", val)}
                                options={optionsCategories}
                            />
                            <Select
                                id="sub_categories"
                                label="Sub Categories"
                                placeholder="Select Sub Categories"
                                // defaultValue={formData.categories}
                                onChange={(val) => handleChangeSelect("sub_categories", val)}
                                options={optionsCategories}
                            />
                            <Input
                                id='warranty'
                                label='Warranty'
                                type='text'
                                placeholder='Warranty'
                                onChange={handleChange}
                                value={formData.warranty}
                            />

                        </FormGroup>

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                            label={mode === 'create' ? 'Create Price Level' : 'Edit Price Level'}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default PriceLevelForm;
