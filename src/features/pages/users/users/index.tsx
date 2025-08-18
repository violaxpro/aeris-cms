'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { UserType } from '@/plugins/types/users-type'
import Image from 'next/image'
import { EditOutlined, PlusCircleOutlined, InfoCircleOutlined, MoreOutlined } from '@ant-design/icons'
import { AddIcon, FilterIcon, TrashIconRed, PencilIconBlue } from '@public/icon'
import Popover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import ButtonAction from '@/components/button/ButtonAction'
import SearchInput from '@/components/search';
import dayjs from 'dayjs'
import { deleteUser } from '@/services/users-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { userATom } from '@/store/UserAtom'
import StatusBadge from '@/components/badge/badge-status'
import ButtonIcon from '@/components/button/ButtonIcon'
import { useRouter } from 'next/navigation'
import ConfirmModal from '@/components/modal/ConfirmModal'
import Pagination from '@/components/pagination'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'

const index = ({ usersData }: { usersData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const router = useRouter()
    const [data, setData] = useAtom(userATom)
    const [filteredData, setFilteredData] = useState<UserType[]>([]);
    const [search, setSearch] = useState('')
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }
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
            dataIndex: 'name',
            render: (_: any, row: any) => {
                const first_name = row?.firstname
                const last_name = row?.lastname
                return (
                    <span>{row.name}</span>
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
            sorter: (a: any, b: any) => dayjs(a?.last_login).valueOf() - dayjs(b?.last_login).valueOf(),
            render: (value: any) => {
                const date = dayjs(value?.last_login).format("DD/MM/YYYY")
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
                return value?.company_name
            }
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            sorter: (a: any, b: any) => dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf(),
            render: (val: any) => {
                const date = dayjs(val?.date).format("DD/MM/YYYY")
                const user = val?.name
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

                return (
                    <div className="flex items-center justify-end gap-3 pe-4">
                        <ButtonIcon
                            color='primary'
                            variant='filled'
                            size="small"
                            icon={PencilIconBlue}
                            onClick={() => router.push(routes.eCommerce.editPriceLevel(row.id))}
                        />
                        <ButtonIcon
                            color='danger'
                            variant='filled'
                            size="small"
                            icon={TrashIconRed}
                            onClick={() => handleOpenModalDelete(row.id)}
                        />
                    </div >
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
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this user?'
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Users
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>

                    <Button
                        icon={<PlusCircleOutlined />}
                        label='Add User'
                        link={routes.eCommerce.createUsers}
                    />
                </div>

            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-between mb-4'>
                        <div className='flex items-center gap-2'>
                            <ShowPageSize
                                pageSize={pageSize}
                                onChange={setPageSize}
                            />
                            <ButtonAction
                                label='Filter by'
                                icon={<Image
                                    src={FilterIcon}
                                    alt='filter-icon'
                                    width={15}
                                    height={15}
                                />}
                                onClick={() => setisOpenModalFilter(true)}
                                position='end'
                            />
                            <SearchTable
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onSearch={() => console.log('Searching for:', search)}
                            />
                        </div>
                        {
                            selectedRowKeys.length > 0 && <ButtonAction
                                label='Delete All'
                                icon={<Image
                                    src={TrashIconRed}
                                    alt='trash-icon'
                                    width={10}
                                    height={10}
                                />}
                                onClick={() => setisOpenModalFilter(true)}
                                position='start'
                                btnClassname='btn-delete-all'
                            />
                        }


                    </div>
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                    />
                    <Pagination
                        current={currentPage}
                        total={filteredData.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </Content>
        </>
    )
}

export default index
