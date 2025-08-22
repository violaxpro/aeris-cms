'use client'
import React, { useState, useEffect } from 'react'
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
import { dummyPayments } from '@/plugins/types/suppliers-type'
import { deletePurchases } from '@/services/purchases-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { paymentAtom } from '@/store/SuppliersAtom'
import { stripHTML } from '@/plugins/validators/common-rules'
import StatusTag from '@/components/tag'
import dayjs from 'dayjs'
import Pagination from '@/components/pagination'
import {
    MoreIcon,
    TrashIconRed,
    AddIcon,
    PrintIconBlack,
    EmailBlackIcon,
    StatusIcon,
    DuplicateIcon,
    WalletIcon,
    PencilIconBlue
} from '@public/icon'
import Image from 'next/image'
import ButtonIcon from '@/components/button/ButtonIcon'
import ButtonAction from '@/components/button/ButtonAction'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ConfirmModal from '@/components/modal/ConfirmModal'
import { useRouter } from 'next/navigation'

const index = ({ paymentDatas }: { paymentDatas?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const router = useRouter()
    const [data, setData] = useAtom(paymentAtom)
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState<any[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentOrder, setCurrentOrder] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)

    const handleDelete = async (id: any) => {
        try {
            // const res = await deletePurchases(id)
            // if (res.success == true) {
            //     notifySuccess(res.message)
            //     setData(prev => prev.filter(item => item.id !== id))
            // }
        } catch (error) {
            console.error(error)
        }
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
            title: 'Suppliers',
        },
        {
            title: 'Payments',
        },
    ]
    const columns: TableColumnsType<any> = [
        {
            title: 'Payment Number',
            dataIndex: 'paymentNo',
            sorter: (a: any, b: any) => a?.paymentNo.localeCompare(b?.paymentNo)
        },
        {
            title: 'Supplier',
            dataIndex: 'supplierName',
            sorter: (a: any, b: any) => a?.supplierName.localeCompare(b?.supplierName)

        },
        {
            title: 'Payment / Scheduled Date',
            dataIndex: 'paymentDate',
            sorter: (a: any, b: any) => {
                return dayjs(a.paymentDate).valueOf() - dayjs(b.paymentDate).valueOf()
            },
            render: (_: any, row: any) => {
                const date = dayjs(row?.paymentDate).format('DD/MM/YYYY')
                return date
            }
        },
        {
            title: 'Method',
            dataIndex: 'method',
            sorter: (a: any, b: any) => a?.method.localeCompare(b?.method)

        },
        {
            title: 'Currency / Amount',
            width: 200,
            dataIndex: 'currency',
            sorter: (a: any, b: any) => a?.currency.localeCompare(b?.currency)

        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                const status = ['Scheduled', 'Pending', 'Approval', 'Released', 'Failed', 'Reconciled'];
                return status.indexOf(a.status) - status.indexOf(b.status)
            },
            render: (val) => {
                return <StatusTag status={val} />
            }
        },
        {
            title: 'Remittance Sent',
            dataIndex: 'remittanceSent',
            sorter: (a: any, b: any) => {
                const status = [true, false];
                return status.indexOf(a.status) - status.indexOf(b.status)
            },
            render: (val) => {
                const status = val == true ? 'Y' : 'N'
                return <span>{status}</span>
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
                        <Menu.Item key="delete" onClick={() => handleOpenModalDelete(row.id)}>
                            Delete
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <div className="flex items-center justify-end gap-3 pe-4" onClick={(e) => e.stopPropagation()}>
                        <ButtonIcon
                            color='primary'
                            variant='filled'
                            size="small"
                            icon={PencilIconBlue}
                            onClick={() => router.push(routes.eCommerce.editPayments(row.paymentNo))}
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

    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };

    useEffect(() => {
        setData(dummyPayments)
    }, [dummyPayments])
    return (
        <>
            {contextHolder}
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this payment?'
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Payments
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <Button
                        icon={<Image
                            src={AddIcon}
                            alt='add-icon'
                            width={15}
                            height={15}
                        />}
                        label='Add Payment'
                        link={routes.eCommerce.createPayments}
                    />
                </div>
            </div>
            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex justify-between mb-4 gap-2'>
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
                            selectedRowKeys.length > 0 &&
                            <div className='flex  gap-3'>
                                <ButtonAction
                                    icon={<Image
                                        src={PrintIconBlack}
                                        alt='print-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    label='Print'
                                    style={{ padding: '1.2rem 1.7rem' }}
                                    onClick={() => console.log('hi')}
                                />
                                <ButtonAction
                                    icon={<Image
                                        src={EmailBlackIcon}
                                        alt='email-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    label='Email'
                                    style={{ padding: '1.2rem 1.7rem' }}
                                    onClick={() => console.log('hi')}
                                />
                                <ButtonAction
                                    icon={<Image
                                        src={StatusIcon}
                                        alt='status-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    label='Status'
                                    style={{ padding: '1.2rem 1.7rem' }}
                                    onClick={() => console.log('hi')}
                                />
                                <ButtonAction
                                    icon={<Image
                                        src={DuplicateIcon}
                                        alt='duplicate-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    label='Duplicate'
                                    style={{ padding: '1.2rem 1.7rem' }}
                                    onClick={() => console.log('hi')}
                                />
                                {
                                    selectedRowKeys.length == 1 &&
                                    <ButtonAction
                                        icon={<Image
                                            src={WalletIcon}
                                            alt='paynow-icon'
                                            width={15}
                                            height={15}
                                        />}
                                        label='Pay Now'
                                        style={{ padding: '1.2rem 1.7rem' }}
                                        onClick={() => console.log('hi')}
                                    />
                                }
                                <ButtonAction
                                    label='Delete All'
                                    icon={<Image
                                        src={TrashIconRed}
                                        alt='trash-icon'
                                        width={10}
                                        height={10}
                                    />}
                                    // onClick={() => setisOpenModalFilter(true)}
                                    position='start'
                                    style={{ padding: '1.2rem 1.7rem' }}
                                    btnClassname='btn-delete-all'
                                />
                            </div>
                        }
                    </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                        detailRoutes={(slug) => routes.eCommerce.detailPayments(slug)}
                        getRowValue={(record) => record.paymentNo}
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
