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

const FormBranchManagement: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
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
        warehouse_code: initialValues ? initialValues.warehouse_code : '',
        warehouse_name: initialValues ? initialValues.warehouse_name : '',
        address: initialValues ? initialValues.address : '',
        phone_number: initialValues ? initialValues.phone_number : '',
        email: initialValues ? initialValues.email : '',
        default_fullfillment: initialValues ? initialValues.default_fullfillment : false,
        zones: [{
            code: '',
            name: '',
            type: '',
            bins: []
        }],
        carrier: initialValues ? initialValues.carrier : '',
        account_number: initialValues ? initialValues.account_number : '',
        service: initialValues ? initialValues.service : '',
        cut_off_time: initialValues ? initialValues.cut_off_time : '',
    });

    const breadcrumb = [
        {
            title: 'Warehouse',
        },
        {
            title: 'Branch Managements', url: routes.eCommerce.warehouseBranchList,
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },

    ]


    const addItem = () => {
        const newZone = {
            code: '',
            name: '',
            type: '',
            bins: [] // kosong dulu
        };

        setFormData((prev: any) => ({
            ...prev,
            zones: [...prev.zones, newZone],
        }));
    };

    const addBin = (zoneIndex: number) => {
        const newBin = {
            code: '',
            name: '',
            pick_sequence: '',
            pickable: true,
            putawayable: true,
            units: 0,
            volume: 0,
            weight: 0
        };

        setFormData((prev: any) => {
            const updatedZones = [...prev.zones];
            const currentBins = updatedZones[zoneIndex].bins || [];

            updatedZones[zoneIndex] = {
                ...updatedZones[zoneIndex],
                bins: [...currentBins, newBin],
            };

            return { ...prev, zones: updatedZones };
        });
    };

    const removeBin = (zoneIndex: number, binIndex: number) => {
        setFormData((prev: any) => {
            const updatedZones = [...prev.zones];
            updatedZones[zoneIndex].bins.splice(binIndex, 1);
            return { ...prev, zones: updatedZones };
        });
    };

    const updateBin = (zoneIndex: number, binIndex: number, field: string, value: any) => {
        setFormData((prev: any) => {
            const updatedZones = [...prev.zones];
            const updatedBins = [...updatedZones[zoneIndex].bins];
            updatedBins[binIndex] = { ...updatedBins[binIndex], [field]: value };
            updatedZones[zoneIndex].bins = updatedBins;
            return { ...prev, zones: updatedZones };
        });
    };


    const handleRemoveRow = (index: number) => {
        setFormData((prev: any) => {
            const updatedItems = [...prev.zones];
            updatedItems.splice(index, 1);
            return {
                ...prev,
                zones: updatedItems,
            };
        });
    };

    const handleUpdateRow = (index: number, fieldName: any, value: any) => {
        setFormData((prev) => {
            const updatedItems = [...prev.zones];
            updatedItems[index] = {
                ...updatedItems[index],
                [fieldName]: value
            }
            return {
                ...prev,
                zones: updatedItems,
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
                    {mode == 'create' ? 'Create Branch Management' : 'Edit Branch Management'}
                </h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex flex-col gap-5'>
                        <div className={`grid gap-3 md:grid-cols-2`}>
                            <Input
                                id='warehouse_name'
                                label='Warehouse Name'
                                type='text'
                                value={formData.warehouse_name}
                                onChange={handleChange('warehouse_name')}
                                placeholder='Input Warehouse Name'
                            />
                            <Input
                                id='warehouse_code'
                                label='Warehouse Code'
                                type='text'
                                value={formData.warehouse_code}
                                onChange={handleChange('warehouse_code')}
                                placeholder='Input Warehouse Code'
                            />
                            <div className='grid md:grid-cols-2 gap-3'>
                                <Input
                                    id='phone_number'
                                    label='Phone Number'
                                    type='text'
                                    value={formData.phone_number}
                                    onChange={handleChange('phone_number')}
                                    placeholder='Input Phone Number'
                                />
                                <Input
                                    id='email'
                                    label='Email'
                                    type='text'
                                    value={formData.email}
                                    onChange={handleChange('email')}
                                    placeholder='Input Email'
                                />
                                <CheckboxInput
                                    label='Default Fullfillment'
                                    checked={formData.default_fullfillment}
                                    onChange={handleChange('default_fullfillment')}
                                    text='Default Fullfillment'
                                />
                            </div>
                            <div className='row-span-2'>
                                <Textarea
                                    id='address'
                                    label='Address'
                                    value={formData.address}
                                    onChange={handleChange('address')}
                                    placeholder='Input Address'
                                    textareaClassname='!h-30'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 my-5'>
                        <h1 className='text-xl font-semibold'>Zones & Bins</h1>
                        <Divider />
                        <div className='flex flex-col gap-3'>
                            {
                                formData.zones.map((item: any, index: number) => {
                                    return (
                                        <div className='grid gap-3 rounded-xl border border-[#E5E7EB] p-4'>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-xl font-semibold'>Zone & Bin {index + 1}</span>
                                                <ButtonIcon
                                                    icon={CancelGreyIcon}
                                                    shape='circle'
                                                    variant='filled'
                                                    color='default'
                                                    onClick={() => handleRemoveRow(index)}
                                                />
                                            </div>
                                            <div
                                                key={index}
                                                className='grid md:grid-cols-[repeat(3,1fr)_150px] gap-2 items-center'
                                            >
                                                <Input
                                                    id='code'
                                                    label='Zone Code'
                                                    type='text'
                                                    value={item.code}
                                                    onChange={(e) => handleUpdateRow(index, 'code', e.target.value)}
                                                />
                                                <Input
                                                    id='name'
                                                    label='Zone Name'
                                                    type='text'
                                                    value={item.name}
                                                    onChange={(e) => handleUpdateRow(index, 'name', e.target.value)}
                                                />
                                                <SelectInput
                                                    id='type'
                                                    label='Type'
                                                    value={item.type}
                                                    onChange={(selected) => handleUpdateRow(index, 'type', selected)}
                                                    options={[
                                                        { label: 'Fast', value: 'Fast' },
                                                        { label: 'Bulk', value: 'Bulk' },
                                                        { label: 'Cold', value: 'Cold' },
                                                        { label: 'Returns', value: 'Returns' },
                                                        { label: 'Quarantine', value: 'Quarantine' },
                                                    ]}
                                                />
                                                <div className='flex gap-2 pt-5'>
                                                    <Button
                                                        label='Add Bin'
                                                        icon={<Image
                                                            src={PlusOutlineIcon}
                                                            alt='plus-icon'
                                                            width={15}
                                                            height={15}
                                                        />}
                                                        onClick={() => addBin(index)}
                                                        hasWidth='w-full'
                                                    />
                                                    {/* <ButtonIcon
                                                        color='danger'
                                                        variant='filled'
                                                        size="small"
                                                        icon={TrashIconRed}
                                                        width={15}
                                                        height={15}
                                                        className='!h-10 !w-15'
                                                        onClick={() => handleRemoveRow(index)}
                                                    /> */}
                                                </div>
                                                {
                                                    item?.bins?.map((bin: any, binIndex: number) => (
                                                        <div
                                                            key={binIndex}
                                                            className='col-span-full grid md:grid-cols-[1fr_2fr_repeat(3,1fr)_repeat(3,100px)_50px] gap-2 items-center'
                                                        >
                                                            <Input
                                                                id='code'
                                                                label='Bin Code'
                                                                type='text'
                                                                value={bin.code}
                                                                onChange={(e) => updateBin(index, binIndex, 'code', e.target.value)}
                                                            />
                                                            <Input
                                                                id='name'
                                                                label='Bin Name'
                                                                type='text'
                                                                value={bin.name}
                                                                onChange={(e) => updateBin(index, binIndex, 'name', e.target.value)}
                                                            />
                                                            <Input
                                                                id='pick_sequence'
                                                                label='Pick Sequence'
                                                                type='text'
                                                                value={bin.pick_sequence}
                                                                onChange={(e) => updateBin(index, binIndex, 'pick_sequence', e.target.value)}
                                                            />
                                                            <CheckboxInput
                                                                label='Pickable'
                                                                checked={bin.pickable}
                                                                onChange={(checked) => updateBin(index, binIndex, 'pickable', checked)}
                                                                text='Enable'
                                                            />
                                                            <CheckboxInput
                                                                label='Putawayable'
                                                                checked={bin.putawayable}
                                                                onChange={(checked) => updateBin(index, binIndex, 'putawayable', checked)}
                                                                text='Enable'
                                                            />
                                                            <Input
                                                                id='units'
                                                                label='Units'
                                                                type='number'
                                                                value={bin.units}
                                                                onChange={(e) => updateBin(index, binIndex, 'units', e.target.value)}
                                                            />
                                                            <Input
                                                                id='volume'
                                                                label='Volume'
                                                                type='text'
                                                                value={bin.volume}
                                                                onChange={(e) => updateBin(index, binIndex, 'volume', e.target.value)}
                                                            />
                                                            <Input
                                                                id='weight'
                                                                label='Weight'
                                                                type='text'
                                                                value={bin.weight}
                                                                onChange={(e) => updateBin(index, binIndex, 'weight', e.target.value)}
                                                            />
                                                            <div className='flex gap-2 pt-5'>
                                                                <ButtonIcon
                                                                    color='danger'
                                                                    variant='filled'
                                                                    size="small"
                                                                    icon={TrashIconRed}
                                                                    width={15}
                                                                    height={15}
                                                                    className='!h-10 !w-15'
                                                                    onClick={() => removeBin(index, binIndex)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Divider />
                        <div className='flex justify-end'>
                            <Button
                                label='Add Zone'
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
                    <div className='grid md:grid-cols-4 gap-3 my-5'>
                        <SelectInput
                            id='carrier'
                            label='Carrier'
                            placeholder='Select Carrier'
                            onChange={(val) => handleChangeSelect('carrier', val)}
                            value={formData.carrier}
                            options={[
                                { label: 'Australian Express', value: '1' },
                            ]}
                        />
                        <Input
                            id='account_number'
                            label='Account Number'
                            type='text'
                            value={formData.account_number}
                            onChange={handleChange('account_number')}
                            placeholder='Input Account Number'
                        />
                        <SelectInput
                            id='service'
                            label='Service'
                            value={formData.service}
                            placeholder='Input Service'
                            onChange={(val) => handleChangeSelect('service', val)}
                            options={[
                                { label: 'Reguler', value: 'Reguler' },
                            ]}
                        />
                        <Input
                            id='cut_off_time'
                            label='Cut Off Time'
                            type='text'
                            value={formData.cut_off_time}
                            onChange={handleChange('cut_off_time')}
                            placeholder='Input Cut Off Time'
                        />

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode == 'create' ? 'Create Branch Management' : 'Edit Branch Management'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormBranchManagement;
