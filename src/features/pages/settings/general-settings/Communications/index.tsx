'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form';
import Input from "@/components/input"
import TextArea from "@/components/textarea"
import SelectInput from '@/components/select';
import SwitchInput from '@/components/switch';
import { uploadImages } from '@/services/upload-images';
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [twillio, setTwillio] = useState(true)
    const [facebook, setFacebook] = useState(true)
    const [tawkTo, setTawkTo] = useState(true)
    const [tidio, setTidio] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        host: initialValues ? initialValues.host : '',
        email: initialValues ? initialValues.email : '',
        email_port: initialValues ? initialValues.email_port : '',
        username: initialValues ? initialValues.username : '',
        password: initialValues ? initialValues.password : '',
        mail: initialValues ? initialValues.mail : '',
        security_type: initialValues ? initialValues.security_type : '',
        phone_number: initialValues ? initialValues.phone_number : '',
        twillio_id_key: initialValues ? initialValues.twillio_id_key : '',
        auth_token: initialValues ? initialValues.auth_token : '',
        twillio_phone_number: initialValues ? initialValues.twillio_phone_number : '',
        header_tawk_to: initialValues ? initialValues.header_tawk_to : '',
        body_tawk_to: initialValues ? initialValues.body_tawk_to : '',
        header_tidio: initialValues ? initialValues.header_tidio : '',
        body_tidio: initialValues ? initialValues.body_tidio : '',
    });

    const optionsSecurityType = [
        { label: "SSL", value: 'ssl' },
        { label: "TLS", value: 'tls' },
        { label: "STARTTLS", value: 'starttls' },
        { label: "No Security", value: 'nosecurity' }
    ]
    const [dynamicFields, setDynamicFields] = useState<Record<string, any[]>>({
        business_number: [],
        phone_number: [],
        address: [],
    });


    const addDynamicItem = (field: string) => {
        setDynamicFields(prev => ({
            ...prev,
            [field]: [{ value: '' }, ...prev[field]],
        }));
    };

    const removeDynamicItem = (field: string, index: number) => {
        setDynamicFields(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const updateDynamicItem = (field: string, index: any, value: string) => {
        setDynamicFields(prev => {
            const updated = [...prev[field]];
            (updated[index] as any) = { value };
            return {
                ...prev,
                [field]: updated,
            };
        });
    };


    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            // const submitData = {
            //     logo: formData.logo,
            //     logo_favicon: formData.logo_favicon,
            //     company_name: formData.company_name,
            //     address: formData.address,
            //     city: formData.city,
            //     country: formData.country,
            //     postcode: formData.postcode,
            //     phone_number: formData.phone_number,
            //     email: formData.email,

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

    console.log(formData)

    return (
        <>
            {contextHolder}
            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    <div>
                        <FormGroup
                            title="Email SMTP"
                            description="Email SMTP is used to send email notifications"
                        >
                            <Input
                                id='host'
                                label='Host/Email Server'
                                type='text'
                                placeholder='Host/Email Server'
                                onChange={handleChange}
                                value={formData.host}
                            />
                            <Input
                                id='email'
                                label='Email Address'
                                type='email'
                                placeholder='Email Address'
                                onChange={handleChange}
                                value={formData.email}
                            />
                            <Input
                                id='email_port'
                                label='Email Port'
                                type='text'
                                placeholder='Email Port'
                                onChange={handleChange}
                                value={formData.email_port}
                            />
                            <SelectInput
                                id='security_type'
                                label='Security Type'
                                value={formData.security_type}
                                onChange={(selected) => setFormData({
                                    ...formData,
                                    security_type: selected
                                })}
                                options={optionsSecurityType}
                            />
                            <Input
                                id='username'
                                label='Username'
                                type='text'
                                placeholder='Username'
                                onChange={handleChange}
                                value={formData.username}
                            />
                            <Input
                                id='password'
                                label='Password'
                                type='password'
                                placeholder='Password'
                                onChange={handleChange}
                                value={formData.password}
                            />
                            <Input
                                id='mail'
                                label='Mail Encryption'
                                type='text'
                                placeholder='Mail Encryption'
                                onChange={handleChange}
                                value={formData.mail}
                            />
                        </FormGroup>
                        <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', margin: '1rem 0' }} />
                        <FormGroup title="SMS" description='SMS is used to send SMS notifications'>
                            <div className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >

                                <div className='col-span-full flex gap-3 justify-between mb-4'>
                                    <h4 className='text-base font-medium'>Twillio</h4>
                                    <SwitchInput
                                        label='Enable Twilio'
                                        checked={twillio}
                                        onChange={(value) =>
                                            setTwillio(value)
                                        }
                                    />
                                </div>

                                {
                                    twillio == true && (
                                        <div className='grid md:grid-cols-3 gap-2'>
                                            <Input
                                                id='twillio_id_key'
                                                label='Twillio ID KEY'
                                                type='text'
                                                placeholder='Twillio ID KEY'
                                                onChange={handleChange}
                                                value={formData.twillio_id_key}
                                            />
                                            <Input
                                                id='auth_token'
                                                label='Auth Token'
                                                type='text'
                                                placeholder='Facebook Link'
                                                onChange={handleChange}
                                                value={formData.auth_token}
                                            />
                                            <Input
                                                id='twillio_phone_number'
                                                label='Twillio Phone Number'
                                                type='text'
                                                placeholder='Twillio Phone Number'
                                                onChange={handleChange}
                                                value={formData.twillio_phone_number}
                                            />
                                        </div>
                                    )
                                }


                            </div>

                        </FormGroup>

                        <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', margin: '1rem 0' }} />

                        <FormGroup title="Chat Features" description='Chat feature'>

                            <>
                                <div className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                    <div className='col-span-full flex gap-3 justify-between mb-4'>
                                        <h4 className='text-base font-medium'>Tawk To</h4>
                                        <SwitchInput
                                            label='Enable Tawk To'
                                            checked={tawkTo}
                                            onChange={(value) =>
                                                setTawkTo(value)
                                            }
                                        />
                                    </div>
                                    {
                                        tawkTo == true && (
                                            <div className='grid gap-2'>
                                                <Input
                                                    id='header_tawk_to'
                                                    label='Header'
                                                    type='text'
                                                    placeholder='Header'
                                                    onChange={handleChange}
                                                    value={formData.header_tawk_to}
                                                />
                                                <div className='col-span-full w-full'>
                                                    <TextArea
                                                        id='body_tawk_to'
                                                        label='Body'
                                                        placeholder='Body'
                                                        onChange={handleChange}
                                                        value={formData.body_tawk_to}
                                                    />
                                                </div>

                                            </div>
                                        )
                                    }

                                </div>

                                <div className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                    <div className='col-span-full flex gap-3 justify-between mb-4'>
                                        <h4 className='text-base font-medium'>Tidio</h4>
                                        <SwitchInput
                                            label='Enable Tidio'
                                            checked={tidio}
                                            onChange={(value) =>
                                                setTidio(value)
                                            }
                                        />
                                    </div>
                                    {
                                        tidio == true && (
                                            <div className='grid gap-2'>
                                                <Input
                                                    id='header_tidio'
                                                    label='Header'
                                                    type='text'
                                                    placeholder='Header'
                                                    onChange={handleChange}
                                                    value={formData.header_tidio}
                                                />
                                                <div className='col-span-full w-full'>
                                                    <TextArea
                                                        id='body_tidio'
                                                        label='Body'
                                                        placeholder='Body'
                                                        onChange={handleChange}
                                                        value={formData.body_tidio}
                                                    />
                                                </div>

                                            </div>
                                        )
                                    }
                                </div>

                                <div className=' col-span-full flex justify-between items-center border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                    <h4 className='text-base font-medium'>Facebook</h4>
                                    <SwitchInput
                                        label='Enable Facebook'
                                        checked={facebook}
                                        onChange={(value) =>
                                            setFacebook(value)
                                        }
                                    />
                                </div>
                            </>


                        </FormGroup>

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                            label='Create Communications'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default index;
