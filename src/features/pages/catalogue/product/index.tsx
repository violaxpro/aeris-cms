'use client'
import React, { useState, useEffect } from 'react'
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { ProductDataType } from '@/data/products-data'
import { EditOutlined, PlusCircleOutlined, InfoCircleOutlined, MoreOutlined } from '@ant-design/icons'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import StatusBadge from '@/components/badge/badge-status'
import Popover from '@/components/popover'
import { deleteProduct } from '@/services/products-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { productAtom } from '@/store/ProductAtom'
import dayjs from 'dayjs'
import Image from 'next/image'

const index = ({ products }: { products?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(productAtom)
    const [filteredData, setFilteredData] = useState<ProductDataType[]>([]);
    const [search, setSearch] = useState('')

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
            sorter: (a: any, b: any) => a.id - b.id,
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            sorter: (a: any, b: any) => {
                return a?.sku?.localeCompare(b?.sku)
            }
        },
        {
            title: 'Thumbnail',
            dataIndex: 'images',
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
            sorter: (a: any, b: any) => {
                return a?.name?.localeCompare(b?.name)
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a: any, b: any) => {
                return a.price - b.price
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                return a?.status - b?.status
            },
            render: (value: any) => {
                return <StatusBadge status={value} />;
            }
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            sorter: (a: any, b: any) => {
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            },
            render: (_: any, row: any) => {
                const createdAt = dayjs(row.created_at).format('DD/MM/YYYY')
                const updatedAt = dayjs(row.updated).format('DD/MM/YYYY')
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>Created At</span>
                        <span>:</span>
                        <span>{createdAt}</span>
                    </div>
                    <div className="flex justify-start gap-1">
                        <span>Updated At</span>
                        <span>:</span>
                        <span>{updatedAt}</span>
                    </div>
                </div>

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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="edit">
                            <Link href={routes.eCommerce.editProduct(row.id)}>
                                Edit
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="delete">
                            <Popover
                                title='Delete Product'
                                description='Are you sure to delete this data?'
                                onDelete={() => handleDelete(row.id)}
                                label='Delete'
                            />
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <Dropdown overlay={menu} trigger={['click']} >
                        <button className="flex items-center justify-center px-2 py-1 border rounded ">
                            Actions <MoreOutlined className="ml-1" />
                        </button>
                    </Dropdown >
                );
            }

        },

    ]

    const handleSearch = (value: string) => {
        const search = value.toLowerCase();
        setSearch(search)
        const result = data.filter((item: any) => {
            return item?.name?.toLowerCase().includes(search) ||
                item?.sku?.toLowerCase().includes(search) ||
                item?.price.toLowerCase().includes(search)
        });
        setFilteredData(result);
    };

    useEffect(() => {
        setData(products)
        if (!search) {
            setFilteredData(products)
        }
    }, [products, search])

    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Products
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>
            <Content className="mt-6 mx-4 mb-0 ">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-end mb-4'>

                        <div className='flex items-center gap-2'>
                            <SearchInput onSearch={handleSearch} />
                            <Button

                                icon={<PlusCircleOutlined />}
                                label='Add Product'
                                link={routes.eCommerce.createProduct}
                            />
                        </div>

                    </div>
                    <TableProduct
                        columns={columnProducts}
                        dataSource={filteredData}
                        withSelectableRows
                    />
                </div>
            </Content>
        </>
    )
}

export default index
