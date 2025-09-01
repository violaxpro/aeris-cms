'use client'
import React, { useState, useEffect } from 'react';
import type { TableColumnsType } from 'antd'
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form';
import Input from "@/components/input"
import Textarea from '@/components/textarea'
import FileUploader from '@/components/input-file';
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import { routes } from '@/config/routes';
import Table from '@/components/table'
import { useNotificationAntd } from '@/components/toast';
import { getSupplier } from '@/services/supplier-list-service';
import DatePickerInput from '@/components/date-picker';
import dayjs from 'dayjs'
import Divider from '@/components/divider'
import { PlusOutlineIcon, TrashIcon, TrashIconRed } from '@public/icon';
import Image from 'next/image';
import { uploadImages } from '@/services/upload-images';
import { supplierSetAtom } from '@/store/DropdownItemStore';
import ReceiptList, { ReceiptListType } from '../inbound/ReceiptList';
import DateRangePicker from '@/components/date-picker/DateRangePicker';
import ButtonIcon from '@/components/button/ButtonIcon';
// import ReturnProductList, { ReturnProductListType } from './ReturnProductList';

const FormReportingAnalytics: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const showContactDetails = ['Requested', 'Authorized', 'Closed'].includes(initialValues?.status)
    const [isLoading, setIsLoading] = useState(false)
    const [optionSupplier, setOptionSupplier] = useState([])
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [date, setDate] = useState<any | null>(null);
    const [productList, setProductList] = useState<any[]>([]);
    const [productForm, setProductForm] = useState([{
        sku: '',
        uom: '',
        qty: 0,
        price: 0,
        serial: '',
    }]);
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        report_name: initialValues ? initialValues.report_name : '',
        report_type: initialValues ? initialValues.report_type : '',
        sku: initialValues ? initialValues.sku : '',
        warehouse: initialValues ? initialValues.warehouse : '',
        date_range: initialValues ? initialValues.date_range : '',
        columns: [{
            value: ''
        }],
        status: initialValues ? initialValues.status : '',
        schedule: initialValues ? initialValues.schedule : '',
        recipient: initialValues ? initialValues.recipient : '',
        visibility: initialValues ? initialValues.visibility : '',
    });

    const breadcrumb = [
        {
            title: 'Warehouse',
        },
        {
            title: 'Reporting & Analytics', url: routes.eCommerce.reportingAnalytics,
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },

    ]


    const addItem = () => {
        const newItem: any = {
            value: ''
        };

        setFormData((prev: any) => ({
            ...prev,
            columns: [...prev.columns, newItem],
        }));
    };

    const handleRemoveRow = (index: number) => {
        setFormData((prev: any) => {
            const updatedItems = [...prev.columns];
            updatedItems.splice(index, 1);
            return {
                ...prev,
                columns: updatedItems,
            };
        });
    };

    const handleUpdateRow = (index: number, updatedForm: any) => {
        setFormData((prev) => {
            const updatedItems = [...prev.columns];
            updatedItems[index] = updatedForm;
            return {
                ...prev,
                columns: updatedItems,
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

    const handleDateChange = (field: string, dateString: [string, string]) => {
        setFormData(prev => ({
            ...prev,
            [field]: dateString,
        }));
    };

    const handleSuccess = async (file: any) => {
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('image', file);          // field harus sama dengan API
            formData.append('path_name', 'product');
            const res = await uploadImages(formData)
            if (res.success == true) {
                const images = [{
                    name: file.name,
                    url: res?.data?.public_url,
                    default: true,
                    alt_image: file.name
                }]

                const updated: any = { ...formData, images: images, }
                setFormData(updated);
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    };

    const handleError = (file: any) => {
        console.error('Failed to upload:', file);
    };

    const handleSubmit = async () => {
        try {
            // const submitData = {

            //     supplier: formData.supplier,
            //     notes: formData.notes,
            // }
            // console.log(submitData)
            // localStorage.setItem('products', JSON.stringify(submitData))
            // router.push(routes.eCommerce.order)
            // let response;
            // response = await updatePriceLevel(slug, submitData)

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

    const optionsPaymentMethod = [
        { label: 'Bank Transfer', value: 'Bank Transfer' },
        // { label: 'Credit Card', value: 'Credit Card' },
        // { label: 'Debit Card', value: 'Debit Card' },
        { label: 'Cheque', value: 'Cheque' },
        { label: 'Gateway', value: 'Gateway' },
        // { label: 'Paypal', value: 'Paypal' },
        // { label: 'Cash', value: 'Cash' },
    ]

    const optionsDeliveryMethod = [
        { label: 'Dropship', value: 'Dropship' },
        { label: 'Ship to Warehouse', value: 'Ship to Warehouse' },
    ]

    // useEffect(() => {
    //     const newSubtotal = productList.reduce((acc, item) => acc + Number(item.total || 0), 0);
    //     const discount = Number(formData.discount || 0)
    //     const shipping_fee = Number(formData.shipping_fee || 0)
    //     const tax = Number(formData.gst || 0)
    //     const total = newSubtotal - discount + shipping_fee + tax
    //     setFormData(prev => ({
    //         ...prev,
    //         subtotal: newSubtotal.toString(),
    //         total: total.toString()
    //     }));
    // }, [productList, formData.discount, formData.shipping_fee, formData.gst]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getSupplier()

                const suppliers = res.data.map((sup: any) => ({
                    label: sup.name,
                    value: sup.id
                }))
                setOptionSupplier(suppliers)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()

    }, [])

    console.log(initialValues)


    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">
                    {mode == 'create' ? 'Create Reporting & Analytics' : 'Edit Reporting & Analytics'}
                </h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex flex-col gap-5'>
                        <div className={`grid gap-3 md:grid-cols-2`}>
                            <Input
                                id='report_name'
                                label='Report Name'
                                type='text'
                                value={formData.report_name}
                                onChange={handleChange}
                                placeholder='Input Report Name'
                            />
                            <SelectInput
                                id='report_type'
                                label='Report Type'
                                placeholder='Select Report Type'
                                onChange={(val) => handleChangeSelect('report_type', val)}
                                value={formData.report_type}
                                options={[
                                    { label: 'Inventory', value: 'Inventory' },
                                    { label: 'Valuation', value: 'Valuation' },
                                    { label: 'KPI', value: 'KPI' },
                                    { label: 'Discrepancy', value: 'Discrepancy' },
                                ]}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 my-5'>
                        <h1 className='text-xl font-semibold'>Filter</h1>
                        <Divider />
                        <div className='grid md:grid-cols-4 gap-3'>
                            <Input
                                id='sku'
                                label='SKU'
                                type='text'
                                value={formData.sku}
                                onChange={handleChange}
                                placeholder='Input SKU'
                            />
                            <SelectInput
                                id='warehouse'
                                label='Warehouse'
                                placeholder='Select Warehouse'
                                onChange={(val) => handleChangeSelect('warehouse', val)}
                                value={formData.warehouse}
                                options={[
                                    { label: 'Seadan', value: 1 }
                                ]}
                            />
                            <DateRangePicker
                                id='date_range'
                                label='Date Range'
                                value={
                                    formData.date_range
                                        ? [dayjs(formData.date_range[0]), dayjs(formData.date_range[1])]
                                        : null
                                }
                                onChange={(dateString: any) => handleDateChange('date_range', dateString)}
                                placeholder='Select Date Range'
                            // required
                            />
                            <SelectInput
                                id='status'
                                label='Status'
                                placeholder='Select Status'
                                onChange={(val) => handleChangeSelect('status', val)}
                                value={formData.status}
                                options={[
                                    { label: 'Draft', value: 'Draft' },
                                    { label: 'Published', value: 'Published' },
                                    { label: 'Archived', value: 'Archived' },
                                ]}
                            />

                        </div>
                    </div>
                    <div className='flex flex-col gap-3 my-5'>
                        <h1 className='text-xl font-semibold'>Columns / Metrics</h1>
                        <Divider />
                        <div className='grid md:grid-cols-5 gap-3'>
                            {
                                formData.columns.map((item: any, index: number) => {
                                    return (
                                        <div key={index} className='flex gap-2 items-center'>
                                            <Input
                                                id='item'
                                                label={`Column ${index + 1}`}
                                                type='text'
                                                value={item.value}
                                                onChange={(updateItem) => handleUpdateRow(index, updateItem)}
                                            />
                                            <div className='pt-5'>
                                                <ButtonIcon
                                                    color='danger'
                                                    variant='filled'
                                                    size="small"
                                                    icon={TrashIconRed}
                                                    width={15}
                                                    height={15}
                                                    className='!h-10 !w-15'
                                                    onClick={() => handleRemoveRow(index)}
                                                />
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='flex justify-end'>
                            <Button
                                label='Add Column'
                                icon={<Image
                                    src={PlusOutlineIcon}
                                    alt='plus-icon'
                                    width={15}
                                    height={15}
                                />}
                                onClick={addItem}
                            />
                        </div>
                    </div>
                    <div className='grid md:grid-cols-3 gap-3 my-5'>
                        <SelectInput
                            id='schedule'
                            label='Schedule'
                            placeholder='Select Schedule'
                            onChange={(val) => handleChangeSelect('schedule', val)}
                            value={formData.schedule}
                            options={[
                                { label: 'None', value: 'None' },
                                { label: 'Daily', value: 'Daily' },
                                { label: 'Weekly', value: 'Weekly' },
                                { label: 'Monthly', value: 'Monthly' },
                            ]}
                        />
                        <Input
                            id='recipient'
                            label='Recipient'
                            type='text'
                            value={formData.recipient}
                            onChange={handleChange}
                            placeholder='Input Recipient'
                        />
                        <SelectInput
                            id='visibility'
                            label='Visibility'
                            value={formData.visibility}
                            placeholder='Input Visibility'
                            onChange={(val) => handleChangeSelect('visibility', val)}
                            options={[
                                { label: 'Private', value: 'Private' },
                                { label: 'Team', value: 'Team' },
                                { label: 'Org', value: 'Org' },
                            ]}
                        />


                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode == 'create' ? 'Create Report' : 'Edit Report'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormReportingAnalytics;
