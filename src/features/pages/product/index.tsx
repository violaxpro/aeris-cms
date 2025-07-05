'use client'
import React, { useEffect } from 'react'
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import { ProductDataType } from '@/data/products-data'
import { EditOutlined, PlusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import StatusBadge from '@/components/badge/badge-status'
import DeletePopover from '@/components/popover'
import { deleteProduct } from '@/services/products-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { productAtom } from '@/store/ProductAtom'
import dayjs from 'dayjs'
import Image from 'next/image'

const index = ({ products }: { products?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(productAtom)


    const handleDelete = async (id: any) => {
        try {
            const res = await deleteProduct(id)
            if (res.success == true) {
                notifySuccess(res.message)
                setData(prev => prev.filter(item => item.id !== id))
            }
        } catch (error) {
            console.error(error)
        }
    }
    const breadcrumb = [
        {
            title: 'Catalogue',
        },
        {
            title: 'Products',
        },
    ]
    const columnProducts: TableColumnsType<ProductDataType> = [
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
            dataIndex: 'images',
            render: (url: string) => {
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
            render: (value: any) => {
                return <StatusBadge status={value} />;
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (created_at: string) => {
                const date = dayjs(created_at).format('DD MMMM, YYYY')
                return date
            }
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            render: (updated_at: string) => {
                const date = dayjs(updated_at).format('DD MMMM, YYYY')
                return date
            }
        },
        // {
        //     title: 'Rating',
        //     dataIndex: 'rating',
        //     render: (value: number[]) => {
        //         // if (!value.length) return '-'
        //         // const average = value.reduce((a, b) => a + b, 0);
        //         // return (
        //         //     <>
        //         //         <Rate disabled allowHalf defaultValue={average} />
        //         //         <span className='ms-6 text-sm'>({average.toFixed(1)})</span>
        //         //     </>
        //         // );
        //         return value

        //     },
        // },
        {
            // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => (
                <div className="flex items-center justify-end gap-3 pe-4">
                    <Link href={routes.eCommerce.editProduct(row.id)}>
                        <EditOutlined />
                    </Link>
                    <DeletePopover
                        title='Delete Product'
                        description='Are you sure to delete this data?'
                        onDelete={() => handleDelete(row.id)}
                    />
                    <Link href={routes.eCommerce.detailProduct(row.id)}>
                        <InfoCircleOutlined />
                    </Link>

                </div >
            ),
        },

    ]

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };

    useEffect(() => {
        setData(products)
    }, [products])
    return (
        <>
            {contextHolder}
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
                        dataSource={data}
                        withSelectableRows
                    />
                </div>
            </Content>
        </>
    )
}

export default index
