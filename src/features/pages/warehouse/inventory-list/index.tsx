'use client'
import React, { useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { BrandType } from '@/data/brands-data'
import Image from 'next/image'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import { deleteBrand } from '@/services/brands-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { brandAtom } from '@/store/BrandAtomStore'

const index = ({ brandsData }: { brandsData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(brandAtom)


    const handleDelete = async (id: any) => {
        try {
            const res = await deleteBrand(id)
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
            title: 'Warehouse',
        },
        {
            title: 'Inventory List',
        },
    ]
    const columns: TableColumnsType<BrandType> = [
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
            dataIndex: 'url_logo',
            render: (url: string) => {
                if (!url) return null;
                return (
                    <Image
                        src={url}
                        alt="product-img"
                        width={50}
                        height={50}
                        className='object-cover rounded-xl'
                    />
                )
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'In Stock',
            dataIndex: 'in_stock',
        },
        {
            title: 'Waiting',
            dataIndex: 'waiting',
        },
        {
            title: 'Sold',
            dataIndex: 'sold',
        },
        {
            title: 'Added',
            dataIndex: 'added',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => (

                <div className="flex items-center justify-end gap-3 pe-4">
                    {/* <Link href={routes.eCommerce.editBrands(row.id)}>
                        <EditOutlined />
                    </Link> */}
                    <DeletePopover
                        title='Delete Inventory List'
                        description='Are you sure to delete this data?'
                        onDelete={() => handleDelete(row.id)}
                    />
                </div >
            ),
        },

    ]

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };

    useEffect(() => {
        setData(brandsData)
    }, [brandsData])
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Inventory List
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
                            {/* <Button
                                
                                icon={<PlusCircleOutlined />}
                                label='Add Inventory List'
                                link={routes.eCommerce.createBrands}
                            /> */}
                        </div>

                    </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        withSelectableRows
                    />
                </div>
            </Content>
        </>
    )
}

export default index
