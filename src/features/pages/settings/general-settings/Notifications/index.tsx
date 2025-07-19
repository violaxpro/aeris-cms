'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form-group';
import Input from "@/components/input"
import TextArea from "@/components/textarea"
import Modal from '@/components/modal'
import SelectInput from '@/components/select';
import SwitchInput from '@/components/switch';
import { uploadImages } from '@/services/upload-images';
import { Divider } from 'antd';
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
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentTemplateKey, setCurrentTemplateKey] = useState<string | null>(null);
    const [editorContent, setEditorContent] = useState('');
    const [notifikasi, setNotifikasi] = useState({
        emailOrderConfirm: true,
        smsOrderConfirm: true,
        emailPayment: true,
        smsPayment: true,
        emailOrderProcess: true,
        smsOrderProcess: true,
        emailOrderPacked: true,
        smsOrderPacked: true,
        emailOutofDelivery: true,
        smsOutofDelivery: true,
        emailOrderShipped: true,
        smsOrderShipped: true,
        emailOrderDelivered: true,
        smsOrderDelivered: true,
        emailOrderCancel: true,
        smsOrderCancel: true,
        emailOrderRefund: true,
        smsOrderrRefund: true,
    });

    const [bankTransfer, setBankTransfer] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState({
        order_confirm: '',
        payment_receive: '',
        order_processing: '',
        outof_delivery: '',
        order_packed: '',
        order_shipped: '',
        order_delivered: '',
        order_canceled: '',
        order_refund: ''
    })
    const [formData, setFormData] = useState({
        template: initialValues ? initialValues.template : '',
        order_confirm_template: initialValues ? initialValues.order_confirm_template : '',
        payment_receive_template: initialValues ? initialValues.payment_receive_template : '',
        order_processing_template: initialValues ? initialValues.order_processing_template : '',
        outof_delivery_template: initialValues ? initialValues.outof_delivery_template : '',
        order_packed_template: initialValues ? initialValues.order_packed_template : '',
        order_shipped_template: initialValues ? initialValues.order_shipped_template : '',
        order_delivered_template: initialValues ? initialValues.order_delivered_template : '',
        order_canceled_template: initialValues ? initialValues.order_canceled_template : '',
        order_refund_template: initialValues ? initialValues.order_refund_template : '',
        account_registration: initialValues ? initialValues.account_registration : '',
        password_reset: initialValues ? initialValues.password_reset : '',
        email_verification: initialValues ? initialValues.email_verification : '',
    });

    const optionsOrder = [
        { id: 1, label: "Appointment Order", value: "appointment_order" },
        { id: 2, label: "Appointment Order Test", value: "appointment_order_test" },
    ]

    const optionsPaymentReceive = [
        { id: 1, label: "Payment Receive", value: "payment_receive" },
    ]


    const optionsOrderProcess = [
        { id: 1, label: "Order Process", value: "order_processing" },
    ]

    const optionsOrderPacked = [
        { id: 1, label: "Order Packed", value: "order_packed" },
    ]

    const optionsOutofDelivery = [
        { id: 1, label: "Out of Delivery", value: "outof_delivery" },
    ]
    const optionsOrderShipped = [
        { id: 1, label: "Order Shipped", value: "order_shipped" },
    ]

    const optionsOrderDelivered = [
        { id: 1, label: "Order Delivered", value: "order_delivered" },
    ]
    const optionsOrderCanceled = [
        { id: 1, label: "Order Cancelled", value: "order_canceled" },
    ]
    const optionsOrderRefund = [
        { id: 1, label: "Order Refund", value: "order_refund" },
    ]

    const templateContents: any = {
        appointment_order: "<p>This is the appointment order template.</p>",
        appointment_order_test: "<p>This is the appointment order test template.</p>",
        payment_receive: "<p>This is the payment order template.</p>",
        order_processing: "<p>This is the order processing template.</p>",
        outof_delivery: "<p>This is the outof delivery template.</p>",
        order_packed: "<p>This is the order packed template.</p>",
        order_shipped: "<p>This is the order shipped template.</p>",
        order_delivered: "<p>This is the order delivered template.</p>",
        order_canceled: "<p>This is the order canceled template.</p>",
        order_refund: "<p>This is the order refund template.</p>",

    };

    const optionsMode = [
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

    const handleOpenModal = (templateKey: string) => {
        const selected = selectedTemplate[templateKey as keyof typeof selectedTemplate];
        console.log(selected)

        const content = templateContents[selected] || '';
        console.log(content)
        setEditorContent(content);
        setCurrentTemplateKey(templateKey); // Pastikan ini match dengan `formData` key
        setIsModalOpen(true);
    };


    const getTemplateValue = () => {
        if (!currentTemplateKey) return '';
        return formData[currentTemplateKey as keyof typeof formData] || '';
    };

    const handleTemplateChange = (id: string, selected: any) => {
        setSelectedTemplate((prev) => ({
            ...prev,
            [id]: selected
        }));
    };


    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleChangeNotifikasi = (key: any, value: boolean) => {
        setNotifikasi((prev) => ({
            ...prev,
            [key]: value,
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

    console.log(formData, currentTemplateKey, selectedTemplate, editorContent)

    return (
        <>
            <Modal
                open={isModalOpen}
                handleCancel={() => setIsModalOpen(false)}
                title='View Template'
            >
                <QuillInput
                    key={currentTemplateKey}
                    label=""
                    value={editorContent}
                    onChange={(value) => {
                        setEditorContent(value);
                        if (currentTemplateKey) {
                            setFormData((prev) => ({
                                ...prev,
                                [currentTemplateKey]: value,
                            }));
                        }
                    }}
                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                />
            </Modal>
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
                                    <div className='flex gap-4'>
                                        <SwitchInput
                                            label='Enable'
                                            checked={orderConfirm}
                                            onChange={(checked) => setOrderConfirm(checked)}
                                        />
                                    </div>
                                </div>
                                {orderConfirm == true && (
                                    <>
                                        <div className='flex flex-col gap-3 mt-4'>
                                            <div className='flex justify-between'>
                                                <label>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.emailOrderConfirm && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.order_confirm && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_confirm')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='order_confirm'
                                                                    value={selectedTemplate.order_confirm}
                                                                    onChange={(val: any) => handleTemplateChange('order_confirm', val)}
                                                                    options={optionsOrder}
                                                                    selectClassName='!w-[200]'
                                                                />

                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='Email'
                                                        checked={notifikasi.emailOrderConfirm}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderConfirm", value)}
                                                    />
                                                </div>

                                            </div>
                                            <div className='flex justify-between'>
                                                <label>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.smsOrderConfirm && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.order_confirm && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_confirm')}
                                                                    />
                                                                }

                                                                <SelectInput
                                                                    id='order_confirm'
                                                                    value={selectedTemplate.order_confirm}
                                                                    onChange={(val: any) => handleTemplateChange('order_confirm', val)}
                                                                    options={optionsOrder}
                                                                    selectClassName='!w-[200]'
                                                                />

                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='SMS'
                                                        checked={notifikasi.smsOrderConfirm}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderConfirm", value)}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </>

                                )}
                            </div>

                            {/* payment receive */}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Payment Received</h4>
                                    <div className='flex gap-4'>
                                        <SwitchInput
                                            label='Enable'
                                            checked={paymentReceive}
                                            onChange={(checked) => setPaymentReceive(checked)}
                                        />
                                    </div>
                                </div>
                                {paymentReceive == true && (
                                    <>
                                        <div className='flex flex-col gap-3 mt-4'>
                                            <div className='flex justify-between'>
                                                <label>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.emailPayment && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.payment_receive && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('payment_receive')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='payment_receive'
                                                                    value={selectedTemplate.payment_receive}
                                                                    onChange={(val: any) => handleTemplateChange('payment_receive', val)}
                                                                    options={optionsPaymentReceive}
                                                                    selectClassName='!w-[200]'
                                                                />

                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='Email'
                                                        checked={notifikasi.emailPayment}
                                                        onChange={(value) => handleChangeNotifikasi("emailPayment", value)}
                                                    />
                                                </div>

                                            </div>
                                            <div className='flex justify-between'>
                                                <label>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.smsPayment && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.payment_receive && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('payment_receive')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='payment_receive'
                                                                    value={selectedTemplate.payment_receive}
                                                                    onChange={(val: any) => handleTemplateChange('payment_receive', val)}
                                                                    options={optionsPaymentReceive}
                                                                    selectClassName='!w-[200]'
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='SMS'
                                                        checked={notifikasi.smsPayment}
                                                        onChange={(value) => handleChangeNotifikasi("smsPayment", value)}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* order processing */}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Order Processing</h4>
                                    <div className='flex gap-4'>
                                        <SwitchInput
                                            label='Enable'
                                            checked={orderProcessing}
                                            onChange={(checked) => setOrderProcessing(checked)}
                                        />
                                    </div>
                                </div>
                                {orderProcessing == true && (
                                    <>
                                        <div className='flex flex-col gap-3 mt-4'>
                                            <div className='flex justify-between'>
                                                <label>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.emailOrderProcess && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.order_processing && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_processing')}
                                                                    />
                                                                }

                                                                <SelectInput
                                                                    id='order_processing'
                                                                    value={selectedTemplate.order_processing}
                                                                    onChange={(val: any) => handleTemplateChange('order_processing', val)}
                                                                    options={optionsOrderProcess}
                                                                    selectClassName='!w-[200]'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='Email'
                                                        checked={notifikasi.emailOrderProcess}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderProcess", value)}
                                                    />
                                                </div>

                                            </div>
                                            <div className='flex justify-between'>
                                                <label>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.smsOrderProcess && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.order_processing && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_processing')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='order_processing'
                                                                    value={selectedTemplate.order_processing}
                                                                    onChange={(val: any) => handleTemplateChange('order_processing', val)}
                                                                    options={optionsOrderProcess}
                                                                    selectClassName='!w-[200]'
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='SMS'
                                                        checked={notifikasi.smsOrderProcess}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderProcess", value)}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* order processing */}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Order Packed</h4>
                                    <div className='flex gap-4'>
                                        <SwitchInput
                                            label='Enable'
                                            checked={orderPacked}
                                            onChange={(checked) => setOrderPacked(checked)}
                                        />
                                    </div>
                                </div>
                                {orderPacked == true && (
                                    <>
                                        <div className='flex flex-col gap-3 mt-4'>
                                            <div className='flex justify-between'>
                                                <label>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.emailOrderPacked && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.order_packed && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_packed')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='order_packed'
                                                                    value={selectedTemplate.order_packed}
                                                                    onChange={(val: any) => handleTemplateChange('order_packed', val)}
                                                                    options={optionsOrderPacked}
                                                                    selectClassName='!w-[200]'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='Email'
                                                        checked={notifikasi.emailOrderPacked}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderPacked", value)}
                                                    />
                                                </div>

                                            </div>
                                            <div className='flex justify-between'>
                                                <label>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.smsOrderPacked && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.order_packed && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_packed')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='order_packed'
                                                                    value={selectedTemplate.order_packed}
                                                                    onChange={(val: any) => handleTemplateChange('order_packed', val)}
                                                                    options={optionsOrderPacked}
                                                                    selectClassName='!w-[200]'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='SMS'
                                                        checked={notifikasi.smsOrderPacked}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderPacked", value)}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>


                            {/* outof delivery */}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Out of Delivery</h4>
                                    <div className='flex gap-4'>
                                        <SwitchInput
                                            label='Enable'
                                            checked={outOfDelivery}
                                            onChange={(checked) => setOutOfDelivery(checked)}
                                        />
                                    </div>
                                </div>
                                {outOfDelivery == true && (
                                    <>
                                        <div className='flex flex-col gap-3 mt-4'>
                                            <div className='flex justify-between'>
                                                <label>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.emailOutofDelivery && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.outof_delivery && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('outof_delivery')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='outof_delivery'
                                                                    value={selectedTemplate.outof_delivery}
                                                                    onChange={(val: any) => handleTemplateChange('outof_delivery', val)}
                                                                    options={optionsOutofDelivery}
                                                                    selectClassName='!w-[200]'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='Email'
                                                        checked={notifikasi.emailOutofDelivery}
                                                        onChange={(value) => handleChangeNotifikasi("emailOutofDelivery", value)}
                                                    />
                                                </div>

                                            </div>
                                            <div className='flex justify-between'>
                                                <label>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.smsOutofDelivery && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.outof_delivery && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('outof_delivery')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='outof_delivery'
                                                                    value={selectedTemplate.outof_delivery}
                                                                    onChange={(val: any) => handleTemplateChange('outof_delivery', val)}
                                                                    options={optionsOutofDelivery}
                                                                    selectClassName='!w-[200]'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='SMS'
                                                        checked={notifikasi.smsOutofDelivery}
                                                        onChange={(value) => handleChangeNotifikasi("smsOutofDelivery", value)}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* order shipped */}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Order Shipped</h4>
                                    <div className='flex gap-4'>
                                        <SwitchInput
                                            label='Enable'
                                            checked={orderShipped}
                                            onChange={(checked) => setOrderShipped(checked)}
                                        />
                                    </div>
                                </div>
                                {orderShipped == true && (
                                    <>
                                        <div className='flex flex-col gap-3 mt-4'>
                                            <div className='flex justify-between'>
                                                <label>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.emailOrderShipped && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.order_shipped && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_shipped')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='order_shipped'
                                                                    value={selectedTemplate.order_shipped}
                                                                    onChange={(val: any) => handleTemplateChange('order_shipped', val)}
                                                                    options={optionsOrderShipped}
                                                                    selectClassName='!w-[200]'
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='Email'
                                                        checked={notifikasi.emailOrderShipped}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderShipped", value)}
                                                    />
                                                </div>

                                            </div>
                                            <div className='flex justify-between'>
                                                <label>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.smsOrderShipped && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.order_shipped && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_shipped')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='order_shipped'
                                                                    value={selectedTemplate.order_shipped}
                                                                    onChange={(val: any) => handleTemplateChange('order_shipped', val)}
                                                                    options={optionsOrderShipped}
                                                                    selectClassName='!w-[200]'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='SMS'
                                                        checked={notifikasi.smsOrderShipped}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderShipped", value)}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* order delivered */}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Order Delivered</h4>
                                    <div className='flex gap-4'>
                                        <SwitchInput
                                            label='Enable'
                                            checked={orderDelivered}
                                            onChange={(checked) => setOrderDelivered(checked)}
                                        />
                                    </div>
                                </div>
                                {orderDelivered == true && (
                                    <>
                                        <div className='flex flex-col gap-3 mt-4'>
                                            <div className='flex justify-between'>
                                                <label>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.emailOrderDelivered && (
                                                            <div className='flex items-center gap-3'>

                                                                {
                                                                    selectedTemplate.order_delivered && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_delivered')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='order_delivered'
                                                                    value={selectedTemplate.order_delivered}
                                                                    onChange={(val: any) => handleTemplateChange('order_delivered', val)}
                                                                    options={optionsOrderDelivered}
                                                                    selectClassName='!w-[200]'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='Email'
                                                        checked={notifikasi.emailOrderDelivered}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderDelivered", value)}
                                                    />
                                                </div>

                                            </div>
                                            <div className='flex justify-between'>
                                                <label>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.smsOrderDelivered && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.order_delivered && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_delivered')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='order_delivered'
                                                                    value={selectedTemplate.order_delivered}
                                                                    onChange={(val: any) => handleTemplateChange('order_delivered', val)}
                                                                    options={optionsOrderDelivered}
                                                                    selectClassName='!w-[200]'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='SMS'
                                                        checked={notifikasi.smsOrderDelivered}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderDelivered", value)}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>


                            {/* order cancelled */}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Order Cancelled</h4>
                                    <div className='flex gap-4'>
                                        <SwitchInput
                                            label='Enable'
                                            checked={orderCancelled}
                                            onChange={(checked) => setOrderCancelled(checked)}
                                        />
                                    </div>
                                </div>
                                {orderCancelled == true && (
                                    <>
                                        <div className='flex flex-col gap-3 mt-4'>
                                            <div className='flex justify-between'>
                                                <label>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.emailOrderCancel && (
                                                            <div className='flex items-center gap-3'>

                                                                {
                                                                    selectedTemplate.order_canceled && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_canceled')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='order_canceled'
                                                                    value={selectedTemplate.order_canceled}
                                                                    onChange={(val: any) => handleTemplateChange('order_canceled', val)}
                                                                    options={optionsOrderCanceled}
                                                                    selectClassName='!w-[200]'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='Email'
                                                        checked={notifikasi.emailOrderCancel}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderCancel", value)}
                                                    />
                                                </div>

                                            </div>
                                            <div className='flex justify-between'>
                                                <label>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.smsOrderCancel && (
                                                            <div className='flex items-center gap-3'>
                                                                {
                                                                    selectedTemplate.order_canceled && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_canceled')}
                                                                    />
                                                                }
                                                                <SelectInput
                                                                    id='order_canceled'
                                                                    value={selectedTemplate.order_canceled}
                                                                    onChange={(val: any) => handleTemplateChange('order_canceled', val)}
                                                                    options={optionsOrderCanceled}
                                                                    selectClassName='!w-[200]'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='SMS'
                                                        checked={notifikasi.smsOrderCancel}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderCancel", value)}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>


                            {/* order refund process */}
                            <div className='flex flex-col col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-base font-medium'>Order Refund Processed</h4>
                                    <div className='flex gap-4'>
                                        <SwitchInput
                                            label='Enable'
                                            checked={orderRefund}
                                            onChange={(checked) => setOrderRefund(checked)}
                                        />
                                    </div>
                                </div>
                                {orderRefund == true && (
                                    <>
                                        <div className='flex flex-col gap-3 mt-4'>
                                            <div className='flex justify-between'>
                                                <label>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.emailOrderRefund && (
                                                            <div className='flex items-center gap-3'>

                                                                {
                                                                    selectedTemplate.order_refund && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_refund')}
                                                                    />
                                                                }

                                                                <SelectInput
                                                                    id='order_refund'
                                                                    value={selectedTemplate.order_refund}
                                                                    onChange={(val: any) => handleTemplateChange('order_refund', val)}
                                                                    options={optionsOrderRefund}
                                                                    selectClassName='!w-[200]'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='Email'
                                                        checked={notifikasi.emailOrderRefund}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderRefund", value)}
                                                    />
                                                </div>

                                            </div>
                                            <div className='flex justify-between'>
                                                <label>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    {
                                                        notifikasi.smsOrderrRefund && (
                                                            <div className='flex items-center gap-3'>

                                                                {
                                                                    selectedTemplate.order_refund && <Button
                                                                        label='View Template'
                                                                        onClick={() => handleOpenModal('order_refund')}
                                                                    />
                                                                }

                                                                <SelectInput
                                                                    id='order_refund'
                                                                    value={selectedTemplate.order_refund}
                                                                    onChange={(val: any) => handleTemplateChange('order_refund', val)}
                                                                    options={optionsOrderRefund}
                                                                    selectClassName='!w-[200]'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <SwitchInput
                                                        label='SMS'
                                                        checked={notifikasi.smsOrderrRefund}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderrRefund", value)}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                        </div>
                        <FormGroup
                            title="Customer Account"
                            description='Customer Account Notification'
                            className='mt-5'
                            childClassName='grid md:grid-cols-3 gap-3'
                        >
                            <Input
                                id='account_registration'
                                label='Account Registration Confirmation'
                                type='text'
                                placeholder='Account Registration Confirmation'
                                onChange={handleChange}
                                value={formData.account_registration}
                            />
                            <Input
                                id='password_reset'
                                label='Password Reset Request'
                                type='text'
                                placeholder='Password Reset Request'
                                onChange={handleChange}
                                value={formData.password_reset}
                            />
                            <Input
                                id='email_verification'
                                label='Email Verification'
                                type='text'
                                placeholder='Email Verification'
                                onChange={handleChange}
                                value={formData.email_verification}
                            />
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
