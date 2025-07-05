import React, { useState } from 'react'
import FormGroup from '@/components/form'
import Button from "@/components/button"
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import { productsData, ProductType } from '@/data/products-data'
import Image from 'next/image'
import { Rate } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { routes } from '@/config/routes'
import Link from 'next/link'
import SearchInput from '@/components/search';


const RelatedProductInformation = ({ className }: { className?: string }) => {
    const [formData, setFormData] = useState({
        name: '',
        value: ''
    });

    const columnProducts: TableColumnsType<ProductType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'image',
            render: (url: string) => (
                <Image
                    src={url}
                    alt="product-img"
                    width={50}
                    height={50}
                    className='object-cover rounded-xl'
                />

            ),
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
            title: 'Rating',
            dataIndex: 'rating',
            render: (value: number[]) => {
                if (!value.length) return '-'
                const average = value.reduce((a, b) => a + b, 0);
                return (
                    <>
                        <Rate disabled allowHalf defaultValue={average} />
                        <span className='ms-6 text-sm'>({average.toFixed(1)})</span>
                    </>
                );

            },
        },
        {
            // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: ProductType) => (
                <div className="flex items-center justify-end gap-3 pe-4">
                    <Link href={routes.eCommerce.editProduct(row.id)}>
                        <EditOutlined />
                    </Link>
                    <DeleteOutlined />

                </div >
            ),
        },

    ]

    const handleChange = (values: { name: string; price: string }[]) => {
        console.log('Updated List:', values);
    };

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };
    return (
        <div>
            <FormGroup
                title="Related Product"
                description="Related Product information about the product"
            >
                <div className="overflow-x-auto col-span-full">
                    <div className='flex justify-end mb-2'>
                        <SearchInput onSearch={handleSearch} />
                    </div>
                    <TableProduct
                        columns={columnProducts}
                        dataSource={productsData}
                        withSelectableRows
                    />
                </div>
            </FormGroup>
            <div className='flex justify-end gap-3 mt-2'>
                <Button
                    label='Save'
                    btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                />
            </div>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />

        </div>
    )
}

export default RelatedProductInformation
