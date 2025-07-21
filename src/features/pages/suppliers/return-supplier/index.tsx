'use client'
import React, { useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import { deleteReturnSupplier } from '@/services/return-supplier'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { returnSupplierAtom } from '@/store/SuppliersAtom'
import { returnData, ReturnSupplierType } from '@/plugins/types/suppliers-type'
import { stripHTML } from '@/plugins/validators/common-rules'
import dayjs from 'dayjs'

const index = ({ returnSupplierData }: { returnSupplierData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(returnSupplierAtom)

    const handleDelete = async (id: any) => {
        try {
            const res = await deleteReturnSupplier(id)
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
            title: 'Suppliers',
        },
        {
            title: 'Return Suppliers',
        },
    ]
    const columns: TableColumnsType<ReturnSupplierType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Purchase Id',
            dataIndex: 'purchase_id',
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier_name',
        },
        {
            title: 'Total',
            dataIndex: 'total',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (val) => {
                const status = stripHTML(val);
                return status
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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => (

                <div className="flex items-center justify-end gap-3 pe-4">
                    <Link href={routes.eCommerce.editReturnSupplier(row.id)}>
                        <EditOutlined />
                    </Link>
                    <DeletePopover
                        title='Delete Return Supplier'
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
        setData(returnData)
    }, [returnData])
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Return Suppliers
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

                                icon={<PlusCircleOutlined />}
                                label='Add Return Supplier'
                                link={routes.eCommerce.createReturnSupplier}
                            />
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
