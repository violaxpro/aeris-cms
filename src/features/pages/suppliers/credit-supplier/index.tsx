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
import { deleteSupplierList } from '@/services/supplier-list-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { creditSupplierAtom } from '@/store/SuppliersAtom'
import { creditSupplierData, CreditSupplierType } from '@/plugins/types/suppliers-type'
import { stripHTML } from '@/plugins/validators/common-rules'

const index = ({ creditSuppliersData }: { creditSuppliersData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(creditSupplierAtom)


    const handleDelete = async (id: any) => {
        try {
            const res = await deleteSupplierList(id)
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
            title: 'Credit Supplier',
        },
    ]
    const columns: TableColumnsType<CreditSupplierType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Purchase Id',
            dataIndex: 'purchase_id',
        },
        {
            title: 'Customer',
            dataIndex: 'customer_name',
        },
        {
            title: 'Credit',
            dataIndex: 'credit',
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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => (

                <div className="flex items-center justify-end gap-3 pe-4">
                    <Link href={routes.eCommerce.editSupplierList(row.id)}>
                        <EditOutlined />
                    </Link>
                    <DeletePopover
                        title='Delete Credit Supplier'
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
        setData(creditSupplierData)
    }, [creditSupplierData])
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Credit Supplier
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
