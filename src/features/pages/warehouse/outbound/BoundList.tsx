import React, { useState, useEffect } from 'react'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import Textarea from '@/components/textarea'
import CheckboxInput from '@/components/checkbox';
import ButtonIcon from '@/components/button/ButtonIcon';
import { useAtom } from 'jotai';
import { taxSetAtom } from '@/store/DropdownItemStore';
import { getProduct } from '@/services/products-service';
import Image from 'next/image';
import { TrashIcon, TrashIconRed } from '@public/icon';
import Button from '@/components/button'
import Modal from '@/components/modal'
import { CalculatorOutlined } from '@ant-design/icons';
import { CancelGreyIcon } from '@public/icon';
export interface BoundForm {
    sku: string
    uom: string
    qty: number
    price: number
    serial: string
}

export interface NewProductType {
    sku: string
    name: string
    price: number
    buy_price: number
    short_desc: string
}

interface BoundListProps {
    boundForm: BoundForm
    onChange: (form: BoundForm) => void;
    onRemove?: () => void;
    index: number;
    length?: number
}

const BoundList = ({
    boundForm,
    // setboundForm,
    // onAddProduct,
    onRemove,
    onChange,
    length
}: BoundListProps) => {
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

        let updatedboundForm = {
            ...boundForm,
            [id]: value
        };

        onChange(updatedboundForm);
    };


    const handleChangeSelect = (id: string, value: any) => {
        let updatedboundForm = {
            ...boundForm,
            [id]: value
        };

        onChange(updatedboundForm);
    };

    const handleSelectProduct = (productName: string) => {
        const selected: any = items.find((p: any) => p.name === productName);
        if (selected) {
            const updatedForm = {
                ...boundForm,
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


    // const handleAddProduct = () => {
    //     if (!boundForm.tax) {
    //         setTaxError('Tax Fee is required');
    //         return;
    //     } else {
    //         setTaxError('');
    //     }

    //     onAddProduct()
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProduct()
                if (res.data) {
                    setItems(res.data)
                }

            } catch (error) {
                console.error(error)
            }
        }

        fetchData()

    }, [])

    console.log(optionsTax)
    return (
        <div className='grid md:grid-cols-[1fr_150px_150px_150px_1fr_50px] gap-4 mb-2'>
            <Input
                id='sku'
                type='text'
                label='SKU'
                value={boundForm.sku}
                onChange={handleProductChange}
                required
            // disabled={isDisabled}
            />
            <Input
                id='uom'
                type='text'
                label='UOM'
                value={boundForm.uom}
                onChange={handleProductChange}
                required
            // disabled={isDisabled}
            />
            <Input
                id='qty'
                type='text'
                label='Qty'
                value={boundForm.qty}
                onChange={handleProductChange}
                required
            // disabled={isDisabled}
            />
            <Input
                id='price'
                type='text'
                label='Price'
                value={boundForm.price}
                onChange={handleProductChange}
                required
            // disabled={isDisabled}
            />
            <Input
                id='serial'
                label='Serial/Lot Numbers'
                type='text'
                placeholder='Input Serial/Lot Numbers'
                onChange={handleProductChange}
                value={boundForm.serial}
            // disabled={isDisabled}
            />

            {
                onRemove && <div className='flex item-ends justify-center pt-5 '>
                    {
                        length && length <= 1 ?
                            <ButtonIcon
                                icon={TrashIcon}
                                width={20}
                                height={20}
                                className='btn-trash-item !h-10 !w-15'
                            /> :
                            <ButtonIcon
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

    )
}

export default BoundList
