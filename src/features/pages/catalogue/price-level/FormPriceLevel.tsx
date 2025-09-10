'use client'
import React, { useState } from 'react';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form-group';
import Input from "@/components/input"
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import { useCreatePriceLevel, useUpdatePriceLevel } from '@/core/hooks/use-price-levels';
import { useAtom } from 'jotai';
import { brandsAtom, categoriesAtom } from '@/store/DropdownItemStore';
import SelectTreeInput from '@/components/select/TreeSelect'
import { useNotificationAntd } from '@/components/toast';

const FormPriceLevel: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder } = useNotificationAntd()
    const [optionsCategories] = useAtom(categoriesAtom)
    const [optionBrands] = useAtom(brandsAtom)
    const [formData, setFormData] = useState({
        name: initialValues ? initialValues.name : '',
        brand_id: initialValues ? initialValues.brand_id : '',
        category_id: initialValues ? initialValues.category_id : '',
        sub_category_id: initialValues ? initialValues.sub_category_id : '',
        rrp: initialValues ? initialValues.recommended_retail_price_percentage : '',
        trade: initialValues ? initialValues.trade_percentage : '',
        silver: initialValues ? initialValues.silver_percentage : '',
        gold: initialValues ? initialValues.gold_percentage : '',
        platinum: initialValues ? initialValues.platinum_percentage : '',
        diamond: initialValues ? initialValues.diamond_percentage : '',
    });
    const { mutate: createPriceLevelMutate } = useCreatePriceLevel()
    const { mutate: updatePriceLevelMutate } = useUpdatePriceLevel(slug ?? '')
    const [formErrors, setFormErrors] = useState({
        name: '',
        brand_id: '',
        category_id: '',
    })


    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Price Level', url: routes.eCommerce.priceLevel },
        { title: mode === 'create' ? 'Create' : 'Edit' },
    ];

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

    const handleSubmit = () => {
        let errors: any = {}
        if (!formData.name) {
            errors.name = 'Name is required'
        }
        if (!formData.brand_id) {
            errors.brand_id = 'Brand is required'
        }
        if (!formData.category_id) {
            errors.category_id = 'Category is required'
        }
        setFormErrors(errors)

        if (Object.keys(errors).length > 0) {
            return;
        }
        const submitData = {
            name: formData.name,
            brand_id: formData.brand_id,
            category_id: formData.category_id,
            sub_category_id: formData.category_id,
            recommended_retail_price_percentage: Number(formData.rrp),
            trade_percentage: Number(formData.trade),
            silver_percentage: Number(formData.silver),
            gold_percentage: Number(formData.gold),
            platinum_percentage: Number(formData.platinum),
            diamond_percentage: Number(formData.diamond)
        }

        if (mode == 'edit' && slug) {
            updatePriceLevelMutate(submitData)
        } else {
            createPriceLevelMutate(submitData)
        }
    }

    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Price Level' : 'Edit Price Level'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mb-0">
                <div className='bg-[#fff] min-h-[360px] p-6'>
                    <div>
                        <FormGroup
                            title="Price"
                            description="Price information"
                            childClassName='grid md:grid-cols-3 gap-4'
                        >
                            <Input
                                id='name'
                                label='Name'
                                type='text'
                                placeholder='Distributor Price'
                                onChange={handleChange}
                                value={formData.name}
                                errorMessage={formErrors.name}
                            />
                            <SelectInput
                                id='brand_id'
                                label="Brands"
                                placeholder="DIGIFORT"
                                value={formData.brand_id || undefined}
                                onChange={(e) => handleChangeSelect('brand_id', e)}
                                options={optionBrands}
                                error={formErrors.brand_id}
                            />
                            <SelectTreeInput
                                id="category_id"
                                label="Categories"
                                placeholder="CCTV"
                                value={formData.category_id || undefined}
                                onChange={(val) => {
                                    handleChangeSelect("category_id", val);
                                }}
                                treeData={optionsCategories}
                                error={formErrors.category_id}
                            />
                            <div className='col-span-full grid md:grid-cols-6 gap-4'>
                                <Input
                                    id='rrp'
                                    label='RRP(%)'
                                    type='text'
                                    placeholder='Enter Percentage Number'
                                    onChange={handleChange}
                                    value={formData.rrp}
                                />
                                <Input
                                    id='trade'
                                    label='Trade(%)'
                                    type='text'
                                    placeholder='Enter Percentage Number'
                                    onChange={handleChange}
                                    value={formData.trade}
                                />
                                <Input
                                    id='silver'
                                    label='Silver(%)'
                                    type='text'
                                    placeholder='Enter Percentage Number'
                                    onChange={handleChange}
                                    value={formData.silver}
                                />
                                <Input
                                    id='gold'
                                    label='Gold(%)'
                                    type='text'
                                    placeholder='Enter Percentage Number'
                                    onChange={handleChange}
                                    value={formData.gold}
                                />
                                <Input
                                    id='platinum'
                                    label='Platinum(%)'
                                    type='text'
                                    placeholder='Enter Percentage Number'
                                    onChange={handleChange}
                                    value={formData.platinum}
                                />
                                <Input
                                    id='diamond'
                                    label='Diamond(%)'
                                    type='text'
                                    placeholder='Enter Percentage Number'
                                    onChange={handleChange}
                                    value={formData.diamond}
                                />
                            </div>
                        </FormGroup>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode === 'create' ? 'Create Price Level' : 'Edit Price Level'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormPriceLevel;
