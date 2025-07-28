'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form-group';
import Input from "@/components/input"
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import { useParams } from 'next/navigation'
import { getPriceLevel, addPriceLevel, updatePriceLevel } from '@/services/price-level-service';
import { useAtom } from 'jotai';
import { brandsAtom, categoriesAtom } from '@/store/DropdownItemStore';
import { useNotificationAntd } from '@/components/toast';

const FormPriceLevel: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const [optionBrands] = useAtom(brandsAtom)
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [optionsCategories] = useAtom(categoriesAtom)
    const [formData, setFormData] = useState({
        name: initialValues ? initialValues.name : '',
        brands: initialValues ? initialValues.brandId : '',
        categories: initialValues ? initialValues.categoryId : '',
        subcategories: initialValues ? initialValues.subCategoryId : '',
        buyingPrice: '',
        rrp: initialValues ? initialValues.rrp_price : '',
        trade: initialValues ? initialValues.trade_price : '',
        silver: initialValues ? initialValues.silver_price : '',
        gold: initialValues ? initialValues.gold_price : '',
        platinum: initialValues ? initialValues.platinum_price : '',
        diamond: initialValues ? initialValues.diamond_price : '',
        kitPrice: '',
        priceNotes: ''
    });

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

    const handleSubmit = async () => {
        try {
            const submitData = {
                name: formData.name,
                brandId: formData.brands,
                categoryId: formData.categories,
                rrp_price: Number(formData.rrp),
                trade_price: Number(formData.trade),
                silver_price: Number(formData.silver),
                gold_price: Number(formData.gold),
                platinum_price: Number(formData.platinum),
                diamond_price: Number(formData.diamond)
            }

            let response;
            if (mode == 'edit' && slug) {
                response = await updatePriceLevel(slug, submitData)
            } else {
                response = await addPriceLevel(submitData)
            }

            if (response.success == true) {
                notifySuccess(response.message)
                setTimeout(() => {
                    router.push(routes.eCommerce.priceLevel)
                }, 2000);
            }
        } catch (error) {
            console.error(error)
        }

    }

    console.log(formData)

    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Price Level' : 'Edit Price Level'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    {/* Tab Content */}
                    <div>
                        <FormGroup
                            title="Price"
                            description="Price information"
                            childClassName='grid md:grid-cols-4 gap-4'
                        >
                            <Input
                                id='name'
                                label='Name'
                                type='text'
                                placeholder='Input Name'
                                onChange={handleChange}
                                value={formData.name}
                            />
                            <SelectInput
                                id='brands'
                                label="Brands"
                                placeholder="Select Brands"
                                value={formData.brands}
                                onChange={(e) => handleChangeSelect('brands', e)}
                                options={optionBrands}
                            />
                            <SelectInput
                                id="categories"
                                label="Categories"
                                placeholder="Select Categories"
                                value={formData.categories}
                                onChange={(val) => handleChangeSelect("categories", val)}
                                options={optionsCategories}
                            />
                            <SelectInput
                                id="subcategories"
                                label="Sub Categories"
                                placeholder="Select Sub Categories"
                                value={formData.subcategories}
                                onChange={(val) => handleChangeSelect("subcategories", val)}
                                options={optionsCategories}
                            />

                            <div className='col-span-full grid grid-cols-2 gap-4'>
                                <Input
                                    id='rrp'
                                    label='RRP(%)'
                                    type='text'
                                    placeholder='Input RRP'
                                    onChange={handleChange}
                                    value={formData.rrp}
                                />
                                <Input
                                    id='trade'
                                    label='Trade(%)'
                                    type='text'
                                    placeholder='Input Trade'
                                    onChange={handleChange}
                                    value={formData.trade}
                                />
                            </div>

                            <Input
                                id='silver'
                                label='Silver(%)'
                                type='text'
                                placeholder='Input Silver'
                                onChange={handleChange}
                                value={formData.silver}
                            />
                            <Input
                                id='gold'
                                label='Gold(%)'
                                type='text'
                                placeholder='Input Gold'
                                onChange={handleChange}
                                value={formData.gold}
                            />
                            <Input
                                id='platinum'
                                label='Platinum(%)'
                                type='text'
                                placeholder='Input Platinum'
                                onChange={handleChange}
                                value={formData.platinum}
                            />
                            <Input
                                id='diamond'
                                label='Diamond(%)'
                                type='text'
                                placeholder='Input Diamond'
                                onChange={handleChange}
                                value={formData.diamond}
                            />
                            {/* <Input
                                id='kitPrice'
                                label='Kit Price'
                                type='text'
                                placeholder='Input Kit Price'
                                onChange={handleChange}
                                value={formData.kitPrice}
                            />
                            <Input
                                id='priceNotes'
                                label='Price Notes'
                                type='text'
                                placeholder='Input Price Notes'
                                onChange={handleChange}
                                value={formData.priceNotes}
                            /> */}
                        </FormGroup>
                    </div>

                    {/* Submit */}
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
