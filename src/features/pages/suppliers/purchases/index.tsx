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
import { purchases, PurchasesType } from '@/plugins/types/suppliers-type'
import { deletePurchases } from '@/services/purchases-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { purchaseSupplierAtom } from '@/store/SuppliersAtom'
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

const index = ({ purchasesData }: { purchasesData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(purchaseSupplierAtom)
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState<PurchasesType[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentOrder, setCurrentOrder] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
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
            title: 'Purchases',
        },
    ]
    const columns: TableColumnsType<PurchasesType> = [
        {
            title: 'Order ID',
            dataIndex: 'order_id',
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier_name',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            render: (val) => {
                return <span>${val}</span>
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (val) => {
                const status = val ? stripHTML(val) : '';
                return <StatusTag status={status} />
            }
        },
        {
            title: 'Email Status',
            dataIndex: 'email_status',
            render: (val) => {
                const status = val ? stripHTML(val) : '';
                return <StatusTag status={status} />
            }
        },
        {
            title: 'Created',
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
                        <Menu.Item key="status" onClick={actionStatus}>
                            {stripHTML(row?.status)}
                        </Menu.Item>
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
                                Packing Slip
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
                    <div className="flex items-center justify-end gap-3 pe-4">
                        <ButtonIcon
                            color='primary'
                            variant='filled'
                            size="small"
                            icon={PencilIconBlue}
                        // onClick={() => router.push(routes.eCommerce.editAttributes(row.id))}
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
        setData(purchases)
    }, [purchases])
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Purchases
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
                        label='Add Purchase'
                        link={routes.eCommerce.createPurchases}
                    />
                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360 }}>
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
