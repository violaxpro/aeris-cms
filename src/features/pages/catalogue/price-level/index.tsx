'use client'
import React, { useEffect } from 'react'
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import { PriceLevelType } from '@/data/price-level-data'
import { EditOutlined, PlusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import { useNotificationAntd } from '@/components/toast'
import { deletePriceLevel } from '@/services/price-level-service'
import { priceLevelsAtom } from '@/store/PriceLevelAtomStore'
import { useAtom } from 'jotai'

const index = ({ priceLevels }: { priceLevels?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(priceLevelsAtom)
    const handleDelete = async (id: any) => {
        try {
            const res = await deletePriceLevel(id)
            if (res.success == true) {
                notifySuccess(res.message)
                setData(prev => prev.filter(item => item.id !== id))
            }
        } catch (error) {
            console.error(error)
        }
    }

    console.log(priceLevels)

    useEffect(() => {
        setData(priceLevels)
    }, [priceLevels])

    const breadcrumb = [
        {
            title: 'Catalogue',
        },
        {
            title: 'Price Level',
        },
    ]
    const columns: TableColumnsType<PriceLevelType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            render: (brand: { id: number; name: string } | null) => {
                return brand?.name || '-';
            },
        },
        {
            title: 'Category',
            dataIndex: 'category',
            render: (category: { id: number; name: string } | null) => {
                return category?.name || '-';
            },
        },
        {
            // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => (

                <div className="flex items-center justify-end gap-3 pe-4">
                    <Link href={routes.eCommerce.editPriceLevel(row.id)}>
                        <EditOutlined />
                    </Link>
                    <DeletePopover
                        title='Delete Price Level'
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
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Price Level
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
                                label='Add Price Level'
                                link={routes.eCommerce.createPriceLevel}
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
