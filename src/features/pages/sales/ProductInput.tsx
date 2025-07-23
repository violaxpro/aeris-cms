import React, { useState, useEffect } from 'react'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import ButtonAction from '@/components/button/ButtonIcon';
import { useAtom } from 'jotai';
import { taxSetAtom } from '@/store/DropdownItemStore';
import { getProduct } from '@/services/products-service';
import Image from 'next/image';
import { TrashIcon } from '@public/icon';
export interface ProductForm {
    sku: string
    name: string
    price: number
    buying_price: number
    qty: number
    total: number
    // tax: any;
}

interface ProductInputProps {
    productForm: ProductForm
    // setProductForm?: React.Dispatch<React.SetStateAction<ProductForm>>
    // onAddProduct?: () => void
    onChange: (form: ProductForm) => void;
    onRemove?: () => void;
    index: number;
}

const ProductInput = ({
    productForm,
    // setProductForm,
    // onAddProduct,
    onRemove,
    onChange
}: ProductInputProps) => {
    const [optionsTax] = useAtom(taxSetAtom)
    const [items, setItems] = useState([])
    const [taxError, setTaxError] = useState('');
    const handleProductChange = (e: any) => {
        const { id, value } = e.target;

        let updatedProductForm = {
            ...productForm,
            [id]: value
        };

        if (id === 'qty' || id === 'buying_price') {
            const qty = Number(id === 'qty' ? value : updatedProductForm.qty);
            const buyingPrice = Number(id === 'buying_price' ? value : updatedProductForm.buying_price);
            const total = qty * buyingPrice;
            updatedProductForm.total = Number(total.toFixed(2))
        }

        onChange(updatedProductForm);
    };

    const handleChangeSelect = (id: string, value: any) => {
        let updatedProductForm = {
            ...productForm,
            [id]: value
        };

        // Cari data tax di options
        const selectedTax: any = optionsTax.find((t: any) => t.value === value);

        const taxRate = selectedTax ? Number(selectedTax.value) : 0;

        // Re-hit total dengan tax kalau ada qty & buying_price
        const qty = Number(updatedProductForm.qty) || 0;
        const buyingPrice = Number(updatedProductForm.buying_price) || 0;
        const baseTotal = qty * buyingPrice;

        const taxAmount = (baseTotal * taxRate) / 100;

        updatedProductForm.total = Number((baseTotal + taxAmount).toFixed(2));

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


    // const handleAddProduct = () => {
    //     if (!productForm.tax) {
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

    return (
        <div>
            <div className='grid md:grid-cols-[1fr_3fr_1fr_1fr_70px_1fr_50px] items-center gap-4 mb-2'>
                <Input
                    id='sku'
                    type='text'
                    label='Product SKU'
                    value={productForm.sku}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                />
                <SelectInput
                    id='name'
                    label='Product Name'
                    value={productForm.name}
                    onChange={(val: any) => handleSelectProduct(val)}
                    options={items.map((p: any) => ({
                        label: p.name,
                        value: p.name,
                    }))}
                    required
                />

                <Input
                    id='price'
                    type='text'
                    label='Price'
                    value={productForm.price}
                    onChange={handleProductChange}
                    className='mb-1'
                    required

                />

                <Input
                    id='buying_price'
                    type='text'
                    label='Buying Price'
                    value={productForm.buying_price}
                    onChange={handleProductChange}
                    className='mb-1'
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
                {/* <SelectInput
                    id="tax"
                    label="Tax Fee"
                    placeholder="Select Tax Fee"
                    value={productForm.tax}
                    onChange={(val) => handleChangeSelect("tax", val)}
                    options={optionsTax}
                    error={taxError}
                /> */}

                <Input
                    id='total'
                    type='text'
                    label='Total'
                    value={productForm.total}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                />
                {
                    onRemove && <div className='flex item-ends justify-center mt-4 '>
                        <ButtonAction
                            icon={TrashIcon}
                            width={15}
                            height={15}
                            className='btn-trash-item !h-10 !w-15'
                            onClick={onRemove}
                        />
                    </div>
                }
            </div>
        </div>

    )
}

export default ProductInput
