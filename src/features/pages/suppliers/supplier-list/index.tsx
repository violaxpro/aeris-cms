'use client'
import React, { useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { BrandType } from '@/data/brands-data'
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
import { supplierListAtom } from '@/store/SuppliersAtom'
import { SupplierListType } from '@/plugins/types/suppliers-type'

const index = ({ suppliersData }: { suppliersData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(supplierListAtom)


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
            title: 'Supplier List',
        },
    ]
    const columns: TableColumnsType<SupplierListType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'mobile_number',
        },
        {
            title: 'Sales Person',
            dataIndex: 'sales_person',
        },
        {
            title: 'Website',
            dataIndex: 'website',
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
                        title='Delete Supplier List'
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
        setData(suppliersData)
    }, [suppliersData])
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Supplier List
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
                                label='Add Supplier List'
                                link={routes.eCommerce.createSupplierList}
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
