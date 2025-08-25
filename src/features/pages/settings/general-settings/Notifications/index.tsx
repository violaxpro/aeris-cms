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
import Image from 'next/image';
import { PencilIcon } from '@public/icon';
import dynamic from 'next/dynamic';
import { mapTemplatesToOptions } from '@/plugins/validators/common-rules';

const QuillInput = dynamic(() => import('@/components/quill-input'), { ssr: false, loading: () => <p>Loading editor...</p>, });

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [viaEmail, setViaEmail] = useState(false)
    const [viaSms, setViaSms] = useState(false)
    const [currentVia, setCurrentVia] = useState<'email' | 'sms' | null>(null);
    const [orderConfirm, setOrderConfirm] = useState(false)
    const [paymentReceive, setPaymentReceive] = useState(false)
    const [orderProcessing, setOrderProcessing] = useState(false)
    const [trackingNumber, setTrackingNumber] = useState(false)
    const [orderPacked, setOrderPacked] = useState(false)
    const [outOfDelivery, setOutOfDelivery] = useState(false)
    const [orderShipped, setOrderShipped] = useState(false)
    const [orderDelivered, setOrderDelivered] = useState(false)
    const [orderCancelled, setOrderCancelled] = useState(false)
    const [orderRefund, setOrderRefund] = useState(false)
    const [accountRegist, setAccountregist] = useState(false)
    const [passwordReset, setPasswordReset] = useState(false)
    const [emailVerification, setEmailVerification] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentTemplateKey, setCurrentTemplateKey] = useState<any>(null);
    const [editorContent, setEditorContent] = useState('');
    const [notifikasi, setNotifikasi] = useState({
        emailOrderConfirm: false,
        smsOrderConfirm: false,
        emailPayment: false,
        smsPayment: false,
        emailOrderProcess: false,
        smsOrderProcess: false,
        emailTrackingNumber: false,
        smsTrackingNumber: false,
        emailOrderPacked: false,
        smsOrderPacked: false,
        emailOutofDelivery: false,
        smsOutofDelivery: false,
        emailOrderShipped: false,
        smsOrderShipped: false,
        emailOrderDelivered: false,
        smsOrderDelivered: false,
        emailOrderCancel: false,
        smsOrderCancel: false,
        emailOrderRefund: false,
        smsOrderrRefund: false,
        emailAccountRegist: false,
        smsAccountRegist: false,
        emailPasswordReset: false,
        smsPasswordReset: false,
        emailVerification: false,
        smsEmailVerification: false,
    });

    const [bankTransfer, setBankTransfer] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState({
        order_confirm: '',
        payment_receive: '',
        order_processing: '',
        tracking_number: '',
        outof_delivery: '',
        order_packed: '',
        order_shipped: '',
        order_delivered: '',
        order_canceled: '',
        order_refund: '',
        account_regist: '',
        password_reset: '',
        email_verification: ''
    })
    const [formData, setFormData] = useState({
        template: initialValues ? initialValues.template : '',
        order_confirm_template: initialValues ? initialValues.order_confirm_template : '',
        payment_receive_template: initialValues ? initialValues.payment_receive_template : '',
        order_processing_template: initialValues ? initialValues.order_processing_template : '',
        tracking_number_template: initialValues ? initialValues.tracking_number_template : '',
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
        tracking_number: "<p>This is the tacking number template.</p>",
        outof_delivery: "<p>This is the outof delivery template.</p>",
        order_packed: "<p>This is the order packed template.</p>",
        order_shipped: "<p>This is the order shipped template.</p>",
        order_delivered: "<p>This is the order delivered template.</p>",
        order_canceled: "<p>This is the order canceled template.</p>",
        order_refund: "<p>This is the order refund template.</p>",

    };

    const emailTemplate: any = [
        {
            name: 'Appointment Order',
            html_template: '<p>This is the appointment order template.</p>'
        },
        {
            name: 'Booking Order',
            html_template: '<p>This is the booking order template.</p>'
        }
    ]

    const smsTemplate: any = [
        {
            name: 'SMS Order',
            html_template: '<p>This is the sms order template.</p>'
        },
        {
            name: 'SMS Booking Order',
            html_template: '<p>This is the sms booking order template.</p>'
        }
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

    // const handleOpenModal = (templateKey: string) => {
    //     const selected = selectedTemplate[templateKey as keyof typeof selectedTemplate];
    //     console.log(selected)

    //     const content = templateContents[selected] || '';
    //     console.log(content)
    //     setEditorContent(content);
    //     setCurrentTemplateKey(templateKey); // Pastikan ini match dengan `formData` key
    //     setIsModalOpen(true);
    // };
    const handleOpenModal = (templateKey: string, channel: 'email' | 'sms') => {
        const selected = selectedTemplate[templateKey as keyof typeof selectedTemplate]; // Misalnya 'order_confirm'
        const content = templateContents?.[selected]?.[channel] || ''; // Ambil dari email/sms
        setCurrentTemplateKey(templateKey);
        setCurrentVia(channel);
        setEditorContent(content);
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

    console.log(currentTemplateKey, currentVia)
    const getTemplateName = (key: string) => {
        const map: Record<string, string> = {
            order_confirm: 'Order Confirmation',
            payment_receive: 'Payment Receive',
            order_processing: 'Order Processing',
            tracking_number: 'Tracking Number',
            outof_delivery: 'Out of Delivery',
            order_packed: 'Order Packed',
            order_shipped: 'Order Shipped',
            order_delivered: 'Order Delivered',
            order_canceled: 'Order Cancelled',
            order_refund: 'Order Refund Processing',
            account_regist: 'Account Registration Confirmation',
            password_reset: 'Password Reset Request',
            email_verification: 'Email Verification'
            // tambahkan yang lain di sini
        };
        return map[key] || key;
    };


    return (
        <>
            <Modal
                open={isModalOpen}
                handleCancel={() => setIsModalOpen(false)}
                title={`Via ${currentVia == 'sms' ? 'SMS' : 'Email'}`}
                subtitle={` ${getTemplateName(currentTemplateKey ?? 'order_confirm')} Via ${currentVia == 'sms' ? 'SMS' : 'Email'} `}
            >
                <div className='flex flex-col gap-3 py-4'>
                    <SelectInput
                        id={`${currentTemplateKey}`}
                        label=''
                        placeholder='Choose Template'
                        value={selectedTemplate.order_confirm}
                        onChange={(val: any) => handleTemplateChange(currentTemplateKey, val)}
                        options={currentVia === 'sms' ? mapTemplatesToOptions(smsTemplate) : mapTemplatesToOptions(emailTemplate)}
                        selectClassName='!w-full'
                    />
                    <QuillInput
                        key={currentTemplateKey}
                        label={`${currentVia == 'sms' ? 'SMS' : 'Email'} Notification Template`}
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

                </div>
                <div className='flex justify-center'>
                    <Button
                        label='Save'
                        onClick={handleSubmit}
                        style={{ padding: '1rem 2rem' }}
                    />
                </div>

            </Modal>
            {contextHolder}
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex flex-col gap-8'>
                        <FormGroup title="Order Notifications" description='Notifications for order confirmation' />
                        <div className='flex flex-col gap-4'>

                            {/* order confirm payment */}
                            <div className='flex flex-col col-span-full border p-8 rounded-xl border-[#E5E7EB]' >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Order Confirmation</h4>
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
                                                <label className='text-md font-semibold'>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_confirm', 'sms')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.smsOrderConfirm}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderConfirm", value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <label className='text-md font-semibold'>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_confirm', 'email')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.emailOrderConfirm}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderConfirm", value)}
                                                    />
                                                </div>

                                            </div>

                                        </div>
                                    </>

                                )}
                            </div>

                            {/* payment receive */}
                            <div className='flex flex-col col-span-full border p-8 rounded-xl border-[#E5E7EB]'  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Payment Received</h4>
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
                                                <label className='text-md font-semibold'>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('payment_receive', 'sms')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.smsPayment}
                                                        onChange={(value) => handleChangeNotifikasi("smsPayment", value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <label className='text-md font-semibold'>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('payment_receive', 'email')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.emailPayment}
                                                        onChange={(value) => handleChangeNotifikasi("emailPayment", value)}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* order processing */}
                            <div className='flex flex-col col-span-full border p-8 rounded-xl border-[#E5E7EB]'  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Order Processing</h4>
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
                                                <label className='text-md font-semibold'>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_processing', 'sms')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.smsOrderProcess}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderProcess", value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <label className='text-md font-semibold'>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_processing', 'email')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.emailOrderProcess}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderProcess", value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/*tracking number */}
                            <div className='flex flex-col col-span-full border p-8 rounded-xl border-[#E5E7EB]'  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Tracking Number</h4>
                                    <div className='flex gap-4'>
                                        <SwitchInput
                                            label='Enable'
                                            checked={trackingNumber}
                                            onChange={(checked) => setTrackingNumber(checked)}
                                        />
                                    </div>
                                </div>
                                {trackingNumber == true && (
                                    <>
                                        <div className='flex flex-col gap-3 mt-4'>
                                            <div className='flex justify-between'>
                                                <label className='text-md font-semibold'>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('tracking_number', 'sms')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.smsTrackingNumber}
                                                        onChange={(value) => handleChangeNotifikasi("smsTrackingNumber", value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <label className='text-md font-semibold'>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('tracking_number', 'email')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.emailTrackingNumber}
                                                        onChange={(value) => handleChangeNotifikasi("emailTrackingNumber", value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* order packed */}
                            <div className='flex flex-col col-span-full border p-8 rounded-xl border-[#E5E7EB]'>
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Order Packed</h4>
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
                                                <label className='text-lg font-semibold'>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_packed', 'sms')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.smsOrderPacked}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderPacked", value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <label className='text-md font-semibold'>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_packed', 'email')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.emailOrderPacked}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderPacked", value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>


                            {/* outof delivery */}
                            <div className='flex flex-col col-span-full border p-8 rounded-xl border-[#E5E7EB]' >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Out of Delivery</h4>
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
                                                <label className='text-md font-semibold'>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('outof_delivery', 'sms')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.smsOutofDelivery}
                                                        onChange={(value) => handleChangeNotifikasi("smsOutofDelivery", value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <label className='text-md font-semibold'>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('outof_delivery', 'email')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.emailOutofDelivery}
                                                        onChange={(value) => handleChangeNotifikasi("emailOutofDelivery", value)}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                )}
                            </div>

                            {/* order shipped */}
                            <div className='flex flex-col col-span-full border p-8 rounded-xl border-[#E5E7EB]' >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Order Shipped</h4>
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
                                                <label className='text-md font-semibold'>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_shipped', 'sms')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.smsOrderShipped}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderShipped", value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <label className='text-md font-semibold'>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_shipped', 'email')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.emailOrderShipped}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderShipped", value)}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                )}
                            </div>

                            {/* order delivered */}
                            <div className='flex flex-col col-span-full border p-8 rounded-xl border-[#E5E7EB]'  >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Order Delivered</h4>
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
                                                <label className='text-md font-semibold'>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_delivered', 'sms')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.smsOrderDelivered}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderDelivered", value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <label className='text-md font-semibold'>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_delivered', 'email')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.emailOrderDelivered}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderDelivered", value)}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                )}
                            </div>


                            {/* order cancelled */}
                            <div className='flex flex-col col-span-full border p-8 rounded-xl border-[#E5E7EB]' >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Order Cancelled</h4>
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
                                                <label className='text-md font-semibold'>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_canceled', 'sms')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.smsOrderCancel}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderCancel", value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <label className='text-md font-semibold'>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_canceled', 'email')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.emailOrderCancel}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderCancel", value)}
                                                    />
                                                </div>

                                            </div>

                                        </div>
                                    </>
                                )}
                            </div>


                            {/* order refund process */}
                            <div className='flex flex-col col-span-full border p-8 rounded-xl border-[#E5E7EB]' >
                                <div className='col-span-full flex justify-between items-center'>
                                    <h4 className='text-lg font-semibold'>Order Refund Processed</h4>
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
                                                <label className='text-md font-semibold'>Via SMS</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_refund', 'sms')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.smsOrderrRefund}
                                                        onChange={(value) => handleChangeNotifikasi("smsOrderrRefund", value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <label className='text-md font-semibold'>Via Email</label>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <Button
                                                            label='Edit'
                                                            onClick={() => handleOpenModal('order_refund', 'email')}
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
                                                    <SwitchInput
                                                        label='Enable'
                                                        checked={notifikasi.emailOrderRefund}
                                                        onChange={(value) => handleChangeNotifikasi("emailOrderRefund", value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                        </div>
                        <FormGroup
                            title="Account Notifications"
                            description='Notifications for account related'
                        >
                            <div className='flex flex-col gap-4'>
                                {/* account regist */}
                                <div className='flex flex-col col-span-full border p-8 rounded-xl border-[#E5E7EB]'  >
                                    <div className='col-span-full flex justify-between items-center'>
                                        <h4 className='text-lg font-semibold'>Account Registration Confirmation</h4>
                                        <div className='flex gap-4'>
                                            <SwitchInput
                                                label='Enable'
                                                checked={accountRegist}
                                                onChange={(checked) => setAccountregist(checked)}
                                            />
                                        </div>
                                    </div>
                                    {accountRegist == true && (
                                        <>
                                            <div className='flex flex-col gap-3 mt-4'>
                                                <div className='flex justify-between'>
                                                    <label className='text-md font-semibold'>Via SMS</label>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='flex items-center gap-3'>
                                                            <Button
                                                                label='Edit'
                                                                onClick={() => handleOpenModal('account_regist', 'sms')}
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
                                                        <SwitchInput
                                                            label='Enable'
                                                            checked={notifikasi.smsAccountRegist}
                                                            onChange={(value) => handleChangeNotifikasi("smsAccountRegist", value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <label className='text-md font-semibold'>Via Email</label>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='flex items-center gap-3'>
                                                            <Button
                                                                label='Edit'
                                                                onClick={() => handleOpenModal('account_regist', 'email')}
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
                                                        <SwitchInput
                                                            label='Enable'
                                                            checked={notifikasi.emailAccountRegist}
                                                            onChange={(value) => handleChangeNotifikasi("emailAccountRegist", value)}
                                                        />
                                                    </div>

                                                </div>

                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* password reset */}
                                <div className='flex flex-col col-span-full border p-8 rounded-xl border-[#E5E7EB]' >
                                    <div className='col-span-full flex justify-between items-center'>
                                        <h4 className='text-lg font-semibold'>Password Reset Request</h4>
                                        <div className='flex gap-4'>
                                            <SwitchInput
                                                label='Enable'
                                                checked={passwordReset}
                                                onChange={(checked) => setPasswordReset(checked)}
                                            />
                                        </div>
                                    </div>
                                    {passwordReset == true && (
                                        <>
                                            <div className='flex flex-col gap-3 mt-4'>
                                                <div className='flex justify-between'>
                                                    <label className='text-md font-semibold'>Via SMS</label>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='flex items-center gap-3'>
                                                            <Button
                                                                label='Edit'
                                                                onClick={() => handleOpenModal('password_reset', 'sms')}
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
                                                        <SwitchInput
                                                            label='Enable'
                                                            checked={notifikasi.smsPasswordReset}
                                                            onChange={(value) => handleChangeNotifikasi("smsPasswordReset", value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <label className='text-md font-semibold'>Via Email</label>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='flex items-center gap-3'>
                                                            <Button
                                                                label='Edit'
                                                                onClick={() => handleOpenModal('password_reset', 'email')}
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
                                                        <SwitchInput
                                                            label='Enable'
                                                            checked={notifikasi.emailPasswordReset}
                                                            onChange={(value) => handleChangeNotifikasi("emailPasswordReset", value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* email verification */}
                                <div className='flex flex-col col-span-full border p-8 rounded-xl border-[#E5E7EB]' >
                                    <div className='col-span-full flex justify-between items-center'>
                                        <h4 className='text-lg font-semibold'>Email Verification</h4>
                                        <div className='flex gap-4'>
                                            <SwitchInput
                                                label='Enable'
                                                checked={emailVerification}
                                                onChange={(checked) => setEmailVerification(checked)}
                                            />
                                        </div>
                                    </div>
                                    {emailVerification == true && (
                                        <>
                                            <div className='flex flex-col gap-3 mt-4'>
                                                <div className='flex justify-between'>
                                                    <label className='text-md font-semibold'>Via SMS</label>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='flex items-center gap-3'>
                                                            <Button
                                                                label='Edit'
                                                                onClick={() => handleOpenModal('email_verification', 'sms')}
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
                                                        <SwitchInput
                                                            label='Enable'
                                                            checked={notifikasi.smsEmailVerification}
                                                            onChange={(value) => handleChangeNotifikasi("smsEmailVerification", value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <label className='text-md font-semibold'>Via Email</label>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='flex items-center gap-3'>
                                                            <Button
                                                                label='Edit'
                                                                onClick={() => handleOpenModal('email_verification', 'email')}
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
                                                        <SwitchInput
                                                            label='Enable'
                                                            checked={notifikasi.emailVerification}
                                                            onChange={(value) => handleChangeNotifikasi("emailVerification", value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                        </FormGroup>

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label='Save Notifications'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default index;
