import React from 'react'
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import { productsData, ProductType } from '@/data/products-data'
import Image from 'next/image'
import { Rate } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';

const index = () => {

    const breadcrumb = [
        {
            title: 'Catalogue',
        },
        {
            title: 'Products',
        },
    ]
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
                    <Link href={routes.eCommerce.ediProduct(row.id)}>
                        <EditOutlined />
                    </Link>
                    <DeleteOutlined />

                </div >
            ),
        },

    ]

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };
    return (
        <>
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Product
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>
            <Content className="mt-6 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-end mb-4'>

                        <div className='flex items-center gap-2'>
                            <SearchInput onSearch={handleSearch} />
                            <Button
                                btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                                icon={<PlusCircleOutlined />}
                                label='Add Product'
                                link={routes.eCommerce.createProduct}
                            />
                        </div>

                    </div>
                    <TableProduct
                        columns={columnProducts}
                        dataSource={productsData}
                        withSelectableRows
                    />
                </div>
            </Content>
        </>
    )
}

export default index
