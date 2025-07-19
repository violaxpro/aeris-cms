'use client'
import React, { useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { WarehouseBranchListType } from '@/plugins/types/warehouse-type'
import Image from 'next/image'
import { EditOutlined, PlusCircleOutlined, MoreOutlined } from '@ant-design/icons'
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
import { branchListAtom } from '@/store/WarehouseAtom'

const index = ({ branchListData }: { branchListData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(branchListAtom)


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
            title: 'Warehouse Branch List',
        },
    ]
    const columns: TableColumnsType<WarehouseBranchListType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Warehouse Name',
            dataIndex: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="delete">
                            <DeletePopover
                                title='Delete Warehouse Branch List'
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

            },
        },

    ]

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };

    useEffect(() => {
        setData(branchListData)
    }, [branchListData])
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Warehouse Branch List
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
                                btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
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
