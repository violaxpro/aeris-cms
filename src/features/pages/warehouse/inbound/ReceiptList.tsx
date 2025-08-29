import React, { useState, useEffect } from 'react'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import Textarea from '@/components/textarea'
import CheckboxInput from '@/components/checkbox';
import ButtonAction from '@/components/button/ButtonIcon';
import { useAtom } from 'jotai';
import { taxSetAtom } from '@/store/DropdownItemStore';
import { getProduct } from '@/services/products-service';
import Image from 'next/image';
import { TrashIcon, TrashIconRed } from '@public/icon';
import Button from '@/components/button'
import Modal from '@/components/modal'
import { CalculatorOutlined } from '@ant-design/icons';
import DatePickerInput from '@/components/date-picker';
import dayjs from 'dayjs'

export interface ReceiptListType {
    // invoice_id: string
    // product_id: string
    sku: string
    grn_number: string
    date: string
    receiver: string
    discrepancies: string
    qty_receipts: number
    qty_remaining: number
}


export interface NewProductType {
    sku: string
    name: string
    price: number
    buy_price: number
    short_desc: string
}

interface ReceiptListProps {
    productForm: ReceiptListType
    onChange: (form: ReceiptListType) => void;
    onRemove?: () => void;
    index: number;
    length?: number
    taxType?: string
    inboundStatus?: any
}

const ReceiptList = ({
    productForm,
    onRemove,
    onChange,
    length,
    taxType,
    inboundStatus
}: ReceiptListProps) => {
    const isNoDraftSent = inboundStatus !== 'Draft' && inboundStatus !== 'Sent'
    const [optionsTax] = useAtom(taxSetAtom)
    const [items, setItems] = useState([])
    const [buyPriceHidden, setBuyPriceHidden] = useState(true)
    const [profitHidden, setprofitHidden] = useState(true)
    const [taxError, setTaxError] = useState('');
    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState<'product' | 'service' | null>(null)
    const [newProduct, setNewProduct] = useState({
        sku: '',
        name: '',
        short_desc: '',
        price: 0,
        buy_price: 0,
        trade: 0,
        silver: 0,
        gold: 0,
        platinum: 0,
        diamond: 0,
    })
    const handleProductChange = (e: any) => {
        const { id, value } = e.target;

        let updatedProductForm = {
            ...productForm,
            [id]: value
        };

        onChange(updatedProductForm);
    };

    // Tambahin function di dalam ReceiptList
    const handleDateChange = (id: string, value: any, dateString: string) => {
        const updatedProductForm = {
            ...productForm,
            [id]: dateString, // atau value.format('YYYY-MM-DD') kalau mau lebih konsisten
        };

        onChange(updatedProductForm);
    };


    const handleNewProduct = (e: any) => {
        const { id, value } = e.target;

        if (id === 'name') {
            newProduct.short_desc = value
        }

        let newProductForm = {
            ...newProduct,
            [id]: value
        };
        setNewProduct(newProductForm)
    };

    const handleChangeSelect = (id: string, value: any) => {
        let updatedProductForm = {
            ...productForm,
            [id]: value
        };

        onChange(updatedProductForm);
    };

    const handleSelectProduct = (productName: string) => {
        const selected: any = items.find((p: any) => p.name === productName);
        if (selected) {
            const updatedForm = {
                ...productForm,
                name: selected.name,
                sku: selected.sku,
                price: selected.price,
            };
            onChange(updatedForm);
        }
    };

    console.log(items)

    const handleOpenModal = (type: 'product' | 'service') => {
        setModalType(type)
        setOpenModal(true)
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProduct()
                if (res.data) {
                    const data = res.data
                    setItems(
                        data.map((item: any) => ({
                            label: item.sku,
                            value: item.sku,
                            data: item
                        }))
                    )
                }

            } catch (error) {
                console.error(error)
            }
        }

        fetchData()

    }, [])

    const getGridCols = (status: string) => {
        switch (status) {
            case "Draft":
            case "Sent":
                return "md:grid-cols-[2fr_2fr_repeat(3,1fr)_50px]";
            case "Partially Received":
                return "md:grid-cols-[2fr_repeat(6,1fr)_50px]";
            case "Received":
                return "md:grid-cols-[2fr_repeat(6,1fr)_50px]";
            default:
                return "md:grid-cols-[2fr_2fr_repeat(5,1fr)_50px]";
        }
    };


    return (
        <div className='flex flex-col gap-4'>
            <div className={`grid ${getGridCols(inboundStatus)} grid-cols-2 md:gap-4 gap-6 mb-2`}>
                <SelectInput
                    id='sku'
                    label='SKU'
                    value={productForm.sku}
                    onChange={(val) => handleChangeSelect('sku', val)}
                    options={items}
                    placeholder='Search or select SKU'
                    required
                />
                <Input
                    id='grn_number'
                    type='text'
                    label='GRN Number'
                    value={productForm.grn_number}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                />
                <DatePickerInput
                    id='date'
                    label='Date'
                    value={productForm.date ? dayjs(productForm.date, 'DD-MM-YYYY') : null}
                    onChange={(value: any, dateString: any) => handleDateChange('date', value, dateString)}
                />
                <Input
                    id='receiver'
                    type='text'
                    label='Receiver'
                    value={productForm.receiver}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                />
                <Input
                    id='discrepancies'
                    type='text'
                    label='Discrepancies'
                    value={productForm.discrepancies}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                />

                <Input
                    id='qty_receipts'
                    type='text'
                    label='QTY Receipts'
                    value={productForm.qty_receipts}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                />
                <Input
                    id='qty_remaining'
                    type='text'
                    label='QTY Remaining'
                    value={productForm.qty_remaining}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                />



                {
                    onRemove && <div className='flex item-ends justify-center mt-4 '>
                        {
                            length && length <= 1 ?
                                <ButtonAction
                                    icon={TrashIcon}
                                    width={20}
                                    height={20}
                                    className='btn-trash-item !h-10 !w-15'
                                /> :
                                <ButtonAction
                                    color='danger'
                                    variant='filled'
                                    size="small"
                                    icon={TrashIconRed}
                                    width={15}
                                    height={15}
                                    className='!h-10 !w-15'
                                    onClick={onRemove}
                                />
                        }

                    </div>
                }
            </div>
        </div >

    )
}

export default ReceiptList
