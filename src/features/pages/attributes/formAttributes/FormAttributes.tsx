'use client'
import React, { useState } from 'react';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/interfaces/product-interface';
import GeneralForm from './GeneralForm';
import ValuesForm from './ValuesForm';
import { routes } from '@/config/routes';

const FormAttributes: React.FC<FormProps> = ({ mode, initialValues }) => {
    const [activeTab, setActiveTab] = useState<'general' | 'values'>('general');

    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Attributes', url: routes.eCommerce.attributes },
        { title: mode === 'create' ? 'Create Attributes' : 'Edit Attributes' },
    ];

    return (
        <>
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Attributes' : 'Edit Attributes'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            {/* Tabs di bawah breadcrumb */}
            <div className="mx-4 mt-4 mb-0 bg-white px-4 py-3 rounded shadow">
                <div className="flex border-b border-gray-200" style={{ borderColor: '#E5E7EB' }}>
                    {['general', 'values'].map((tab) => (
                        <button
                            key={tab}
                            className={`capitalize px-4 py-2 -mb-px border-b-2 transition-colors duration-300 ${activeTab === tab
                                ? 'border-blue-500 text-blue-500'
                                : 'border-transparent text-gray-500 hover:text-blue-500'
                                }`}
                            onClick={() => setActiveTab(tab as any)}
                        >
                            {tab === 'general'
                                ? 'General Information'
                                : 'Values'}
                        </button>
                    ))}
                </div>
            </div>

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    {/* Tab Content */}
                    <div>
                        {activeTab === 'general' && (
                            <div className="space-y-8">
                                <GeneralForm />
                            </div>
                        )}


                        {activeTab === 'values' && (
                            <div>
                                <ValuesForm />
                            </div>
                        )}


                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                            label={mode === 'create' ? 'Create Attributes' : 'Edit Attributes'}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormAttributes;
