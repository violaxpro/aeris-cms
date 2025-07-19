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
import { uploadImages } from '@/services/upload-images';
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [paymentGateaway, setPaymentGateaway] = useState(true)
    const [stripPayment, setStripPayment] = useState(true)
    const [paypalPayment, setPaypalPayment] = useState(true)
    const [applePayment, setApplePayment] = useState(true)
    const [googlePayment, setGooglePayment] = useState(true)
    const [chatFeatures, setChatFeatures] = useState(true)
    const [cash, setCash] = useState(true)
    const [bankTransfer, setBankTransfer] = useState(true)
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
        publishable_key_live: initialValues ? initialValues.publishable_key_live : '',
        publishable_key_test: initialValues ? initialValues.publishable_key_test : '',
        secret_key_live: initialValues ? initialValues.secret_key_live : '',
        secret_key_test: initialValues ? initialValues.secret_key_test : '',
        mode: initialValues ? initialValues.mode : '',
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
        label: initialValues ? initialValues.label : '',
        description: initialValues ? initialValues.description : '',
        instruction: initialValues ? initialValues.instruction : '',
        bank_name: initialValues ? initialValues.bank_name : '',
        bank_account_name: initialValues ? initialValues.bank_account_name : '',
        bank_bsb: initialValues ? initialValues.bank_bsb : '',
        bank_account_number: initialValues ? initialValues.bank_account_number : '',
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
            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    <div>
                        <FormGroup title="Payment Gateaway" description='Payment gateaway settings' childClassName='flex flex-col gap-3'>

                            <>
                                {/* stripe payment */}
                                <div className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                    <div className='col-span-full flex gap-3 justify-between'>
                                        <h4 className='text-base font-medium'>Stripe Payment</h4>
                                        <SwitchInput
                                            label='Enable'
                                            checked={stripPayment}
                                            onChange={(value) =>
                                                setStripPayment(value)
                                            }
                                        />
                                    </div>
                                    {
                                        stripPayment == true && (
                                            <div className='grid md:grid-cols-2 gap-2'>
                                                <Input
                                                    id='publishable_key_live'
                                                    label='Publisable Key Live'
                                                    type='text'
                                                    placeholder='Publisable Key Live'
                                                    onChange={handleChange}
                                                    value={formData.publishable_key_live}
                                                />
                                                <Input
                                                    id='secret_key_live'
                                                    label='Secret Key Live'
                                                    type='text'
                                                    placeholder='Secret Key Live'
                                                    onChange={handleChange}
                                                    value={formData.secret_key_live}
                                                />
                                                <div className='grid md:grid-cols-3 col-span-full gap-3'>
                                                    <Input
                                                        id='publishable_key_test'
                                                        label='Publisable Key Test'
                                                        type='text'
                                                        placeholder='Publisable Key Test'
                                                        onChange={handleChange}
                                                        value={formData.publishable_key_test}
                                                    />
                                                    <Input
                                                        id='secret_key_test'
                                                        label='Secret Key Test'
                                                        type='text'
                                                        placeholder='Secret Key Test'
                                                        onChange={handleChange}
                                                        value={formData.secret_key_test}
                                                    />
                                                    <SelectInput
                                                        id='mode'
                                                        label='Mode'
                                                        value={formData.mode}
                                                        onChange={(selected) => setFormData({
                                                            ...formData,
                                                            mode: selected
                                                        })}
                                                        options={optionsMode}
                                                    />
                                                </div>

                                            </div>
                                        )
                                    }
                                </div>

                                {/* paypal payment */}
                                <div className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                    <div className='col-span-full flex gap-3 justify-between'>
                                        <h4 className='text-base font-medium'>Paypal Payment</h4>
                                        <SwitchInput
                                            label='Enable'
                                            checked={paypalPayment}
                                            onChange={(value) =>
                                                setPaypalPayment(value)
                                            }
                                        />
                                    </div>
                                    {
                                        paypalPayment == true && (
                                            <div className='grid md:grid-cols-2 gap-2'>
                                                <Input
                                                    id='client_id_live'
                                                    label='Client ID Live'
                                                    type='text'
                                                    placeholder='Client ID Live'
                                                    onChange={handleChange}
                                                    value={formData.client_id_live}
                                                />
                                                <Input
                                                    id='client_secret_live'
                                                    label='Client Secret Live'
                                                    type='text'
                                                    placeholder='Client Secret Live'
                                                    onChange={handleChange}
                                                    value={formData.client_secret_live}
                                                />
                                                <div className='grid md:grid-cols-3 col-span-full gap-3'>
                                                    <Input
                                                        id='client_id_sandbox'
                                                        label='Client ID Sandbox'
                                                        type='text'
                                                        placeholder='Client ID Sandbox'
                                                        onChange={handleChange}
                                                        value={formData.client_id_sandbox}
                                                    />
                                                    <Input
                                                        id='payment_processor'
                                                        label='Client Key Sandbox'
                                                        type='text'
                                                        placeholder='Client Key Sandbox'
                                                        onChange={handleChange}
                                                        value={formData.client_key_sandbox}
                                                    />
                                                    <SelectInput
                                                        id='mode_paypal'
                                                        label='Mode'
                                                        value={formData.mode_paypal}
                                                        onChange={(selected) => setFormData({
                                                            ...formData,
                                                            mode_paypal: selected
                                                        })}
                                                        options={optionsModePaypal}
                                                    />
                                                </div>

                                            </div>
                                        )
                                    }
                                </div>

                                {/* apple payment */}
                                <div className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                    <div className='col-span-full flex gap-3 justify-between'>
                                        <h4 className='text-base font-medium'>Apple Payment</h4>
                                        <SwitchInput
                                            label='Enable'
                                            checked={applePayment}
                                            onChange={(value) =>
                                                setApplePayment(value)
                                            }
                                        />
                                    </div>
                                    {
                                        applePayment == true && (
                                            <div className='grid md:grid-cols-3 gap-2'>
                                                <Input
                                                    id='merchant_id'
                                                    label='Merchant ID'
                                                    type='text'
                                                    placeholder='Merchant ID'
                                                    onChange={handleChange}
                                                    value={formData.merchant_id}
                                                    className='mb-2'
                                                />
                                                <Input
                                                    id='domain_verification'
                                                    label='Domain Verification'
                                                    type='text'
                                                    placeholder='Domain Verification'
                                                    onChange={handleChange}
                                                    value={formData.domain_verification}
                                                    className='mb-2'
                                                />
                                                <Input
                                                    id='payment_processor'
                                                    label='Payment Processor'
                                                    type='text'
                                                    placeholder='Payment Processor'
                                                    onChange={handleChange}
                                                    value={formData.payment_processor}
                                                    className='mb-2'
                                                />
                                            </div>
                                        )
                                    }
                                </div>

                                {/* google payment */}
                                <div className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                    <div className='col-span-full flex gap-3 justify-between'>
                                        <h4 className='text-base font-medium'>Google Payment</h4>
                                        <SwitchInput
                                            label='Enable'
                                            checked={googlePayment}
                                            onChange={(value) =>
                                                setGooglePayment(value)
                                            }
                                        />
                                    </div>
                                    {
                                        googlePayment == true && (
                                            <div className='grid md:grid-cols-3 gap-2'>
                                                <Input
                                                    id='merchant_id_google'
                                                    label='Merchant ID'
                                                    type='text'
                                                    placeholder='Merchant ID'
                                                    onChange={handleChange}
                                                    value={formData.merchant_id_google}
                                                    className='mb-2'
                                                />
                                                <Input
                                                    id='merchant_name_google'
                                                    label='Merchant Name'
                                                    type='text'
                                                    placeholder='Merchant Name'
                                                    onChange={handleChange}
                                                    value={formData.merchant_name_google}
                                                    className='mb-2'
                                                />
                                                <Input
                                                    id='payment_processor_google'
                                                    label='Payment Processor'
                                                    type='text'
                                                    placeholder='Payment Processor'
                                                    onChange={handleChange}
                                                    value={formData.payment_processor_google}
                                                    className='mb-2'
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </>

                        </FormGroup>

                        <FormGroup title="Other Payment" description='Other Payment' childClassName='flex flex-col gap-3' className='mt-4'>
                            <div className='col-span-full border p-4 rounded-md flex gap-3 justify-between' style={{ borderColor: '#E5E7EB' }}  >
                                <h4 className='text-base font-medium'>Cash Payment</h4>
                                <SwitchInput
                                    label='Enable'
                                    checked={cash}
                                    onChange={(value) =>
                                        setCash(value)
                                    }
                                />
                            </div>
                            <div className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex gap-3 justify-between'>
                                    <h4 className='text-base font-medium'>Bank Transfer</h4>
                                    <SwitchInput
                                        label='Enable'
                                        checked={bankTransfer}
                                        onChange={(value) =>
                                            setBankTransfer(value)
                                        }
                                    />
                                </div>
                                {
                                    bankTransfer == true && (
                                        <>

                                            <div className='grid grid-cols-2 gap-2'>
                                                <Input
                                                    id='label'
                                                    label='Label'
                                                    type='text'
                                                    placeholder='Label'
                                                    onChange={handleChange}
                                                    value={formData.label}
                                                />
                                                <Input
                                                    id='bank_account_name'
                                                    label='Bank Account Name'
                                                    type='text'
                                                    placeholder='Bank Account Name'
                                                    onChange={handleChange}
                                                    value={formData.bank_account_name}
                                                />
                                                <Input
                                                    id='bank_bsb'
                                                    label='Bank BSB'
                                                    type='text'
                                                    placeholder='Bank BSB'
                                                    onChange={handleChange}
                                                    value={formData.bank_bsb}
                                                />
                                                <Input
                                                    id='bank_account_number'
                                                    label='Bank Account Number'
                                                    type='text'
                                                    placeholder='Bank Account Number'
                                                    onChange={handleChange}
                                                    value={formData.bank_account_number}
                                                />
                                                <TextArea
                                                    id='description'
                                                    label='Description'
                                                    placeholder='Description'
                                                    onChange={handleChange}
                                                    value={formData.description}
                                                />
                                                <TextArea
                                                    id='instruction'
                                                    label='Instruction'
                                                    placeholder='Instruction'
                                                    onChange={handleChange}
                                                    value={formData.instruction}
                                                />
                                            </div>
                                        </>
                                    )

                                }
                            </div>
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
