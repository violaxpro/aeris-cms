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
import CheckboxInput from '@/components/checkbox';
import SwitchInput from '@/components/switch';
import { uploadImages } from '@/services/upload-images';
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { PencilIcon } from '@public/icon';
import Image from 'next/image';
import ModalStripePayment from './ModalStripePayment';
import ModalPaypalPayment from './ModalPaypalPayment';
import ModalApplePayment from './ModalApplePayment';
import ModalGooglePayment from './ModalGooglePayment';
import ModalBankTransfer from './ModalBankTransfer';

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [paymentGateaway, setPaymentGateaway] = useState(true)
    const [stripPayment, setStripPayment] = useState(false)
    const [paypalPayment, setPaypalPayment] = useState(false)
    const [applePayment, setApplePayment] = useState(false)
    const [googlePayment, setGooglePayment] = useState(false)
    const [chatFeatures, setChatFeatures] = useState(true)
    const [cash, setCash] = useState(false)
    const [bankTransfer, setBankTransfer] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentMethod, setCurrentMethod] = useState<string | null>()
    const [formData, setFormData] = useState({
        support_currency: initialValues ? initialValues.support_currency : '',
        default_currency: initialValues ? initialValues.default_currency : '',
        rate_service: initialValues ? initialValues.rate_service : '',
        auto_refresh: initialValues ? initialValues.auto_refresh : false,
        publishable_key_live: initialValues ? initialValues.publishable_key_live : '',
        publishable_key_test: initialValues ? initialValues.publishable_key_test : '',
        secret_key_live: initialValues ? initialValues.secret_key_live : '',
        secret_key_test: initialValues ? initialValues.secret_key_test : '',
        mode_stripe_payment: initialValues ? initialValues.mode_stripe_payment : '',
        client_id_live: initialValues ? initialValues.client_id_live : '',
        client_secret_live: initialValues ? initialValues.client_secret_live : '',
        client_id_sandbox: initialValues ? initialValues.client_id_sandbox : '',
        client_key_sandbox: initialValues ? initialValues.client_key_sandbox : '',
        mode_paypal: initialValues ? initialValues.mode_paypal : '',
        merchant_id: initialValues ? initialValues.merchant_id : '',
        domain_verification: initialValues ? initialValues.domain_verification : '',
        payment_processor: initialValues ? initialValues.payment_processor : '',
        mode_apple: initialValues ? initialValues.mode_apple : '',
        merchant_id_google: initialValues ? initialValues.merchant_id_google : '',
        merchant_name_google: initialValues ? initialValues.merchant_name_google : '',
        payment_processor_google: initialValues ? initialValues.payment_processor_google : '',
        mode_google: initialValues ? initialValues.mode_google : '',
        label: initialValues ? initialValues.label : '',
        description: initialValues ? initialValues.description : '',
        instruction: initialValues ? initialValues.instruction : '',
        bank_name: initialValues ? initialValues.bank_name : '',
        bank_account_name: initialValues ? initialValues.bank_account_name : '',
        bank_bsb: initialValues ? initialValues.bank_bsb : '',
        bank_account_number: initialValues ? initialValues.bank_account_number : '',
        mode_bank_transfer: initialValues ? initialValues.mode_bank_transfer : '',
    });

    const optionsMode = [
        { label: "Live", value: 'live' },
        { label: "Test", value: 'test' },
    ]
    const optionsModePaypal = [
        { label: "Live", value: 'live' },
        { label: "Sandbox", value: 'sandbox' },
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

    const handleChangeSelect = (id: string, value: string | string[]) => {
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
            {
                currentMethod == 'stripe-payment' && <ModalStripePayment
                    isModalOpen={isModalOpen}
                    handleCancel={() => setIsModalOpen(false)}
                    handleChange={handleChange}
                    formData={formData}
                />
            }
            {
                currentMethod == 'paypal-payment' && <ModalPaypalPayment
                    isModalOpen={isModalOpen}
                    handleCancel={() => setIsModalOpen(false)}
                    handleChange={handleChange}
                    formData={formData}
                />
            }
            {
                currentMethod == 'apple-payment' && <ModalApplePayment
                    isModalOpen={isModalOpen}
                    handleCancel={() => setIsModalOpen(false)}
                    handleChange={handleChange}
                    formData={formData}
                />
            }
            {
                currentMethod == 'google-payment' && <ModalGooglePayment
                    isModalOpen={isModalOpen}
                    handleCancel={() => setIsModalOpen(false)}
                    handleChange={handleChange}
                    formData={formData}
                />
            }
            {
                currentMethod == 'bank-transfer' && <ModalBankTransfer
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
                            title="Currency"
                            description="Currency information"
                        >
                            <div className='grid md:grid-cols-2 gap-3'>
                                <Input
                                    id='support_currency'
                                    label='Supported Currency'
                                    type='text'
                                    placeholder='Supported Currency'
                                    onChange={handleChange}
                                    value={formData.support_currency}
                                />
                                <Input
                                    id='default_currency'
                                    label='Default Currency'
                                    type='text'
                                    placeholder='Default Currency'
                                    onChange={handleChange}
                                    value={formData.default_currency}
                                />
                                <Input
                                    id='rate_service'
                                    label='Exchange Rate Service'
                                    type='text'
                                    placeholder='Exchange Rate Service'
                                    onChange={handleChange}
                                    value={formData.rate_service}
                                />
                                <CheckboxInput
                                    label='Auto Refresh'
                                    text={formData.auto_refresh == true ? 'True' : 'False'}
                                    onChange={(e: any) => setFormData({
                                        ...formData,
                                        auto_refresh: e
                                    })}
                                    checked={formData.auto_refresh}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup title="Payment Gateaway" description='Payment gateaway settings' childClassName='flex flex-col gap-3' className='mt-5'>
                            <>
                                {/* stripe payment */}
                                <div className='col-span-full border p-8 rounded-xl' style={{ borderColor: '#E5E7EB' }}  >
                                    <div className='col-span-full flex gap-3 justify-between'>
                                        <h4 className='text-lg font-semibold'>Stripe Payment</h4>
                                        <div className='flex gap-3'>
                                            <Button
                                                label='Edit'
                                                onClick={() => handleOpenModal('stripe-payment')}
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
                                                checked={stripPayment}
                                                onChange={(value) =>
                                                    setStripPayment(value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* paypal payment */}
                                <div className='col-span-full border p-8 rounded-lg' style={{ borderColor: '#E5E7EB' }}  >
                                    <div className='col-span-full flex gap-3 justify-between'>
                                        <h4 className='text-lg font-semibold'>Paypal Payment</h4>
                                        <div className='flex gap-3'>
                                            <Button
                                                label='Edit'
                                                onClick={() => handleOpenModal('paypal-payment')}
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
                                                checked={paypalPayment}
                                                onChange={(value) =>
                                                    setPaypalPayment(value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* apple payment */}
                                <div className='col-span-full border p-8 rounded-lg' style={{ borderColor: '#E5E7EB' }}  >
                                    <div className='col-span-full flex gap-3 justify-between'>
                                        <h4 className='text-lg font-semibold'>Apple Payment</h4>
                                        <div className='flex gap-3'>
                                            <Button
                                                label='Edit'
                                                onClick={() => handleOpenModal('apple-payment')}
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
                                                checked={applePayment}
                                                onChange={(value) =>
                                                    setApplePayment(value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* google payment */}
                                <div className='col-span-full border p-8 rounded-lg' style={{ borderColor: '#E5E7EB' }}  >
                                    <div className='col-span-full flex gap-3 justify-between'>
                                        <h4 className='text-lg font-semibold'>Google Payment</h4>
                                        <div className='flex gap-3'>
                                            <Button
                                                label='Edit'
                                                onClick={() => handleOpenModal('google-payment')}
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
                                                checked={googlePayment}
                                                onChange={(value) =>
                                                    setGooglePayment(value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        </FormGroup>

                        <FormGroup title="Other Payment" description='Other Payment' childClassName='flex flex-col gap-3' className='mt-4'>
                            <div className='col-span-full border p-8 rounded-lg flex gap-3 justify-between' style={{ borderColor: '#E5E7EB' }}  >
                                <h4 className='text-lg font-semibold'>Cash Payment</h4>
                                <SwitchInput
                                    label='Enable'
                                    checked={cash}
                                    onChange={(value) =>
                                        setCash(value)
                                    }
                                />
                            </div>
                            <div className='col-span-full border p-8 rounded-lg' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex gap-3 justify-between'>
                                    <h4 className='text-lg font-semibold'>Bank Transfer</h4>
                                    <div className='flex gap-3'>
                                        <Button
                                            label='Edit'
                                            onClick={() => handleOpenModal('bank-transfer')}
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
                                            checked={bankTransfer}
                                            onChange={(value) =>
                                                setBankTransfer(value)
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
