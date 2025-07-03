'use client'
import React, { useEffect } from 'react'
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import { BrandType } from '@/data/brands-data'
import Image from 'next/image'
import { EditOutlined, PlusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import dayjs from 'dayjs'
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
            title: 'Catalogue',
        },
        {
            title: 'Brands',
        },
    ]
    const columns: TableColumnsType<BrandType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Logo',
            dataIndex: 'url_logo',
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
            title: 'Brand Name',
            dataIndex: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
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
            // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => (

                <div className="flex items-center justify-end gap-3 pe-4">
                    <Link href={routes.eCommerce.editBrands(row.id)}>
                        <EditOutlined />
                    </Link>
                    <DeletePopover
                        title='Delete Brands'
                        description='Are you sure to delete this data?'
                        onDelete={() => handleDelete(row.id)}
                    />
                    <Link href={routes.eCommerce.detailBrands(row.id)}>
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
        setData(brandsData)
    }, [brandsData])
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Brands
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
                                label='Add Brands'
                                link={routes.eCommerce.createBrands}
                            />
                        </div>

                    </div>
                    <TableProduct
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
