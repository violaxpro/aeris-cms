'use client'
import React, { useState } from 'react';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import BasicInformationProduct from './basic-information';
import ProductPrice from './price';
import AdvancedInformation from './advanced-information';
import Button from '@/components/button'
import { ProductFormProps } from '@/plugins/interfaces/product-interface';

const ProductForm: React.FC<ProductFormProps> = ({ mode, initialValues }) => {
    const [activeTab, setActiveTab] = useState<'basic' | 'price' | 'advanced'>('basic');

    const breadcrumb = [
        { label: 'Catalogue' },
        { label: 'Products', url: '/ecommerce/products' },
        { label: mode === 'create' ? 'Create Product' : 'Edit Product' },
    ];

    return (
        <>
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Product' : 'Edit Product'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            {/* Tabs di bawah breadcrumb */}
            <div className="mx-4 mt-4 mb-0 bg-white px-4 py-3 rounded shadow">
                <div className="flex border-b border-gray-200">
                    {['basic', 'price', 'advanced'].map((tab) => (
                        <button
                            key={tab}
                            className={`capitalize px-4 py-2 -mb-px border-b-2 transition-colors duration-300 ${activeTab === tab
                                ? 'border-blue-500 text-blue-500'
                                : 'border-transparent text-gray-500 hover:text-blue-500'
                                }`}
                            onClick={() => setActiveTab(tab as any)}
                        >
                            {tab === 'basic'
                                ? 'Basic Information'
                                : tab === 'price'
                                    ? 'Price'
                                    : 'Advanced Information'}
                        </button>
                    ))}
                </div>
            </div>

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    {/* Tab Content */}
                    <div>
                        {activeTab === 'basic' && (
                            <div className="space-y-8">
                                <BasicInformationProduct />
                            </div>
                        )}


                        {activeTab === 'price' && (
                            <div>
                                <ProductPrice />
                            </div>
                        )}

                        {activeTab === 'advanced' && (
                            <div>
                                <AdvancedInformation />
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                            label={mode === 'create' ? 'Create Product' : 'Edit Product'}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default ProductForm;
