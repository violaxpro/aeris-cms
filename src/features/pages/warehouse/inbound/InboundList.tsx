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
export interface InboundListType {
    // invoice_id: string
    // product_id: string
    sku: string
    qty: number
    unit_cost: number
    // name: string
    // description: string
    // buy_price: number
    tax_id: string
    tax_value: number
    tax_amount: number
    total_amount: number
    serials?: string
    qc_status?: string
    discrepancies?: string
    qty_receipts?: string
    qty_remaining?: string
}


export interface NewProductType {
    sku: string
    name: string
    price: number
    buy_price: number
    short_desc: string
}

interface InboundListProps {
    productForm: InboundListType
    onChange: (form: InboundListType) => void;
    onRemove?: () => void;
    index: number;
    length?: number
    taxType?: string
    inboundStatus?: any
}

const InboundList = ({
    productForm,
    onRemove,
    onChange,
    length,
    taxType,
    inboundStatus
}: InboundListProps) => {
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

        if (id === 'qty' || id === 'unit_cost') {
            const qty = Number(id === 'qty' ? value : updatedProductForm.qty);
            const unit_cost = Number(id === 'unit_cost' ? value : updatedProductForm.unit_cost);
            const total = qty * unit_cost;
            updatedProductForm.total_amount = Number(total.toFixed(2))
        }

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

        if (id == 'sku') {
            const selectedProduct: any = items.find((p: any) => p.sku === value);
            if (selectedProduct) {
                // updatedProductForm.name = selectedProduct.name;
                // updatedProductForm.product_id = selectedProduct.id;
                updatedProductForm.unit_cost = selectedProduct.price;
            }
        }

        // Cari data tax di options
        const selectedTax: any = optionsTax.find((t: any) => t.value === value);

        const taxRate = selectedTax ? Number(selectedTax.value) : 0;

        // Re-hit total dengan tax kalau ada qty & buying_price
        const qty = Number(updatedProductForm.qty) || 0;
        const price = Number(updatedProductForm.unit_cost) || 0;
        const baseTotal = qty * price;

        const taxAmount = (baseTotal * taxRate) / 100;

        updatedProductForm.total_amount = Number((baseTotal).toFixed(2));
        updatedProductForm.tax_amount = Number((taxAmount).toFixed(2));

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
                return "md:grid-cols-[2fr_2fr_50px_repeat(4,1fr)_50px]";
            case "Received":
                return "md:grid-cols-[2fr_2fr_50px_repeat(4,1fr)_50px]";
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

                {/* <Input
                    id='name'
                    type='text'
                    label='Title Product / Short Description Service'
                    value={productForm.name}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                /> */}
                <Input
                    id='unit_cost'
                    type='text'
                    label='Unit Cost'
                    value={productForm.unit_cost}
                    onChange={handleProductChange}
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
                {/* {
                    (inboundStatus == 'Partially Received' || inboundStatus == 'Received') &&
                    <>
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
                    </>
                } */}
                <SelectInput
                    id="tax_id"
                    label="Tax Rate"
                    placeholder="Select Tax Rate"
                    value={taxType == 'NO-TAX' ? '' : productForm.tax_id}
                    onChange={(val) => handleChangeSelect("tax_id", val)}
                    options={optionsTax}
                    error={taxError}
                    disabled={taxType == 'NO-TAX'}
                    required
                />
                <Input
                    id='tax_amount'
                    type='text'
                    label='Tax Amount'
                    value={taxType == 'NO-TAX' ? 0 : productForm.tax_amount}
                    onChange={handleProductChange}
                    className='mb-1'
                    disabled={taxType == 'NO-TAX'}
                    required
                />
                {
                    isNoDraftSent &&
                    <>
                        <Input
                            id='serials'
                            type='text'
                            label='Lots/Serials'
                            value={productForm.serials}
                            onChange={handleProductChange}
                            className='mb-1'
                            required
                        />
                        <SelectInput
                            id="qc_status"
                            label="QC Status"
                            placeholder="Select QC Status"
                            value={productForm.qc_status}
                            onChange={(val) => handleChangeSelect("qc_status", val)}
                            options={[
                                { label: 'Pending', value: 1 }
                            ]}
                            error={taxError}
                            // disabled={taxType == 'NO-TAX'}
                            required
                        />
                    </>
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

export default InboundList
