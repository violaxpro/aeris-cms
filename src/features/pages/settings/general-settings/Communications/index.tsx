'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form-group';
import Input from "@/components/input"
import TextArea from "@/components/textarea"
import SelectInput from '@/components/select';
import SwitchInput from '@/components/switch';
import CustomSwitch from '@/components/switch/CustomSwitch';
import ModalEmailSmtp from './ModalEmailSmtp';
import ModalAmazonSmtp from './ModalAmazonSmtp';
import ModalTwillio from './ModalTwillio';
import ModalTidio from './ModalTidio';
import ModalTawkTo from './ModalTawkTo';
import ModalFacebook from './ModalFacebook';
import { uploadImages } from '@/services/upload-images';
import Image from 'next/image';
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file';
import { PlusOutlined, MinusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { PencilIcon, BodyIconSwitch, HeaderIconSwitch } from '@public/icon';

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [emailSmtp, setEmailSmtp] = useState(false)
    const [awsSmtp, setAwsSmtp] = useState(false)
    const [twillio, setTwillio] = useState(false)
    const [facebook, setFacebook] = useState(false)
    const [tawkTo, setTawkTo] = useState(false)
    const [tidio, setTidio] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentMethod, setCurrentMethod] = useState<string | null>()
    const [editorContent, setEditorContent] = useState('');
    const [formData, setFormData] = useState({
        host: initialValues ? initialValues.host : '',
        email: initialValues ? initialValues.email : '',
        email_port: initialValues ? initialValues.email_port : '',
        username: initialValues ? initialValues.username : '',
        password: initialValues ? initialValues.password : '',
        mail: initialValues ? initialValues.mail : '',
        security_type: initialValues ? initialValues.security_type : '',
        phone_number: initialValues ? initialValues.phone_number : '',
        endpoint_ses: '',
        access_key_id: '',
        secret_key: '',
        email_from: '',
        smtp_port: '',
        security_type_amazon: '',
        twillio_id_key: initialValues ? initialValues.twillio_id_key : '',
        auth_token: initialValues ? initialValues.auth_token : '',
        twillio_phone_number: initialValues ? initialValues.twillio_phone_number : '',
        header_tawk_to: initialValues ? initialValues.header_tawk_to : '',
        body_tawk_to: initialValues ? initialValues.body_tawk_to : '',
        header_tidio: initialValues ? initialValues.header_tidio : '',
        body_tidio: initialValues ? initialValues.body_tidio : '',
        header_facebook: initialValues ? initialValues.header_facebook : '',
        body_facebook: initialValues ? initialValues.body_facebook : '',
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

    const handleOpenModal = (method: string) => {
        setCurrentMethod(method)
        setIsModalOpen(true);
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

    console.log(formData, twillio)

    return (
        <>
            {contextHolder}
            {
                currentMethod == 'email_smtp' && <ModalEmailSmtp
                    isModalOpen={isModalOpen}
                    handleCancel={() => setIsModalOpen(false)}
                    handleChange={handleChange}
                    formData={formData}
                />
            }
            {
                currentMethod == 'aws_smtp' && <ModalAmazonSmtp
                    isModalOpen={isModalOpen}
                    handleCancel={() => setIsModalOpen(false)}
                    handleChange={handleChange}
                    formData={formData}
                />
            }
            {
                currentMethod == 'twillio' && <ModalTwillio
                    isModalOpen={isModalOpen}
                    handleCancel={() => setIsModalOpen(false)}
                    handleChange={handleChange}
                    formData={formData}
                />
            }
            {
                currentMethod == 'tawkto' && <ModalTawkTo
                    isModalOpen={isModalOpen}
                    handleCancel={() => setIsModalOpen(false)}
                    handleChange={handleChange}
                    formData={formData}
                />
            }
            {
                currentMethod == 'tidio' && <ModalTidio
                    isModalOpen={isModalOpen}
                    handleCancel={() => setIsModalOpen(false)}
                    handleChange={handleChange}
                    formData={formData}
                />
            }
            {
                currentMethod == 'facebook' && <ModalFacebook
                    isModalOpen={isModalOpen}
                    handleCancel={() => setIsModalOpen(false)}
                    handleChange={handleChange}
                    formData={formData}
                />
            }
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    <div className='flex flex-col gap-8'>
                        <FormGroup
                            title="SMTP Settings"
                            description="SMTP Settings is used to send email notifications"
                            childClassName='grid md:grid-cols-2 gap-3'
                        >
                            <div className='col-span-full border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex gap-3 justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Manual Setup</h4>
                                    <div className='flex gap-3'>
                                        <Button
                                            label='Edit'
                                            onClick={() => handleOpenModal('email_smtp')}
                                            icon={<Image
                                                src={PencilIcon}
                                                alt='edit-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            shape='round'
                                            hasHeight={false}

                                        />
                                        <SwitchInput
                                            label='Enable'
                                            checked={emailSmtp}
                                            onChange={(value) =>
                                                setEmailSmtp(value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='col-span-full border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex gap-3 justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Amazon Email Service</h4>
                                    <div className='flex gap-3'>
                                        <Button
                                            label='Edit'
                                            onClick={() => handleOpenModal('aws_smtp')}
                                            icon={<Image
                                                src={PencilIcon}
                                                alt='edit-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            shape='round'
                                            hasHeight={false}

                                        />
                                        <SwitchInput
                                            label='Enable'
                                            checked={awsSmtp}
                                            onChange={(value) =>
                                                setAwsSmtp(value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup title="SMS" description='SMS is used to send SMS notifications' className='mt-4'>
                            <div className='col-span-full border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex gap-3 justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Twillio</h4>
                                    <div className='flex gap-3'>
                                        <Button
                                            label='Edit'
                                            onClick={() => handleOpenModal('twillio')}
                                            icon={<Image
                                                src={PencilIcon}
                                                alt='edit-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            shape='round'
                                            hasHeight={false}

                                        />

                                        <SwitchInput
                                            label='Enable'
                                            checked={twillio}
                                            onChange={(value) =>
                                                setTwillio(value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                        </FormGroup>


                        <FormGroup title="Chat Features" description='Chat feature' className='mt-4' childClassName='flex flex-col gap-3'>
                            <>
                                <div className='col-span-full  border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                    <div className='col-span-full flex justify-between items-center'>
                                        <h4 className='text-lg font-semibold'>Tawk To</h4>
                                        <div className='flex gap-3'>
                                            <Button
                                                label='Edit'
                                                onClick={() => handleOpenModal('tawkto')}
                                                icon={<Image
                                                    src={PencilIcon}
                                                    alt='edit-icon'
                                                    width={15}
                                                    height={15}
                                                />}
                                                shape='round'
                                                hasHeight={false}

                                            />

                                            <SwitchInput
                                                label='Enable'
                                                checked={tawkTo}
                                                onChange={(value) =>
                                                    setTawkTo(value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='col-span-full  border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                    <div className='col-span-full flex gap-3 justify-between items-center'>
                                        <h4 className='text-lg font-semibold'>Tidio</h4>
                                        <div className='flex gap-3'>
                                            <Button
                                                label='Edit'
                                                onClick={() => handleOpenModal('tidio')}
                                                icon={<Image
                                                    src={PencilIcon}
                                                    alt='edit-icon'
                                                    width={15}
                                                    height={15}
                                                />}
                                                shape='round'
                                                hasHeight={false}

                                            />

                                            <SwitchInput
                                                label='Enable'
                                                checked={tidio}
                                                onChange={(value) =>
                                                    setTidio(value)
                                                }
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div className=' col-span-full flex justify-between items-center border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}>
                                    <h4 className='text-lg font-semibold'>Facebook</h4>
                                    <div className='flex gap-3'>
                                        <Button
                                            label='Edit'
                                            onClick={() => handleOpenModal('facebook')}
                                            icon={<Image
                                                src={PencilIcon}
                                                alt='edit-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            shape='round'
                                            hasHeight={false}

                                        />

                                        <SwitchInput
                                            label='Enable'
                                            checked={facebook}
                                            onChange={(value) =>
                                                setFacebook(value)
                                            }
                                        />
                                    </div>

                                </div>
                            </>


                        </FormGroup>

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label='Save Communications'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default index;
