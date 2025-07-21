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
        { title: mode === 'create' ? 'Create Options' : 'Edit Options' },
    ];

    return (
        <>
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Options' : 'Edit Options'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    {/* Tab Content */}
                    <div>
                        <div className="space-y-8">
                            <GeneralForm />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label={mode === 'create' ? 'Create Options' : 'Edit Options'}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormOptions;
