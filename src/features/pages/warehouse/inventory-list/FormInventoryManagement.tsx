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
import { PlusOutlineIcon, TrashIcon, TrashIconRed, CancelGreyIcon } from '@public/icon';
import Image from 'next/image';
import { uploadImages } from '@/services/upload-images';
import { supplierSetAtom } from '@/store/DropdownItemStore';
import ReceiptList, { ReceiptListType } from '../inbound/ReceiptList';
import DateRangePicker from '@/components/date-picker/DateRangePicker';
import ButtonIcon from '@/components/button/ButtonIcon';
// import ReturnProductList, { ReturnProductListType } from './ReturnProductList';

const FormInventoryManagement: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
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
        sku: initialValues ? initialValues.sku : '',
        warehouse: initialValues ? initialValues.warehouse : '',
        zone: initialValues ? initialValues.zone : '',
        bin: initialValues ? initialValues.bin : '',
        opening_qty: initialValues ? initialValues.opening_qty : '',
        reason_code: initialValues ? initialValues.reason_code : '',
        email: initialValues ? initialValues.email : '',
        default_fullfillment: initialValues ? initialValues.default_fullfillment : false,
        serials: [{ lots_serials: '', status: '' }],
        notes: initialValues ? initialValues.notes : '',
        reorder_point: initialValues ? initialValues.reorder_point : '',
        reorder_qty: initialValues ? initialValues.reorder_qty : '',
        preferred_supplier: initialValues ? initialValues.preferred_supplier : '',
        uom: initialValues ? initialValues.uom : '',
        barcodes: initialValues ? initialValues.barcodes : [],
        movement_qty: initialValues ? initialValues.movement_qty : '',
        movement_reason_code: initialValues ? initialValues.movement_reason_code : '',
        is_need_approved: initialValues ? initialValues.is_need_approved : false,

    });

    const breadcrumb = [
        {
            title: 'Warehouse',
        },
        {
            title: 'Inventory Managements', url: routes.eCommerce.inventoryList,
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },

    ]


    const addItem = () => {
        const newItem = { lots_serials: '', status: '' };

        setFormData((prev: any) => ({
            ...prev,
            serials: [...prev.serials, newItem],
        }));
    };


    const handleRemoveRow = (index: number) => {
        setFormData((prev: any) => {
            const updatedItems = [...prev.serials];
            updatedItems.splice(index, 1);
            return {
                ...prev,
                serials: updatedItems,
            };
        });
    };

    const handleUpdateRow = (index: number, fieldName: any, value: any) => {
        setFormData((prev) => {
            const updatedItems = [...prev.serials];
            updatedItems[index] = {
                ...updatedItems[index],
                [fieldName]: value
            }
            return {
                ...prev,
                serials: updatedItems,
            };
        });
    };

    const handleChange = (field: string) => (
        e: any
    ) => {
        let value;

        // Kalau boolean (checkbox)
        if (typeof e === 'boolean') {
            value = e;
        }
        // Kalau event dari checkbox native
        else if (e?.target?.type === 'checkbox') {
            value = e.target.checked;
        }
        // Kalau string atau array langsung pakai
        else if (typeof e === 'string' || Array.isArray(e)) {
            value = e;
        }
        // Input biasa (text/number)
        else {
            value = e.target.value;
        }

        setFormData((prev) => ({
            ...prev,
            [field]: value,
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

    console.log(formData)


    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">
                    {mode == 'create' ? 'Create Inventory Management' : 'Edit Inventory Management'}
                </h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex flex-col gap-5'>
                        <div className={`grid gap-3 md:grid-cols-3`}>
                            <SelectInput
                                id='sku'
                                label='SKU'
                                placeholder='Select SKU'
                                onChange={(val) => handleChangeSelect('sku', val)}
                                value={formData.sku}
                                options={[
                                    { label: 'SKU-0316734', value: '1' },
                                ]}
                            />
                            <SelectInput
                                id='warehouse'
                                label='Warehouse'
                                placeholder='Select Warehouse'
                                onChange={(val) => handleChangeSelect('warehouse', val)}
                                value={formData.warehouse}
                                options={[
                                    { label: 'Seadan Pranatta', value: '1' },
                                ]}
                            />
                            <SelectInput
                                id='zone'
                                label='Zone'
                                placeholder='Select Zone'
                                onChange={(val) => handleChangeSelect('zone', val)}
                                value={formData.zone}
                                options={[
                                    { label: 'ZONE-109', value: '1' },
                                ]}
                            />
                            <SelectInput
                                id='bin'
                                label='Bin'
                                placeholder='Select Bin'
                                onChange={(val) => handleChangeSelect('bin', val)}
                                value={formData.bin}
                                options={[
                                    { label: 'BIN-109', value: '1' },
                                ]}
                            />
                            <Input
                                id='opening_qty'
                                label='Opening QTY (+/-)'
                                type='text'
                                value={formData.opening_qty}
                                onChange={handleChange('opening_qty')}
                                placeholder='Input Opening QTY (+/-)'
                            />
                            <SelectInput
                                id='reason_code'
                                label='Reason Code'
                                value={formData.reason_code}
                                placeholder='Input Reason Code'
                                onChange={(val) => handleChangeSelect('reason_code', val)}
                                options={[
                                    { label: 'Adjustment Opening', value: 'Adjustment Opening' },
                                    { label: 'Init', value: 'Init' },
                                ]}
                            />

                        </div>
                    </div>
                    <div className='flex flex-col gap-5 my-5'>
                        <h1 className='text-xl font-semibold'>Lots / Serials</h1>
                        <Divider />
                        <div className='flex flex-col gap-3'>
                            {
                                formData.serials.map((item: any, index: number) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`grid ${mode == 'edit' ? 'md:grid-cols-[repeat(2,1fr)_50px]' : 'md:grid-cols-[1fr_50px]'} gap-2 items-center`}
                                        >
                                            <Input
                                                id='lots_serials'
                                                label='Lots/Serials'
                                                type='text'
                                                value={item.lots_serials}
                                                onChange={(e) => handleUpdateRow(index, 'lots_serials', e.target.value)}
                                            />
                                            {
                                                mode == 'edit' &&
                                                <SelectInput
                                                    id='status'
                                                    label='Status'
                                                    value={item.status}
                                                    onChange={(selected) => handleUpdateRow(index, 'status', selected)}
                                                    options={[
                                                        { label: 'Active', value: 'Active' },
                                                        { label: 'Hold', value: 'Hold' },
                                                        { label: 'Quarantine', value: 'Quarantine' },
                                                        { label: 'Released', value: 'Released' },
                                                        { label: 'Audit', value: 'Audit' },
                                                    ]}
                                                />
                                            }

                                            <div className='flex gap-2 pt-5'>
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
                        <Divider />
                        <div className='flex justify-end'>
                            <Button
                                label='Add Lot / Serial'
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
                    {
                        mode == 'edit' &&
                        <div className='grid md:grid-cols-4 gap-3'>
                            <Input
                                id='reorder_point'
                                label='Reorder Point'
                                type='text'
                                value={formData.reorder_point}
                                onChange={handleChange('reorder_point')}
                                placeholder='Reorder Point'
                            />
                            <Input
                                id='reorder_qty'
                                label='Reorder QTY'
                                type='text'
                                value={formData.reorder_qty}
                                onChange={handleChange('reorder_qty')}
                                placeholder='Reorder QTY'
                            />
                            <SelectInput
                                id='preferred_supplier'
                                label='Preferred Supplier'
                                value={formData.preferred_supplier}
                                placeholder='Input Preferred Supplier'
                                onChange={(val) => handleChangeSelect('preferred_supplier', val)}
                                options={[
                                    { label: 'Supplier A', value: '1' },
                                ]}
                            />
                            <Input
                                id='uom'
                                label='UoM'
                                type='text'
                                value={formData.uom}
                                onChange={handleChange('uom')}
                                placeholder='UoM'
                            />
                            <div className='col-span-full'>
                                <SelectInput
                                    id='barcodes'
                                    label='Barcodes'
                                    value={formData.barcodes}
                                    placeholder='Input Barcodes'
                                    onChange={(val) => handleChangeSelect('barcodes', val)}
                                    modeType='multiple'
                                    options={[
                                        { label: 'Barcode A', value: '1' },
                                        { label: 'Barcode B', value: '2' },
                                    ]}
                                />
                            </div>
                            <div className='col-span-full flex flex-col gap-2 my-2'>
                                <h1 className='text-xl font-semibold'>Manual Movements</h1>
                                <Divider />
                                <div className='grid md:grid-cols-3 gap-3'>
                                    <Input
                                        id='movement_qty'
                                        label='Movement QTY (+/-)'
                                        type='text'
                                        value={formData.movement_qty}
                                        onChange={handleChange('movement_qty')}
                                        placeholder='Input Movement QTY (+/-)'
                                    />
                                    <SelectInput
                                        id='movement_reason_code'
                                        label='Reason Code'
                                        value={formData.movement_reason_code}
                                        placeholder='Input Reason Code'
                                        onChange={(val) => handleChangeSelect('movement_reason_code', val)}
                                        options={[
                                            { label: 'Damage', value: '1' },
                                        ]}
                                    />
                                    <CheckboxInput
                                        label='Default Fullfillment'
                                        checked={formData.default_fullfillment}
                                        onChange={handleChange('default_fullfillment')}
                                        text='Default Fullfillment'
                                    />
                                </div>
                            </div>

                        </div>
                    }
                    <div className='grid gap-3 my-5'>
                        <Textarea
                            id='notes'
                            label='Notes'
                            value={formData.notes}
                            onChange={handleChange('notes')}
                            placeholder='Input Notes'
                            textareaClassname='!h-30'
                        />

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode == 'create' ? 'Create Inventory Management' : 'Edit Inventory Management'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormInventoryManagement;
