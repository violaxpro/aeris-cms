'use client'
import React, { useState, useEffect } from 'react';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form';
import Input from "@/components/input"
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import { useParams } from 'next/navigation'
import { getTags } from '@/services/tags-service';

const FormTags: React.FC<FormProps> = ({ mode, initialValues }) => {
    const { slug }: any = useParams()
    const [formData, setFormData] = useState({
        name: '',
    });

    // useEffect(() => {
    //     if (slug) {
    //         getTags(slug).then((res) =>{
    //             setFormData(res.data)
    //         }).catch((error) => console.log(error))
    //     }
    // }, [slug])

    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Tags', url: routes.eCommerce.tags },
        { title: mode === 'create' ? 'Create Tags' : 'Edit Tags' },
    ];

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    return (
        <>
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Tags' : 'Edit Tags'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div>
                        <FormGroup
                            title="General"
                            description="General information"
                        >
                            <Input
                                id='tags'
                                label='Tags Name'
                                type='text'
                                placeholder='Input Tags Name'
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </FormGroup>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                            label={mode === 'create' ? 'Create Tags' : 'Edit Tags'}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormTags;
