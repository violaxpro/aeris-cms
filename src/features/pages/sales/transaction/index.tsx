'use client'
import React, { useEffect, useState } from 'react'
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
import { TransactionType } from '@/plugins/types/sales-type'
import { deletePurchases } from '@/services/purchases-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { transactionAtom } from '@/store/SalesAtom'
import dayjs from 'dayjs'
import Pagination from '@/components/pagination'
import { MoreIcon, TrashIconRed, FilterIcon, AddIcon } from '@public/icon'
import Image from 'next/image'
import ButtonAction from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ButtonDelete from '@/components/button/ButtonAction'
import ModalNotes from './ModalNotes'
import ConfirmModal from '@/components/modal/ConfirmModal'

const index = ({ transactionData }: { transactionData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(transactionAtom)
    const [search, setSearch] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalNotes, setIsOpenModalNotes] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)

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

    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }

    const handleStatusAction = (status: string, id: number) => {
        switch (status) {
            case 'Draft':
                // aksi draft
                break;
            case 'Waiting for Approval':
                // setIsOpenModal(true)
                break;
            case 'Approved':
                // setIsOpenModal(true)
                break;
            case 'Billed':
                // setIsOpenModal(true)
                break;
            default:
                break;
        }
    };

    const breadcrumb = [
        {
            title: 'Sales',
        },
        {
            title: 'Transaction',
        },
    ]
    const columns: TableColumnsType<TransactionType> = [
        {
            title: 'Order ID',
            dataIndex: 'order_id',
        },
        {
            title: 'Transaction ID',
            dataIndex: 'transaction_id',
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.transaction_id}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Payment Method',
            dataIndex: 'payment_method',
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.payment_method}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Created by',
            dataIndex: 'created',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => {
                return dayjs(a.created).valueOf() - dayjs(b.created).valueOf()
            },
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
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => {
                const status: Record<string, () => void> = {
                    'Draft': () => handleStatusAction('Draft', row.id),
                    'Waiting for Approval': () => handleStatusAction('Waiting for Approval', row.id),
                    'Approved': () => handleStatusAction('Approved', row.id),
                    'Billed': () => handleStatusAction('Billed', row.id),
                }
                const actionStatus = status[row.status] || ''
                const menu = (
                    <Menu>
                        <Menu.Item key="add-notes" onClick={() => setIsOpenModalNotes(true)}>
                            Add Notes
                        </Menu.Item>
                        <Menu.Item key="edit">
                            <Link href={routes.eCommerce.editPurchases(row.id)}>
                                Edit
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="detail">
                            <Link href={routes.eCommerce.editOrder(row.id)}>
                                Detail
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sendEmail">
                            <Link href={routes.eCommerce.sendEmail(row.id)}>
                                Send Email
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="print">
                            <Link href={routes.eCommerce.print(row.id)}>
                                Packing Slip
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="delete" onClick={() => {
                            handleOpenModalDelete(true)
                        }}>
                            Delete
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <div className='flex items-center gap-2' onClick={(e) => e.stopPropagation()}>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <ButtonAction
                                color='primary'
                                variant='filled'
                                size="small"
                                icon={MoreIcon}
                            />
                        </Dropdown >
                        <ButtonAction
                            color='danger'
                            variant='filled'
                            size="small"
                            icon={TrashIconRed}
                            onClick={(e) => {
                                e.stopPropagation()
                                handleOpenModalDelete(true)
                            }}
                        />
                    </div>
                );
            }
        },

    ]

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };

    useEffect(() => {
        setData(transactionData)
    }, [transactionData])

    console.log(selectedRowKeys.length > 0)

    return (
        <>
            {contextHolder}
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this transaction?'
            />
            <ModalNotes
                isModalOpen={isOpenModalNotes}
                setIsModalOpen={setIsOpenModalNotes}
            />
            <div className="mt-6 mx-6 mb-0">
                <h1 className='text-2xl font-bold'>
                    Transaction
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-between mb-4'>
                        <div className='flex items-center gap-2'>
                            <ShowPageSize
                                pageSize={pageSize}
                                onChange={setPageSize}
                            />

                            <SearchTable
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onSearch={() => console.log('Searching for:', search)}
                            />
                        </div>
                        {
                            selectedRowKeys.length > 0 && <ButtonDelete
                                label='Delete All'
                                icon={<Image
                                    src={TrashIconRed}
                                    alt='trash-icon'
                                    width={10}
                                    height={10}
                                />}
                                position='start'
                                style={{ padding: '1.2rem 1.7rem' }}
                                btnClassname='btn-delete-all'
                            />
                        }

                    </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                    />
                    <Pagination
                        current={currentPage}
                        total={data.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />

                </div>
            </Content>
        </>
    )
}

export default index
