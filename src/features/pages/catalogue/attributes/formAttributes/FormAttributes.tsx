'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import Tabs, { Tab } from '@/components/tab'
import GeneralForm from './GeneralForm';
import ValuesForm from './ValuesForm';
import { routes } from '@/config/routes';
import { useNotificationAntd } from '@/components/toast';
import { useCreateAttribute, useUpdateAttribute } from '@/core/hooks/use-attributes';
import { useSetAtom } from 'jotai';
import { notificationAtom } from '@/store/NotificationAtom';

const FormAttributes: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    console.log(initialValues)
    const [activeTab, setActiveTab] = useState<string>('general');
    const { contextHolder, notifyError } = useNotificationAntd()
    const [formData, setFormData] = useState({
        general: {
            name: initialValues ? initialValues.name : '',
            attributeSet: initialValues ? initialValues.attribute_set_id : '',
            categories: initialValues ? initialValues?.categories?.map((cat: any) => cat.id) : [],
            filterable: initialValues ? initialValues.filterable : false
        },
        values: initialValues ? initialValues?.values?.map((val: any) => {
            return { value: val }
        }) : [{ value: '' }]
    })
    const { mutate: createAttributeMutate } = useCreateAttribute()
    const { mutate: updateAttributeMutate } = useUpdateAttribute(slug ?? '')
    const [formErrors, setFormErrors] = useState({
        name: '',
    })

    const tabs: Tab[] = [
        { key: 'general', label: 'General Information' },
        { key: 'values', label: 'Values' },
    ];

    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Attributes', url: routes.eCommerce.attributes },
        { title: mode === 'create' ? 'Create' : 'Edit' },
    ];

    const handleChange = (section: string, updatedData: any) => {
        setFormData((prev: any) => {
            // kalau values (array) simpan langsung
            if (section === 'values') {
                return {
                    ...prev,
                    values: updatedData
                };
            }

            // kalau general (object) merge
            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    ...updatedData
                }
            };
        });
    };


    const handleSubmit = () => {
        let errors: any = {}
        if (!formData.general.name) {
            errors.name = 'Name is required'
        }
        setFormErrors(errors)

        if (Object.keys(errors).length > 0) {
            return;
        }
        if (Object.keys(formData.general).length == 0) {
            notifyError('General form is empty, please filled the form')
            return
        }
        if (formData.values.length == 0) {
            notifyError('Values form is empty, please filled the form')
            return
        }

        const data = {
            name: formData.general.name,
            attribute_set_id: formData.general.attributeSet,
            attribute_categories: formData.general.categories,
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


        if (mode == 'edit' && slug) {
            updateAttributeMutate(data)
        } else {
            createAttributeMutate(data)
        }
    }

    console.log(formData)
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Attribute' : 'Edit Attribute'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                borderClass='w-full'
            />

            <Content className="mb-0">
                <div className='bg-[#fff] min-h-[360px] p-6'>
                    <div>
                        {activeTab === 'general' && (
                            <div className="space-y-8">
                                <GeneralForm
                                    dataById={formData.general}
                                    onChange={(data) => handleChange('general', data)}
                                    formDataCreate={formData}
                                    errors={formErrors}
                                />
                            </div>
                        )}


                        {activeTab === 'values' && (
                            <div>
                                <ValuesForm
                                    dataById={formData.values}
                                    onChange={(data) => handleChange('values', data)}
                                    formDataCreate={formData}
                                />
                            </div>
                        )}


                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode === 'create' ? 'Create Attribute' : 'Edit Attribute'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormAttributes;
