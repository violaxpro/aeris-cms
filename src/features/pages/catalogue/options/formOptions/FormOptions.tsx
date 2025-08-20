'use client'
import React, { useState } from 'react';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/interfaces/product-interface';
import GeneralForm from './GeneralForm';
import ValuesForm from './ValuesForm';
import { routes } from '@/config/routes';

const FormOptions: React.FC<FormProps> = ({ mode, initialValues }) => {

    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Options', url: routes.eCommerce.options },
        { title: mode === 'create' ? 'Create' : 'Edit' },
    ];

    return (
        <>
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Option' : 'Edit Option'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mb-0">
                <div className='bg-[#fff] min-h-[360px] p-6'>

                    {/* Tab Content */}
                    <div>
                        <div className="space-y-8">
                            <GeneralForm />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode === 'create' ? 'Create Option' : 'Edit Option'}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormOptions;
