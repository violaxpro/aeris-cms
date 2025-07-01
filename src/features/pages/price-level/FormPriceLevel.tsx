'use client'
import React, { useState, useEffect } from 'react';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/interfaces/form-interface';
import FormGroup from '@/components/form';
import Input from "@/components/input"
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import { useParams } from 'next/navigation'
import { getPriceLevel } from '@/services/price-level-service';

const FormPriceLevel: React.FC<FormProps> = ({ mode, initialValues }) => {
    const { slug }: any = useParams()
    const [formData, setFormData] = useState({
        brands: '',
        categories: '',
        buying_price: '',
        rrp: '',
        trade: '',
        silver: '',
        gold: '',
        platinum: '',
        diamond: '',
        kit_price: '',
        price_notes: ''

    });

    useEffect(() => {
        if (slug) {
            getPriceLevel(slug).then((res) =>{
                setFormData(res.data)
            }).catch((error) => console.log(error))
        }
    }, [slug])

    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Price Level', url: routes.eCommerce.priceLevel },
        { title: mode === 'create' ? 'Create Price Level' : 'Edit Price Level' },
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

    const optionBrands = [
        { label: 'Brands A', value: 'Brands A' },
        { label: 'Brands B', value: 'Brands B' }

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
                            title="Price"
                            description="Price information"
                        >
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
                                modeType='multiple'
                                label="Categories"
                                placeholder="Select Categories"
                                value={formData.categories || undefined}
                                onChange={(val) => handleChangeSelect("categories", val)}
                                options={optionsCategories}
                            />
                            <Input
                                id='buyingPrice'
                                label='Buying Price'
                                type='text'
                                placeholder='Input Buying Price'
                                onChange={handleChange}
                                value={formData.buying_price}
                            />
                            <Input
                                id='rrp'
                                label='RRP'
                                type='text'
                                placeholder='Input RRP'
                                onChange={handleChange}
                                value={formData.rrp}
                            />
                            <Input
                                id='trade'
                                label='Trade'
                                type='text'
                                placeholder='Input Trade'
                                onChange={handleChange}
                                value={formData.trade}
                            />
                            <Input
                                id='silver'
                                label='Silver'
                                type='text'
                                placeholder='Input Silver'
                                onChange={handleChange}
                                value={formData.silver}
                            />
                            <Input
                                id='gold'
                                label='Gold'
                                type='text'
                                placeholder='Input Gold'
                                onChange={handleChange}
                                value={formData.gold}
                            />
                            <Input
                                id='platinum'
                                label='Platinum'
                                type='text'
                                placeholder='Input Platinum'
                                onChange={handleChange}
                                value={formData.platinum}
                            />
                            <Input
                                id='diamond'
                                label='Diamond'
                                type='text'
                                placeholder='Input Diamond'
                                onChange={handleChange}
                                value={formData.diamond}
                            />
                            <Input
                                id='kitPrice'
                                label='Kit Price'
                                type='text'
                                placeholder='Input Kit Price'
                                onChange={handleChange}
                                value={formData.kit_price}
                            />
                            <Input
                                id='notes'
                                label='Price Notes'
                                type='text'
                                placeholder='Input Price Notes'
                                onChange={handleChange}
                                value={formData.price_notes}
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

export default FormPriceLevel;
