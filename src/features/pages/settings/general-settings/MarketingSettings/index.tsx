'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form-group';
import Input from "@/components/input"
import CheckboxInput from '@/components/checkbox';
import SwitchInput from '@/components/switch';
import { uploadImages } from '@/services/upload-images';
import Modal from '@/components/modal'
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file';
import DatePickerInput from '@/components/date-picker';
import CustomSwitch from '@/components/switch/CustomSwitch';
import { BodyIconSwitch, HeaderIconSwitch } from '@public/icon';
import dayjs from 'dayjs'
import Image from 'next/image';
import { PencilIcon } from '@public/icon';

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [marketing, setMarketing] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [formData, setFormData] = useState({
        newsletter: initialValues ? initialValues.newsletter : false,
        mailchimp_api_key: initialValues ? initialValues.mailchimp_api_key : '',
        mailchimp_list_id: initialValues ? initialValues.mailchimp_list_id : '',
        mode: initialValues ? initialValues.mailchimp_list_id : false,
    });

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
            <Modal
                open={isOpenModal}
                title='Marketing Setting'
                subtitle='Edit Marketing Settings'
                isBtnSave={true}
                handleCancel={() => setIsOpenModal(false)}
                handleSubmit={handleSubmit}
            >
                <div className='grid gap-2 my-4'>
                    <div className='col-span-full w-full grid gap-4'>
                        <Input
                            id='mailchimp_api_key'
                            label='Mailchimp API KEY'
                            type='text'
                            placeholder='Mailchimp API KEY'
                            onChange={handleChange}
                            value={formData.mailchimp_api_key}
                        />
                        <Input
                            id='mailchimp_list_id'
                            label='Mailchimp List ID'
                            type='text'
                            placeholder='Mailchimp List ID'
                            onChange={handleChange}
                            value={formData.mailchimp_list_id}
                        />
                        <CheckboxInput
                            label='NewsLetter'
                            text='Enable NewsLetter'
                            checked={formData.newsletter}
                            onChange={(checked) => (
                                setFormData((prev) => ({
                                    ...prev,
                                    newsletter: checked
                                }))
                            )}
                        />
                    </div>
                </div>
            </Modal >
            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    <div>
                        <FormGroup
                            title="Marketing Platform"
                            description="Broadcast email and sms to a third party"
                        >
                            <div className='col-span-full border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex gap-3 justify-between'>
                                    <h4 className='text-lg font-semibold'>Marketing</h4>
                                    <div className='flex gap-3'>
                                        <Button
                                            label='Edit'
                                            onClick={() => setIsOpenModal(true)}
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
                                            checked={marketing}
                                            onChange={(value) =>
                                                setMarketing(value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </FormGroup>

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label='Create Marketing Settings'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default index;
