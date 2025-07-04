'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/interfaces/form-interface';
import GeneralForm from './GeneralForm';
import ValuesForm from './ValuesForm';
import { routes } from '@/config/routes';
import { useNotificationAntd } from '@/components/toast';
import { addAttribute, updateAttribute } from '@/services/attributes-service';

const FormAttributes: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    console.log(initialValues)
    const [activeTab, setActiveTab] = useState<'general' | 'values'>('general');
    const router = useRouter()
    const { contextHolder, notifySuccess, notifyError } = useNotificationAntd()
    const [formData, setFormData] = useState({
        general: {
            name: initialValues ? initialValues.name : '',
            attributeSet: initialValues ? initialValues.attribute_set : '',
            categories: initialValues ? initialValues.categories : [],
            filterable: initialValues ? initialValues.filterable : false
        },
        values: initialValues ? initialValues.values : []
    })

    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Attributes', url: routes.eCommerce.attributes },
        { title: mode === 'create' ? 'Create Attributes' : 'Edit Attributes' },
    ];

    const handleGeneralChange = (updatedGeneral: any) => {
        setFormData(prev => ({
            ...prev,
            general: updatedGeneral
        }))
    }

    const handleValuesChange = (valuesUpdated: any) => {
        setFormData(prev => ({
            ...prev,
            values: valuesUpdated
        }))
    }

    const handleSubmit = async () => {
        console.log('ini data form', formData.values)
        try {
            if (Object.keys(formData.general).length == 0) {
                notifyError('General form is empty, please filled the form')
                return
            }
            if (formData.values.length == 0) {
                notifyError('Values form is empty, please filled the form')
                return
            }
            console.log(formData.values)

            const data = {
                name: formData.general.name,
                // attribute_set : formData.general.attributeSet,
                categories: formData.general.categories,
                values: mode == 'edit' && typeof formData.values == 'string'
                    ? JSON.parse(formData.values).map((v: any) => v)
                    : formData.values.map((item: any) => {
                        if (typeof item === 'object') {
                            return item.value
                        }
                        if (typeof item === 'string') {
                            return item
                        }
                    }),
                filterable: formData.general.filterable
            }
            console.log(data.values)


            let response;
            if (mode == 'edit' && slug) {
                response = await updateAttribute(slug, data)
            } else {
                response = await addAttribute(data)
            }

            console.log(response)
            if (response.success == true) {
                notifySuccess(response.message)
                setTimeout(() => {
                    router.push(routes.eCommerce.attributes)
                }, 2000);
            }

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            {contextHolder}
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
                                <GeneralForm
                                    dataChild={formData.general}
                                    onChange={handleGeneralChange}
                                />
                            </div>
                        )}


                        {activeTab === 'values' && (
                            <div>
                                <ValuesForm
                                    dataChild={formData.values}
                                    onChange={handleValuesChange}
                                />
                            </div>
                        )}


                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                            label={mode === 'create' ? 'Create Attributes' : 'Edit Attributes'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormAttributes;
