import React, { useState } from 'react'
import FormGroup from '@/components/form-group';
import Button from '@/components/button'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { PlusOutlineIcon, TrashIcon, TrashIconRed } from '@public/icon';
import SelectInput from '@/components/select';
import Input from '@/components/input';
import CheckboxInput from '@/components/checkbox';
import ButtonIcon from '@/components/button/ButtonIcon';
import { Divider } from 'antd';
import { useAtom } from 'jotai';
import { attributeAtom, optionSetAtom } from '@/store/DropdownItemStore';
import { ChildFormProps } from '@/plugins/types/form-type'
import { optionsType } from '@/plugins/utils/options';
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import { productsData, ProductType, ProductDataType } from '@/data/products-data'
import { Rate } from 'antd';
import { routes } from '@/config/routes'
import Link from 'next/link'
import SearchTable from '@/components/search/SearchTable'
import { productAtom } from '@/store/ProductAtom'
import { getProduct } from '@/services/products-service'
import Modal from '@/components/modal'

const AdvancedInformation = ({
    onChange,
    dataById,
    formDataCreate
}: ChildFormProps) => {
    const [optionAttribute] = useAtom(attributeAtom)
    const [optionSet] = useAtom(optionSetAtom)
    const [data, setData] = useAtom(productAtom)
    const [filteredData, setFilteredData] = useState<ProductDataType[]>([]);
    const [search, setSearch] = useState('')
    const [openModalProduct, setIsOpenModalProduct] = useState(false)

    const columnProducts: TableColumnsType<ProductDataType> = [
        {
            title: 'SKU',
            dataIndex: 'sku',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (_: any, row: any) => {
                const url = row && row.images.length > 0 ? row?.images[0]?.url : null
                return <Image
                    src={url}
                    alt="product-img"
                    width={50}
                    height={50}
                    className='object-cover rounded-xl'
                />
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Qty',
            dataIndex: 'stock',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => (
                <div className="flex items-center justify-end gap-3 pe-4">
                    <Button
                        label='Choose'
                        shape='round'
                        hasHeight={false}
                    />
                </div >
            ),
        },

    ]

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        const updated = { ...formDataCreate.tab_advanced, [id]: value }
        onChange(updated)
    };

    const handleChangeUpdateRow = (
        list_type: string,
        index: number,
        key: string,
        value: any
    ) => {
        const updatedItems = [...formDataCreate.tab_advanced[list_type]];

        updatedItems[index] = {
            ...updatedItems[index],
            [key]: value,
        };

        const updated = {
            ...formDataCreate.tab_advanced,
            [list_type]: updatedItems,
        };
        onChange(updated);
    };

    const addItem = (list_type: string) => {
        let newItem: any = {};
        if (list_type === 'attributes') {
            newItem = { name: '', price: 0, categories: [] }
        } if (list_type == 'options') {
            newItem = { name: '', type: '', required: false, values: [] }
        }

        const updated = {
            ...formDataCreate.tab_advanced,
            [list_type]: [newItem, ...(formDataCreate.tab_advanced[list_type] || [])]
        };

        onChange(updated);
    };

    const addOptionValue = (optionIndex: number) => {
        const updatedOptions = [...formDataCreate.tab_advanced.options];

        // Pastikan values sudah ada, kalau belum inisialisasi array kosong
        const currentValues = updatedOptions[optionIndex].values || [];

        updatedOptions[optionIndex] = {
            ...updatedOptions[optionIndex],
            values: [...currentValues, ""], // tambah string kosong sebagai default
        };

        const updated = {
            ...formDataCreate.tab_advanced,
            options: updatedOptions,
        };

        onChange(updated);
    };

    const removeItem = (list_type: string, index: number) => {
        const updatedItems = [...formDataCreate.tab_advanced[list_type]];
        updatedItems.splice(index, 1);

        const updated = {
            ...formDataCreate.tab_advanced,
            [list_type]: updatedItems,
        };

        onChange(updated);
    };

    const removeOptionValue = (optionIndex: number, valueIndex: number) => {
        const updatedOptions = [...formDataCreate.tab_advanced.options];

        updatedOptions[optionIndex].values.splice(valueIndex, 1);

        const updated = {
            ...formDataCreate.tab_advanced,
            options: updatedOptions,
        };

        onChange(updated);
    };
    return (
        <div>
            <FormGroup title="Attribute" description="Attribute information about the product.">
                <div className="space-y-4 col-span-full">
                    {formDataCreate.tab_advanced.attributes.map((item: any, index: number) => (
                        <>
                            <div className='flex gap-3 items-center'>
                                <div key={index} className="grid md:grid-cols-3 items-center gap-2 mb-3 w-full">
                                    <SelectInput
                                        id={`attribute-${index}`}
                                        label="Attribute"
                                        placeholder="Select Attribute (e.g. Size, Color, Material)"
                                        onChange={(selectedOption) =>
                                            handleChangeUpdateRow('attributes', index, 'name', selectedOption)
                                        }
                                        value={item.name || undefined}
                                        options={optionAttribute}
                                    />
                                    <Input
                                        id={`price-${index}`}
                                        label="Price"
                                        type='text'
                                        placeholder="Enter price for this attribute"
                                        onChange={(e: any) => handleChangeUpdateRow('attributes', index, 'price', e.target.value)}
                                        value={item.price}
                                    />
                                    <SelectInput
                                        id={`categories-${index}`}
                                        label="Categories"
                                        placeholder="Select categories related to this attribute (e.g. Accessories)"
                                        modeType="multiple"
                                        onChange={(selectedOptions) =>
                                            handleChangeUpdateRow('attributes', index, 'categories', Array.isArray(selectedOptions)
                                                ? selectedOptions.map((opt: any) => opt)
                                                : [])
                                        }
                                        value={item.categories}
                                    // options={options}
                                    />
                                </div>

                                <div className="pt-3">
                                    {
                                        formDataCreate.tab_advanced.attributes.length <= 1 ? <ButtonIcon
                                            icon={TrashIcon}
                                            width={20}
                                            height={20}
                                            className='btn-trash-item !h-10 !w-15'
                                        /> : <ButtonIcon
                                            color='danger'
                                            variant='filled'
                                            size="small"
                                            icon={TrashIconRed}
                                            width={15}
                                            height={15}
                                            className='!h-10 !w-15'
                                            onClick={() => removeItem('attributes', index)}
                                        />
                                    }
                                </div>
                            </div>
                        </>
                    ))}
                    <Divider />
                    <div className="flex justify-end mt-4">
                        <Button
                            label='Add Attribute'
                            icon={<Image src={PlusOutlineIcon} alt='add-icon' width={15} height={15} />}
                            onClick={() => addItem('attributes')}
                        />
                    </div>
                </div>
            </FormGroup>

            <FormGroup title="Options" description="Options information about the product">
                <div className="space-y-4 col-span-full">
                    {formDataCreate.tab_advanced.options.map((item: any, index: number) => (
                        <div key={index} className="flex flex-col gap-3 mb-6 w-full pb-4">
                            {/* Baris 1: Name dan Option Type */}
                            <div className="grid grid-cols-[repeat(2,1fr)_150px_120px_50px] gap-4">
                                <SelectInput
                                    id='name'
                                    label='Option Name'
                                    placeholder="Select Option Name (e.g. Color, Size, Warranty)"
                                    value={item.name || undefined}
                                    onChange={(selectedOptions) =>
                                        handleChangeUpdateRow('options', index, 'name', selectedOptions)
                                    }
                                    options={optionSet}
                                />
                                <SelectInput
                                    id={`optionType-${index}`}
                                    label="Option Type"
                                    placeholder="Select Option Type (e.g. Dropdown, Radio Button, Checkbox)"

                                    onChange={(selectedOptions) =>
                                        handleChangeUpdateRow('options', index, 'type', selectedOptions)
                                    }
                                    value={item.type || undefined}
                                    options={optionsType}
                                />
                                <div className='lex items-center pt-8'>
                                    <CheckboxInput
                                        text="Required"
                                        checked={item.optRequired}
                                        onChange={(checked: boolean) => handleChangeUpdateRow('options', index, 'optRequired', checked)}
                                    />
                                </div>
                                <div className='flex items-center justify-center pt-5'>
                                    <Button
                                        label=' Add Values'
                                        onClick={() => addOptionValue(index)}
                                    />
                                </div>

                                <div className="pt-5">
                                    {
                                        formDataCreate.tab_advanced.options.length <= 1 ? <ButtonIcon
                                            icon={TrashIcon}
                                            width={20}
                                            height={20}
                                            className='btn-trash-item !h-10 !w-15'
                                        /> : <ButtonIcon
                                            color='danger'
                                            variant='filled'
                                            size="small"
                                            icon={TrashIconRed}
                                            width={15}
                                            height={15}
                                            className='!h-10 !w-15'
                                            onClick={() => removeItem('options', index)}
                                        />
                                    }
                                </div>
                            </div>

                            {/* Baris 3 dst: Global Option dropdown */}
                            < div className="grid md:grid-cols-4 gap-3 w-full" >
                                {
                                    item.values?.map((optValue: any, gIdx: number) => (
                                        <div key={gIdx}>
                                            <div className="flex gap-2">
                                                <Input
                                                    id='values'
                                                    label='Values'
                                                    type='text'
                                                    value={optValue}
                                                    onChange={(e: any) =>
                                                        handleChangeUpdateRow(
                                                            'options',
                                                            index,
                                                            'values',
                                                            item.values.map((v: any, vi: number) =>
                                                                vi === gIdx ? e.target.value : v
                                                            )
                                                        )
                                                    }
                                                    divClassName='w-full'
                                                    placeholder='Enter option value (e.g. Red, Blue, Large, 1 Year Warranty)'
                                                />
                                                <div className="pt-6">
                                                    <ButtonIcon
                                                        color='danger'
                                                        variant='filled'
                                                        size="small"
                                                        icon={TrashIconRed}
                                                        width={15}
                                                        height={15}
                                                        className='!h-10 !w-15'
                                                        onClick={() => removeOptionValue(index, gIdx)}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                    ))
                                }
                            </div>
                        </div>
                    ))
                    }

                    <Divider />
                    <div className="flex justify-end mt-4">
                        <Button
                            label=' Add  Options'
                            icon={<Image src={PlusOutlineIcon} alt='add-icon' width={15} height={15} />}
                            onClick={() => addItem('options')}
                        />

                    </div>
                </div >
            </FormGroup >

            <div>
                <Modal
                    open={openModalProduct}
                    handleCancel={() => setIsOpenModalProduct(false)}
                    title='List Products'
                >
                    <TableProduct
                        columns={columnProducts}
                        dataSource={filteredData}
                        withSelectableRows
                    />
                </Modal>
                <FormGroup
                    title="Related Product"
                    description="Related Product information about the product"
                >
                    <div className="overflow-x-auto col-span-full">
                        <div className='flex justify-end mb-2 gap-3'>
                            <Button
                                label='View Products'
                                onClick={() => setIsOpenModalProduct(true)}
                            />
                            <SearchTable
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <TableProduct
                            columns={columnProducts}
                            dataSource={filteredData}
                            withSelectableRows
                        />
                    </div>
                </FormGroup>
                <div className='flex justify-end gap-3 mt-2'>
                    <Button
                        label='Save'
                    />
                </div>
            </div>
        </div>
    )
}

export default AdvancedInformation
