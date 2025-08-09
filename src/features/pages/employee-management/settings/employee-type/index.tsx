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
import { uploadImages } from '@/services/upload-images';
import Image from 'next/image';
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file';
import { PlusOutlined, MinusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { PencilIcon, BodyIconSwitch, HeaderIconSwitch } from '@public/icon';
import ModalLeaveType from './ModalLeaveType';

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
    const [leaveType, setLeaveType] = useState<string>('full_time');
    const [editorContent, setEditorContent] = useState('');
    const [formData, setFormData] = useState({
        annual_leave_time: initialValues ? initialValues.annual_leave_time : '',
        sick_permit_time: initialValues ? initialValues.sick_permit_time : '',
        personal_permit_time: initialValues ? initialValues.personal_permit_time : '',
        sick_leave_time: initialValues ? initialValues.sick_leave_time : '',
        holiday_leave_time: initialValues ? initialValues.holiday_leave_time : '',
        early_leave_time: initialValues ? initialValues.early_leave_time : '',

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

    const handleOpenModal = (type: string, method?: string,) => {
        console.log(type)
        setCurrentMethod(method)
        setLeaveType(type)
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

    console.log(formData, leaveType)

    return (
        <>
            {contextHolder}
            <ModalLeaveType
                isModalOpen={isModalOpen}
                handleCancel={() => {
                    setIsModalOpen(false)
                    setLeaveType('')
                }}
                handleChange={handleChange}
                formData={formData}
                leaveType={leaveType}
            />

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    <div className='flex flex-col gap-8'>
                        <FormGroup
                            title="Full Time"
                            description="Full Time Information"
                            childClassName='grid md:grid-cols-2 gap-3'
                        >
                            <div className='col-span-full border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex gap-3 justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Capacity</h4>
                                    <div className='flex gap-3'>
                                        <Button
                                            label='Setup'
                                            onClick={() => handleOpenModal('full_time')}
                                            icon={<Image
                                                src={PencilIcon}
                                                alt='edit-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            shape='round'
                                            hasHeight={false}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='col-span-full border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex gap-3 justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Leave Type</h4>
                                    <div className='flex gap-3'>
                                        <Button
                                            label='Setup'
                                            onClick={() => handleOpenModal('full_time')}
                                            icon={<Image
                                                src={PencilIcon}
                                                alt='edit-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            shape='round'
                                            hasHeight={false}

                                        />
                                    </div>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup title="Part Time" description='Part Time Information' className='mt-4' childClassName='grid md:grid-cols-2 gap-3'>
                            <div className='col-span-full border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex gap-3 justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Capacity</h4>
                                    <div className='flex gap-3'>
                                        <Button
                                            label='Setup'
                                            onClick={() => handleOpenModal('part_time')}
                                            icon={<Image
                                                src={PencilIcon}
                                                alt='edit-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            shape='round'
                                            hasHeight={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-full border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex gap-3 justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Leave Type</h4>
                                    <div className='flex gap-3'>
                                        <Button
                                            label='Setup'
                                            onClick={() => handleOpenModal('part_time')}
                                            icon={<Image
                                                src={PencilIcon}
                                                alt='edit-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            shape='round'
                                            hasHeight={false}

                                        />
                                    </div>
                                </div>
                            </div>

                        </FormGroup>


                        <FormGroup title="Hourly" description='Hourly Information' className='mt-4' childClassName='flex flex-col gap-3'>
                            <div className='col-span-full  border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Capacity</h4>
                                    <div className='flex gap-3'>
                                        <Button
                                            label='Setup'
                                            onClick={() => handleOpenModal('hourly')}
                                            icon={<Image
                                                src={PencilIcon}
                                                alt='edit-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            shape='round'
                                            hasHeight={false}

                                        />
                                    </div>
                                </div>
                            </div>
                        </FormGroup>

                        <FormGroup title="Freelance" description='Freelance Information' className='mt-4' childClassName='flex flex-col gap-3'>
                            <div className='col-span-full  border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Capacity</h4>
                                    <div className='flex gap-3'>
                                        <Button
                                            label='Setup'
                                            onClick={() => handleOpenModal('freelance')}
                                            icon={<Image
                                                src={PencilIcon}
                                                alt='edit-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            shape='round'
                                            hasHeight={false}

                                        />
                                    </div>
                                </div>
                            </div>
                        </FormGroup>

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
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
