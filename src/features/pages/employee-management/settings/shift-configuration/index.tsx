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
// import ModalTolerance from './ModalTolerance';

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
            {/* <ModalTolerance
                isModalOpen={isModalOpen}
                handleCancel={() => {
                    setIsModalOpen(false)
                    setLeaveType('')
                }}
                handleChange={handleChange}
                formData={formData}
            /> */}
            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    <div className='flex flex-col gap-8'>
                        <FormGroup
                            title="Shift Configuration"
                            description="Shift Configuration Information"
                            childClassName='grid md:grid-cols-2 gap-3'
                        >


                        </FormGroup>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label='Save Shift Configuration'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default index;
