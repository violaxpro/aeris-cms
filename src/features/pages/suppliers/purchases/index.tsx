'use client'
import React, { useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { EditOutlined, PlusCircleOutlined, MoreOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import { purchases, PurchasesType } from '@/plugins/types/suppliers-type'
import { deletePurchases } from '@/services/purchases-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { purchaseSupplierAtom } from '@/store/SuppliersAtom'
import { stripHTML } from '@/plugins/validators/common-rules'
import dayjs from 'dayjs'

const index = ({ purchasesData }: { purchasesData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(purchaseSupplierAtom)

    const handleDelete = async (id: any) => {
        try {
            const res = await deletePurchases(id)
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
            title: 'Purchases',
        },
    ]
    const columns: TableColumnsType<PurchasesType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Order Id',
            dataIndex: 'order_id',
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier_name',
        },
        {
            title: 'Created By',
            dataIndex: 'created_by',
        },
        {
            title: 'Total',
            dataIndex: 'total',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (val) => {
                const status = val ? stripHTML(val) : '';
                return status
            }
        },
        {
            title: 'Email Status',
            dataIndex: 'email_status',
            render: (val) => {
                const status = val ? stripHTML(val) : '';
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
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="edit">
                            <Link href={routes.eCommerce.editPurchases(row.id)}>
                                Edit
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sendEmail">
                            <Link href={routes.eCommerce.sendEmail(row.id)}>
                                Send Email
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="print">
                            <Link href={routes.eCommerce.print(row.id)}>
                                Print
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="serialNumber">
                            <Link href={routes.eCommerce.createSerialNumber(row.id)}>
                                Serial Number
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="delete">
                            <DeletePopover
                                title='Delete Return Supplier'
                                description='Are you sure to delete this data?'
                                onDelete={() => handleDelete(row.id)}
                                label='Delete'
                            />
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <Dropdown overlay={menu} trigger={['click']} >
                        <button className="flex items-center justify-center px-2 py-1 border rounded hover:bg-gray-100">
                            Actions <MoreOutlined className="ml-1" />
                        </button>
                    </Dropdown >
                );
            }
        },

    ]

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };

    useEffect(() => {
        setData(purchases)
    }, [purchases])
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Purchases
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
                                label='Add Purchases Order'
                                link={routes.eCommerce.createPurchases}
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
