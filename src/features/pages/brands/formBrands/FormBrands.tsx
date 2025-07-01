'use client'
import React, { useState } from 'react'
import GeneralForm from "./GeneralForm";
import SEOForm from "./SEOForm";
import Breadcrumb from "@/components/breadcrumb";
import { FormProps } from '@/plugins/interfaces/product-interface';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { routes } from '@/config/routes';
const FormBrands: React.FC<FormProps> = ({ mode, initialValues }) => {

    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Brands', url: routes.eCommerce.brands },
        { title: mode === 'create' ? 'Create Brands' : 'Edit Brands' },
    ];

    return (
        <div>
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Brands' : 'Edit Brands'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    <div>
                        <GeneralForm />
                        <SEOForm />
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                            label={mode === 'create' ? 'Create Brands' : 'Edit Brands'}
                        />
                    </div>
                </div>
            </Content>

        </div>
    )
}

export default FormBrands
