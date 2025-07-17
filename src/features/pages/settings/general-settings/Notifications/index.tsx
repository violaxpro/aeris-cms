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
import dynamic from 'next/dynamic';

const QuillInput = dynamic(() => import('@/components/quill-input'), { ssr: false, loading: () => <p>Loading editor...</p>, });

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [orderConfirm, setOrderConfirm] = useState(true)
    const [paymentReceive, setPaymentReceive] = useState(true)
    const [orderProcessing, setOrderProcessing] = useState(true)
    const [orderPacked, setOrderPacked] = useState(true)
    const [outOfDelivery, setOutOfDelivery] = useState(true)
    const [orderShipped, setOrderShipped] = useState(true)
    const [orderDelivered, setOrderDelivered] = useState(true)
    const [orderCancelled, setOrderCancelled] = useState(true)
    const [orderRefund, setOrderRefund] = useState(true)
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
        template: initialValues ? initialValues.template : '',
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
        order_confirm_template: initialValues ? initialValues.order_confirm_template : '',
        payment_receive_template: initialValues ? initialValues.payment_receive_template : '',
        order_processing_template: initialValues ? initialValues.order_processing_template : '',
        outof_delivery_template: initialValues ? initialValues.outof_delivery_template : '',
        order_packed_template: initialValues ? initialValues.order_packed_template : '',
        order_shipped_template: initialValues ? initialValues.order_shipped_template : '',
        order_delivered_template: initialValues ? initialValues.order_delivered_template : '',
        order_canceled_template: initialValues ? initialValues.order_canceled_template : '',
        order_refund_template: initialValues ? initialValues.order_refund_template : '',


    });

    const optionsMode = [
        { label: "Order Confirmation", value: 'order confirmation' },
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
                        <FormGroup title="Order Notifications" description='Notifications for order confirmation' />
                        <div className='flex flex-col gap-4'>
                            {/* order notifications payment */}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Order Notification</h4>
                                    <SwitchInput
                                        label='Enable Order Confirmation'
                                        checked={orderConfirm}
                                        onChange={(value) =>
                                            setOrderConfirm(value)
                                        }
                                    />
                                </div>
                                {
                                    orderConfirm == true && (
                                        <>
                                            <div className='col-span-full flex gap-3 justify-end mb-4'>
                                                <SelectInput
                                                    id='mode'
                                                    label='Choose Template'
                                                    value={formData.template}
                                                    onChange={(selected) => setFormData({
                                                        ...formData,
                                                        template: selected
                                                    })}
                                                    options={optionsMode}
                                                />
                                            </div>
                                            <div className='col-span-full w-full'>
                                                <QuillInput
                                                    key='order_confirm'
                                                    label="Order Confirmation Template"
                                                    value={formData.order_confirm_template}
                                                    onChange={(value: any) => setFormData({
                                                        ...formData,
                                                        order_confirm_template: value
                                                    })}
                                                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            {/*  payment received*/}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Payment Received</h4>
                                    <SwitchInput
                                        label='Enable Payment Receive'
                                        checked={paymentReceive}
                                        onChange={(value) =>
                                            setPaymentReceive(value)
                                        }
                                    />
                                </div>
                                {
                                    paymentReceive == true && (
                                        <>
                                            <div className='col-span-full flex gap-3 justify-end mb-4'>
                                                <SelectInput
                                                    id='mode'
                                                    label='Choose Template'
                                                    value={formData.template}
                                                    onChange={(selected) => setFormData({
                                                        ...formData,
                                                        template: selected
                                                    })}
                                                    options={optionsMode}
                                                />
                                            </div>
                                            <div className='col-span-full w-full'>
                                                <QuillInput
                                                    key='payment_receive'
                                                    label="Payment Receive"
                                                    value={formData.payment_receive_template}
                                                    onChange={(value: any) => setFormData({
                                                        ...formData,
                                                        payment_receive_template: value
                                                    })}
                                                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            {/* order processing*/}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Order Processing</h4>
                                    <SwitchInput
                                        label='Enable Order Processing'
                                        checked={orderProcessing}
                                        onChange={(value) =>
                                            setOrderProcessing(value)
                                        }
                                    />
                                </div>
                                {
                                    orderProcessing == true && (
                                        <>
                                            <div className='col-span-full flex gap-3 justify-end mb-4'>
                                                <SelectInput
                                                    id='mode'
                                                    label='Choose Template'
                                                    value={formData.template}
                                                    onChange={(selected) => setFormData({
                                                        ...formData,
                                                        template: selected
                                                    })}
                                                    options={optionsMode}
                                                />
                                            </div>
                                            <div className='col-span-full w-full'>
                                                <QuillInput
                                                    key='order_process'
                                                    label="Order Processing"
                                                    value={formData.order_processing_template}
                                                    onChange={(value: any) => setFormData({
                                                        ...formData,
                                                        order_processing_template: value
                                                    })}
                                                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            {/* order packed*/}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Order Packed</h4>
                                    <SwitchInput
                                        label='Enable Order Packed'
                                        checked={orderPacked}
                                        onChange={(value) =>
                                            setOrderPacked(value)
                                        }
                                    />
                                </div>
                                {
                                    orderPacked == true && (
                                        <>
                                            <div className='col-span-full flex gap-3 justify-end mb-4'>
                                                <SelectInput
                                                    id='mode'
                                                    label='Choose Template'
                                                    value={formData.template}
                                                    onChange={(selected) => setFormData({
                                                        ...formData,
                                                        template: selected
                                                    })}
                                                    options={optionsMode}
                                                />
                                            </div>
                                            <div className='col-span-full w-full'>
                                                <QuillInput
                                                    key='order_packed'
                                                    label="Order Packed"
                                                    value={formData.order_packed_template}
                                                    onChange={(value: any) => setFormData({
                                                        ...formData,
                                                        order_packed_template: value
                                                    })}
                                                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            {/* order packed*/}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Out of Delivery</h4>
                                    <SwitchInput
                                        label='Enable Out of Delivery'
                                        checked={outOfDelivery}
                                        onChange={(value) =>
                                            setOutOfDelivery(value)
                                        }
                                    />
                                </div>
                                {
                                    outOfDelivery == true && (
                                        <>
                                            <div className='col-span-full flex gap-3 justify-end mb-4'>
                                                <SelectInput
                                                    id='mode'
                                                    label='Choose Template'
                                                    value={formData.template}
                                                    onChange={(selected) => setFormData({
                                                        ...formData,
                                                        template: selected
                                                    })}
                                                    options={optionsMode}
                                                />
                                            </div>
                                            <div className='col-span-full w-full'>
                                                <QuillInput
                                                    key='outof_delivery'
                                                    label="Out of Delivery"
                                                    value={formData.outof_delivery_template}
                                                    onChange={(value: any) => setFormData({
                                                        ...formData,
                                                        outof_delivery_template: value
                                                    })}
                                                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            {/* order shipped*/}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Order Shipped</h4>
                                    <SwitchInput
                                        label='Enable Order Shipped'
                                        checked={orderShipped}
                                        onChange={(value) =>
                                            setOrderShipped(value)
                                        }
                                    />
                                </div>
                                {
                                    orderShipped == true && (
                                        <>
                                            <div className='col-span-full flex gap-3 justify-end mb-4'>
                                                <SelectInput
                                                    id='mode'
                                                    label='Choose Template'
                                                    value={formData.template}
                                                    onChange={(selected) => setFormData({
                                                        ...formData,
                                                        template: selected
                                                    })}
                                                    options={optionsMode}
                                                />
                                            </div>
                                            <div className='col-span-full w-full'>
                                                <QuillInput
                                                    key='order_shipped'
                                                    label="Order Shipped"
                                                    value={formData.order_shipped_template}
                                                    onChange={(value: any) => setFormData({
                                                        ...formData,
                                                        order_shipped_template: value
                                                    })}
                                                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            {/* order delivered*/}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Order Delivered</h4>
                                    <SwitchInput
                                        label='Enable Order Delivered'
                                        checked={orderDelivered}
                                        onChange={(value) =>
                                            setOrderDelivered(value)
                                        }
                                    />
                                </div>
                                {
                                    orderDelivered == true && (
                                        <>
                                            <div className='col-span-full flex gap-3 justify-end mb-4'>
                                                <SelectInput
                                                    id='mode'
                                                    label='Choose Template'
                                                    value={formData.template}
                                                    onChange={(selected) => setFormData({
                                                        ...formData,
                                                        template: selected
                                                    })}
                                                    options={optionsMode}
                                                />
                                            </div>
                                            <div className='col-span-full w-full'>
                                                <QuillInput
                                                    key='order_delivered'
                                                    label="Order Delivered"
                                                    value={formData.order_delivered_template}
                                                    onChange={(value: any) => setFormData({
                                                        ...formData,
                                                        order_delivered_template: value
                                                    })}
                                                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            {/* order cancelled*/}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Order Cancelled</h4>
                                    <SwitchInput
                                        label='Enable Order Cancelled'
                                        checked={orderCancelled}
                                        onChange={(value) =>
                                            setOrderCancelled(value)
                                        }
                                    />
                                </div>
                                {
                                    orderCancelled == true && (
                                        <>
                                            <div className='col-span-full flex gap-3 justify-end mb-4'>
                                                <SelectInput
                                                    id='mode'
                                                    label='Choose Template'
                                                    value={formData.template}
                                                    onChange={(selected) => setFormData({
                                                        ...formData,
                                                        template: selected
                                                    })}
                                                    options={optionsMode}
                                                />
                                            </div>
                                            <div className='col-span-full w-full'>
                                                <QuillInput
                                                    key='order_canceled'
                                                    label="Order Canceled"
                                                    value={formData.order_canceled_template}
                                                    onChange={(value: any) => setFormData({
                                                        ...formData,
                                                        order_canceled_template: value
                                                    })}
                                                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            {/* order refund*/}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Order Refund Processed</h4>
                                    <SwitchInput
                                        label='Enable Order Refund Processed'
                                        checked={orderRefund}
                                        onChange={(value) =>
                                            setOrderRefund(value)
                                        }
                                    />
                                </div>
                                {
                                    orderRefund == true && (
                                        <>
                                            <div className='col-span-full flex gap-3 justify-end mb-4'>
                                                <SelectInput
                                                    id='mode'
                                                    label='Choose Template'
                                                    value={formData.template}
                                                    onChange={(selected) => setFormData({
                                                        ...formData,
                                                        template: selected
                                                    })}
                                                    options={optionsMode}
                                                />
                                            </div>
                                            <div className='col-span-full w-full'>
                                                <QuillInput
                                                    key='order_refund'
                                                    label="Order Refund Processed"
                                                    value={formData.order_refund_template}
                                                    onChange={(value: any) => setFormData({
                                                        ...formData,
                                                        order_refund_template: value
                                                    })}
                                                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>


                        <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', margin: '1rem 0' }} />

                        {/* <FormGroup title="Other Payment">
                            <div className=' col-span-full flex justify-start gap-4'>
                                <SwitchInput
                                    label='Cash Payment'
                                    checked={cash}
                                    onChange={(value) =>
                                        setCash(value)
                                    }
                                />
                                <SwitchInput
                                    label='Bank Transfer'
                                    checked={bankTransfer}
                                    onChange={(value) =>
                                        setBankTransfer(value)
                                    }
                                />
                            </div>
                            {
                                bankTransfer == true && (
                                    <>
                                        <div className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                            <div className='col-span-full flex gap-3 justify-between mb-4'>
                                                <h4 className='text-base font-medium'>Bank Transfer</h4>
                                            </div>
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
                                                <div className='col-span-full w-full'>
                                                    <TextArea
                                                        id='description'
                                                        label='Description'
                                                        placeholder='Description'
                                                        onChange={handleChange}
                                                        value={formData.description}
                                                    />
                                                </div>
                                                <div className='col-span-full w-full'>
                                                    <TextArea
                                                        id='instruction'
                                                        label='Instruction'
                                                        placeholder='Instruction'
                                                        onChange={handleChange}
                                                        value={formData.instruction}
                                                    />
                                                </div>


                                            </div>
                                        </div>

                                    </>
                                )

                            }

                        </FormGroup> */}

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
