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
import { PencilIcon, BodyIconSwitch, HeaderIconSwitch } from '@public/icon';
import ModalTolerance from './ModalTolerance';

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentMethod, setCurrentMethod] = useState<string | null>()
    const [leaveType, setLeaveType] = useState<string>('full_time');
    const [modalType, setModalType] = useState<string>('leave-type');
    const [formData, setFormData] = useState({
        tolerance_type: initialValues ? initialValues.tolerance_type : '',
        number: initialValues ? initialValues.number : '',
        minutes: initialValues ? initialValues.minutes : '',
        fine_if_employee_late: initialValues ? initialValues.fine_if_employee_late : '',

    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleChange = (field: string) => (
        e: any | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const value = typeof e === 'string' || Array.isArray(e)
            ? e
            : e.target.value;

        setFormData((prev) => ({
            ...prev,
            [field]: value,
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
            <ModalTolerance
                isModalOpen={isModalOpen}
                handleCancel={() => {
                    setIsModalOpen(false)
                    setLeaveType('')
                }}
                handleChange={handleChange}
                formData={formData}
            />
            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    <div className='flex flex-col gap-8'>
                        <FormGroup
                            title="Tolerance Company"
                            description="Tolerance Company Information"
                            childClassName='grid md:grid-cols-2 gap-3'
                        >
                            <div className='col-span-full border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex gap-3 justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Tolerance</h4>
                                    <div className='flex gap-3'>
                                        <Button
                                            label='Setup'
                                            onClick={() => {
                                                handleOpenModal()
                                            }}
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
                            <div className='col-span-full'>
                                <Input
                                    id="minutes"
                                    label="Tolerance for Employee"
                                    placeholder="Minutes"
                                    value={formData.minutes}
                                    onChange={handleChange("minutes")}
                                    type='text'
                                    suffix='minutes'
                                />
                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Rules"
                            description="Rules Information"
                            childClassName='grid md:grid-cols-2 gap-3'
                        >
                            <div className='col-span-full'>
                                <Input
                                    id="fine_if_employee_late"
                                    label="Fine if employees late"
                                    placeholder="Currency"
                                    value={formData.fine_if_employee_late}
                                    onChange={handleChange("fine_if_employee_late")}
                                    type='text'
                                />
                            </div>
                        </FormGroup>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label='Save Company Policy'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default index;
