'use client'
import React, { useState, useEffect } from 'react'
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { UserType } from '@/plugins/types/users-type'
import Image from 'next/image'
import { EditOutlined, PlusCircleOutlined, InfoCircleOutlined, MoreOutlined } from '@ant-design/icons'
import Popover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import dayjs from 'dayjs'
import { deleteUser } from '@/services/users-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { userATom } from '@/store/UserAtom'
import StatusBadge from '@/components/badge/badge-status'

const index = ({ usersData }: { usersData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(userATom)
    const [filteredData, setFilteredData] = useState<UserType[]>([]);
    const [search, setSearch] = useState('')

    const handleDelete = async (id: any) => {
        try {
            const res = await deleteUser(id)
            if (res.success == true) {
                notifySuccess(res.message)
                const updatedData = data.filter(item => item.id !== id);
                setData(updatedData);

                setFilteredData(updatedData.filter(item =>
                    item.firstname.toLowerCase().includes(search.toLowerCase()) ||
                    item?.lastname.toLowerCase().includes(search)
                ));
            }
        } catch (error) {
            console.error(error)
        }
    }

    const breadcrumb = [
        {
            title: 'Users',
        },
        {
            title: 'Users',
        },
    ]
    const columns: TableColumnsType<UserType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.id - b.id,
        },
        {
            title: 'Name',
            dataIndex: 'firstname',
            render: (_: any, row: any) => {
                return (
                    <span>{`${row.firstname} ${row.lastname}`}</span>
                )
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email)
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a: any, b: any) => {
                return a?.phone - b?.phone
            },
            render: (value: any) => {
                return value
            }
        },
        {
            title: 'Price Group',
            dataIndex: 'price_level',
            sorter: (a: any, b: any) => {
                return a?.price_level.localeCompare(b?.price_level)
            },
            render: (value: any) => {
                return value
            }
        },
        {
            title: 'Last Login',
            dataIndex: 'last_login',
            sorter: (a: any, b: any) => new Date(a.last_login).getTime() - new Date(b.last_login).getTime(),
            render: (value: any) => {
                const date = dayjs(value.last_login).format("DD/MM/YYYY")
                return <span>{date}</span>
            }
        },
        {
            title: 'Trade Account',
            dataIndex: 'trade_account',
            sorter: (a: any, b: any) => {
                return a?.trade_account?.company_name.localeCompare(b?.trade_account?.company_name)
            },
            render: (value: any) => {
                return value.company_name
            }
        },
        {
            title: 'Created',
            dataIndex: 'created',
            sorter: (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            render: (val: any) => {
                const date = dayjs(val.date).format("DD/MM/YYYY")
                const user = val.name
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{date}</span>
                    </div>
                    <div className="flex justify-start gap-1">
                        <span>by {user || '-'}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="edit">
                            <Link href={routes.eCommerce.editUsers(row.id)}>
                                Edit
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="delete">
                            <Popover
                                title='Delete Users'
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
            return item?.firstname.toLowerCase().includes(search) ||
                item?.last_name.toLowerCase().includes(search)
        });
        setFilteredData(result);
    };

    useEffect(() => {
        setData(usersData)
        if (!search) {
            setFilteredData(usersData)
        }
    }, [usersData, search])

    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Users
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
                                btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                                icon={<PlusCircleOutlined />}
                                label='Add Users'
                                link={routes.eCommerce.createUsers}
                            />
                        </div>

                    </div>
                    <TableProduct
                        columns={columns}
                        dataSource={filteredData}
                        withSelectableRows
                    />
                </div>
            </Content>
        </>
    )
}

export default index
