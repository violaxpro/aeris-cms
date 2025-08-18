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
import DatePickerInput from '@/components/date-picker';
import dayjs from 'dayjs'
import { CancelGreyIcon, PlusOutlineIcon } from '@public/icon';
import ButtonIcon from '@/components/button/ButtonIcon';
import { productSetAtom } from '@/store/DropdownItemStore';
import Image from 'next/image';

const FormFlashSale: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const [optionBrands] = useAtom(brandsAtom)
    const [optionProducts] = useAtom(productSetAtom)
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [optionsCategories] = useAtom(categoriesAtom)
    const [formData, setFormData] = useState({
        campaign_name: initialValues ? initialValues.campaign_name : '',
        start_date: initialValues ? initialValues.start_date : '',
        end_date: initialValues ? initialValues.end_date : '',
        product: initialValues ? initialValues.product : [],
    });
    const [product, setProduct] = useState([{
        product_name: '',
        buy_price: '',
        rrp_price: '',
        trade_price: '',
        silver_price: '',
        gold_price: '',
        platinum_price: '',
        diamond_price: '',
        flash_sale_price: '',
        quantity: '',
    }])

    const breadcrumb = [
        { title: 'Marketing' },
        { title: 'Flash Sale', url: routes.eCommerce.flashSale },
        { title: mode === 'create' ? 'Create' : 'Edit' },
    ];

    const handleChange = (field: string) => (
        e: any
    ) => {
        const value = typeof e === 'string' || Array.isArray(e)
            ? e
            : e.target.value;

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleChangeProduct = (
        index: number,
        field: string,
        value: string | number
    ) => {
        setProduct((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value
            };
            return updated;
        });
    };

    const handleAddProduct = () => {
        setProduct((prev) => [
            ...prev,
            {
                product_name: '',
                buy_price: '',
                rrp_price: '',
                trade_price: '',
                silver_price: '',
                gold_price: '',
                platinum_price: '',
                diamond_price: '',
                flash_sale_price: '',
                quantity: '',
            }
        ]);
    };

    const handleRemoveProduct = (index: number) => {
        setProduct((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        try {
            // const submitData = {
            //     name: formData.name,
            // }

            // let response;
            // if (mode == 'edit' && slug) {
            //     response = await updatePriceLevel(slug, submitData)
            // } else {
            //     response = await addPriceLevel(submitData)
            // }

            // if (response.success == true) {
            //     notifySuccess(response.message)
            //     setTimeout(() => {
            //         router.push(routes.eCommerce.priceLevel)
            //     }, 2000);
            // }
        } catch (error) {
            console.error(error)
        }

    }

    console.log(product)

    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Flash Sale' : 'Edit Flash Sale'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }} className='flex flex-col gap-8'>
                    <div className='grid md:grid-cols-3 gap-3'>
                        <Input
                            id='campaign_name'
                            label='Campaign Name'
                            type='text'
                            placeholder='Input Campaign Name'
                            onChange={handleChange('campaign_name')}
                            value={formData.campaign_name}
                        />
                        <DatePickerInput
                            id='start_date'
                            label='Start Date'
                            value={formData.start_date ? dayjs(formData.start_date) : null}
                            onChange={handleChange('start_date')}
                            placeholder='Select Start Date'
                        // required
                        />
                        <DatePickerInput
                            id='end_date'
                            label='End Date'
                            value={formData.end_date ? dayjs(formData.end_date) : null}
                            onChange={handleChange('end_date')}
                            placeholder='Select End Date'
                        // required
                        />

                    </div>
                    <div>
                        <FormGroup
                            title="Flash Sale Product"
                            description="Flash Sale Product Settings"
                            childClassName='flex flex-col gap-3'
                        >
                            {
                                product.map((item: any, index: number) => {
                                    return (
                                        <div key={index} className='col-span-full border p-6 rounded-xl border-[#E5E7EB]'>
                                            <div className='col-span-full flex flex-col gap-6'>
                                                <div className='flex flex-col'>
                                                    <div className='w-full flex justify-between items-center'>
                                                        <h4 className='text-lg font-semibold'>Product Information</h4>
                                                        <ButtonIcon
                                                            icon={CancelGreyIcon}
                                                            shape='circle'
                                                            variant='filled'
                                                            color='default'
                                                            onClick={() => handleRemoveProduct(index)}
                                                        />
                                                    </div>
                                                    <div className='flex gap-3'>
                                                        <div className='w-full grid md:grid-cols-6 gap-3'>
                                                            <div className='col-span-full grid md:grid-cols-[3fr_1fr] gap-3'>
                                                                <SelectInput
                                                                    id='product_name'
                                                                    label='Product Name'
                                                                    value={item.product_name}
                                                                    onChange={(value: any) => handleChangeProduct(index, "product_name", value)}
                                                                    options={optionProducts}
                                                                />
                                                                <Input
                                                                    id='quantity'
                                                                    label='Quantity'
                                                                    type='text'
                                                                    value={item.quantity}
                                                                    onChange={(e) => handleChangeProduct(index, e.target.id, e.target.value)}
                                                                    placeholder='Input Quantity'
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='w-full flex flex-col'>
                                                    <h4 className='text-lg font-semibold'>Price Information</h4>
                                                    <div className='w-full grid md:grid-cols-4 gap-3'>
                                                        <Input
                                                            id='buy_price'
                                                            label='Buy Price'
                                                            type='text'
                                                            value={item.buy_price}
                                                            onChange={(e) => handleChangeProduct(index, e.target.id, e.target.value)}
                                                            placeholder='Input Buy Price'
                                                            prefix={<span className='text-gray-400'>$</span>}
                                                        />
                                                        <Input
                                                            id='rrp_price'
                                                            label='RRP Price'
                                                            type='text'
                                                            value={item.rrp_price}
                                                            onChange={(e) => handleChangeProduct(index, e.target.id, e.target.value)}
                                                            placeholder='Input RRP Price'
                                                            prefix={<span className='text-gray-400'>$</span>}

                                                        />
                                                        <Input
                                                            id='trade_price'
                                                            label='Trade Price'
                                                            type='text'
                                                            value={item.trade_price}
                                                            onChange={(e) => handleChangeProduct(index, e.target.id, e.target.value)}
                                                            placeholder='Input Trade Price'
                                                            prefix={<span className='text-gray-400'>$</span>}

                                                        />
                                                        <Input
                                                            id='silver_price'
                                                            label='Silver Price'
                                                            type='text'
                                                            value={item.silver_price}
                                                            onChange={(e) => handleChangeProduct(index, e.target.id, e.target.value)}
                                                            placeholder='Input Silver Price'
                                                            prefix={<span className='text-gray-400'>$</span>}

                                                        />
                                                        <Input
                                                            id='gold_price'
                                                            label='Gold Price'
                                                            type='text'
                                                            value={item.gold_price}
                                                            onChange={(e) => handleChangeProduct(index, e.target.id, e.target.value)}
                                                            placeholder='Input Gold Price'
                                                            prefix={<span className='text-gray-400'>$</span>}

                                                        />
                                                        <Input
                                                            id='platinum_price'
                                                            label='Platinum Price'
                                                            type='text'
                                                            value={item.platinum_price}
                                                            onChange={(e) => handleChangeProduct(index, e.target.id, e.target.value)}
                                                            placeholder='Input Platinum Price'
                                                            prefix={<span className='text-gray-400'>$</span>}

                                                        />
                                                        <Input
                                                            id='diamond_price'
                                                            label='Diamond Price'
                                                            type='text'
                                                            value={item.diamond_price}
                                                            onChange={(e) => handleChangeProduct(index, e.target.id, e.target.value)}
                                                            placeholder='Input Diamond Price'
                                                            prefix={<span className='text-gray-400'>$</span>}

                                                        />
                                                        <Input
                                                            id='flash_sale_price'
                                                            label='Flash Sale Price'
                                                            type='text'
                                                            value={item.flash_sale_price}
                                                            onChange={(e) => handleChangeProduct(index, e.target.id, e.target.value)}
                                                            placeholder='Input Flash Sale Price'
                                                            prefix={<span className='text-gray-400'>$</span>}

                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className='flex justify-end'>
                                <Button
                                    icon={<Image
                                        src={PlusOutlineIcon}
                                        alt='plus-icon'
                                    />}
                                    label='Add Product'
                                    onClick={handleAddProduct}
                                />
                            </div>

                        </FormGroup>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label={mode === 'create' ? 'Create Flash Sale' : 'Edit Flash Sale'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormFlashSale;
