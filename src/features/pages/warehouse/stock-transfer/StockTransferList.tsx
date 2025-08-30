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
export interface StockTransferListType {
    // invoice_id: string
    // product_id: string
    sku: string
    qty: number
    from_bin?: string
    to_bin?: string
    picked_qty?: string
    variance_reason?: string
    receive_qty?: string
}


export interface NewProductType {
    sku: string
    name: string
    price: number
    buy_price: number
    short_desc: string
}

interface StockTransferListProps {
    productForm: StockTransferListType
    onChange: (form: StockTransferListType) => void;
    onRemove?: () => void;
    index: number;
    length?: number
    taxType?: string
    status?: any
    formMode?: string
}

const StockTransferList = ({
    productForm,
    onRemove,
    onChange,
    length,
    taxType,
    status,
    formMode
}: StockTransferListProps) => {
    const allowedStatuses = [
        'Picking',
        'In Transit',
        'Received',
        'Cancelled'
    ]
    const isShow = allowedStatuses.includes(status)
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
                return "md:grid-cols-[2fr_100px_repeat(2,1fr)_50px]"
            case "Approved":
                return "md:grid-cols-[2fr_100px_repeat(2,1fr)_50px]";
            case "Picking":
                return "md:grid-cols-[2fr_100px_repeat(4,1fr)_50px]";
            case "In Transit":
                return "md:grid-cols-[2fr_100px_repeat(4,1fr)_50px]";
            case "Received":
                return "md:grid-cols-[2fr_100px_repeat(5,1fr)_50px]";
            case "Cancelled":
                return "md:grid-cols-[2fr_100px_repeat(5,1fr)_50px]";
            default:
                return "md:grid-cols-[2fr_100px_repeat(2,1fr)_50px]";
        }
    };


    return (
        <div className='flex flex-col gap-4'>
            <div className={`grid ${getGridCols(status)} grid-cols-2 md:gap-4 gap-6 mb-2`}>
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
                    id='qty'
                    type='text'
                    label='QTY'
                    value={productForm.qty}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                />
                <SelectInput
                    id='from_bin'
                    label='From Bin (Optional)'
                    value={productForm.from_bin}
                    onChange={handleProductChange}
                    options={[
                        { label: 'BIN-A01', value: 'BIN-A01' }
                    ]}
                // disabled={taxType == 'NO-TAX'}
                />
                <SelectInput
                    id='to_bin'
                    label='To Bin (Optional)'
                    value={productForm.to_bin}
                    onChange={handleProductChange}
                    options={[
                        { label: 'BIN-C02', value: 'BIN-C02' }
                    ]}
                // disabled={taxType == 'NO-TAX'}
                />
                {
                    isShow &&
                    <>
                        <Input
                            id='picked_qty'
                            type='text'
                            label='Picked QTY'
                            value={productForm.picked_qty}
                            onChange={handleProductChange}
                            required
                        />
                        <Input
                            id='variance_reason'
                            type='text'
                            label='Variance Reason'
                            value={productForm.variance_reason}
                            onChange={handleProductChange}
                            required
                        />
                    </>
                }
                {
                    (status == 'Cancelled' || status == 'Received') &&
                    <Input
                        id='receive_qty'
                        type='text'
                        label='Received QTY'
                        value={productForm.receive_qty}
                        onChange={handleProductChange}
                        className='mb-1'
                        required
                    />
                }

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

export default StockTransferList
