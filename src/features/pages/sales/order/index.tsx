'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType, MenuProps } from 'antd'
import { Dropdown, Menu } from 'antd'
import { EditOutlined, PlusCircleOutlined, FilterOutlined, MoreOutlined } from '@ant-design/icons'
import Popover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import Input from '@/components/input'
import { Content } from 'antd/es/layout/layout'
import Tabs, { Tab } from '@/components/tab'
import Button from "@/components/button"
import SelectInput from '@/components/select'
import SearchInput from '@/components/search';
import Modal from '@/components/modal'
import { deleteSupplierList } from '@/services/supplier-list-service'
import { deleteOrder, getOrder } from '@/services/order-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { orderAtom } from '@/store/SalesAtom'
import { OrderType } from '@/plugins/types/sales-type'
import dayjs from 'dayjs';
import DatePickerInput from '@/components/date-picker';
import StatusTag from '@/components/tag'
import StatusBadge from '@/components/badge/badge-status'
import Pagination from '@/components/pagination'
import {
    MoreIcon,
    TrashIconRed,
    FilterIcon,
    AddIcon,
    PrintIconBlack,
    EmailBlackIcon,
    StatusIcon,
    CopyPasteIcon,
    DuplicateIcon,
    WalletIcon
} from '@public/icon'
import Image from 'next/image'
import ButtonIcon from '@/components/button/ButtonIcon'
import ButtonAction from '@/components/button/ButtonAction'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ConfirmModal from '@/components/modal/ConfirmModal'
import { toCapitalize } from '@/plugins/utils/utils'
import { notificationAtom } from '@/store/NotificationAtom'

const index = ({ orderData }: { orderData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useState(orderData?.data || [])
    const [currentPage, setCurrentPage] = useState(orderData?.page || 1)
    const [pageSize, setPageSize] = useState(orderData?.perPage || 10)
    const [total, setTotal] = useState(orderData?.count || 0)
    const [notification, setNotification] = useAtom(notificationAtom);
    const [activeTab, setActiveTab] = useState<string>('all');
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenModalPaid, setisOpenModalPaid] = useState(false)
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [valueStatus, setValueStatus] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
    const [search, setSearch] = useState('')
    const [isApproved, setIsApproved] = useState(false)
    const [paid, setPaid] = useState('')
    const [payment, setPayment] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [date, setDate] = useState<any | null>(null);
    const [currentOrder, setCurrentOrder] = useState<any>(null)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)

    const handleDateChange = (date: any, dateString: string | string[]) => {
        console.log('Selected date:', dateString);
        setDate(date);
    };

    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }

    const dataByStatus = activeTab == 'all'
        ? data
        : data.filter((order: OrderType) => {
            return order.status.toLowerCase() === activeTab.toLowerCase();
        })

    const tabs: Tab[] = [
        { key: 'all', label: 'All', count: data.length },
        // { key: 'draft', label: 'Draft', count: data.filter(o => o.status === 'Draft').length },
        // { key: 'approved', label: 'Approved', count: data.filter(o => o.status === 'Approved').length },
        // { key: 'processing', label: 'Processing', count: data.filter(o => o.status === 'Processing').length },
        // { key: 'awaiting stock', label: 'Awaiting Stock', count: data.filter(o => o.status === 'Awaiting Stock').length },
        // { key: 'packed', label: 'Packed', count: data.filter(o => o.status === 'Packed').length },
        // { key: 'ready for pickup', label: 'Ready for Pickup', count: data.filter(o => o.status === 'Ready for Pickup').length },
        // { key: 'shipped', label: 'Shipped', count: data.filter(o => o.status === 'Shipped').length },
        // { key: 'in transit', label: 'In Transit', count: data.filter(o => o.status === 'In Transit').length },
        // { key: 'out of delivery', label: 'Out of Delivery', count: data.filter(o => o.status === 'Out of Delivery').length },
        // { key: 'delivered', label: 'Delivered', count: data.filter(o => o.status === 'Delivered').length },
    ];

    const options = [
        { label: 'All', value: 'all' },
        { label: 'Draft', value: 'draft' },
        { label: 'Approved', value: 'approved' },
        { label: 'Processing', value: 'processing' },
        { label: 'Awaiting Stock', value: 'awaiting stock' },
        { label: 'Packed', value: 'packed' },
        { label: 'Ready for Pickup', value: 'ready for pickup' },
        { label: 'Shipped', value: 'shipped', },
        { label: 'In Transit', value: 'in transit' },
        { label: 'Out of Delivery', value: 'out of delivery' },
        { label: 'Delivered', value: 'delivered' },
    ]
    // const dataFromLocalStorage = localStorage.getItem('products');
    // const products = dataFromLocalStorage ? JSON.parse(localStorage.getItem('products') || '{}') : [];
    // orderData.push(products)

    // console.log(orderData);

    const handleDelete = async () => {
        if (!deletedData) return
        try {
            const res = await deleteOrder(deletedData)
            if (res.success) {
                notifySuccess(res.message)
                //    fetchPage(currentPage, pageSize)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setOpenModalDelete(false)
            setDeletedData(null)
        }
    }

    const handleClickModalApproved = () => {
        setIsOpenModal(true)
    }

    const handleClickModalPaid = () => {
        setisOpenModalPaid(true)
    }

    const handleApproved = () => {
        setIsOpenModal(false)
    }

    const handleCancelApproved = () => {
        setIsOpenModal(false)
    }

    const handleChangePaid = (e: any) => {
        const value = e.target.value
        setPaid(value)
    }

    const handleSavePaid = (id: number | string) => {
        // setData(prev =>
        //     prev.map(order => {
        //         if (order.id === id) {
        //             const newPaidAmount = Number(order.amount || 0) + Number(paid);
        //             return { ...order, paid_amount: newPaidAmount };
        //         }
        //         return order;
        //     })
        // );
        notifySuccess('Balance is accepted')
        setTimeout(() => {
            setisOpenModalPaid(false)
        }, 2000);
    }

    const handleMultiDelete = () => {
        console.log('Yang mau dihapus:', selectedRowKeys);
        // filter data pakai selectedRowKeys
    };


    const handleProcessOrder = () => {
        console.log('orderan di proses')
    }

    const handleStatusAction = (status: string, id: number) => {
        switch (status) {
            case 'Draft':
                // aksi draft
                break;
            case 'Approved':
                setIsOpenModal(true)
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
            title: 'Invoice / Order',
        },
    ]
    const columns: TableColumnsType<OrderType> = [
        {
            title: 'Invoice Number',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.invoice_number.localeCompare(b.invoice_number),
            render: (_: any, row: any) => {
                return <Link href={routes.eCommerce.detailOrder(row.invoice_number)}>
                    {row.invoice_number}
                </Link>
                // return row.status !== 'Draft'
                //     ? <Link href={routes.eCommerce.detailOrder(row.po_number)}>
                //         {row.po_number}
                //     </Link>
                //     : <span>-</span>

            }
        },
        {
            title: 'Customer Name',
            dataIndex: 'customer_name',
            sorter: (a: any, b: any) => a.email.localeCompare(b.email),
            render: (_: any, row: any) => {
                return <span>Customer</span>
            }
        },
        {
            title: 'Contact Detail',
            dataIndex: 'email',
            sorter: (a: any, b: any) => a.email.localeCompare(b.email),
            render: (_: any, row: any) => {
                const handleCopy = () => {
                    const text = 'copy email'
                    navigator.clipboard.writeText(text);
                    alert(`Copied: ${text}`);
                }
                return <div className="flex flex-col w-full" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-start gap-1">
                        <span>{row.email || 'user@gmail.com'}</span>
                        <Image
                            src={CopyPasteIcon}
                            alt='copypaste-icon'
                            width={10}
                            height={10}
                            onClick={handleCopy}
                        />
                    </div>
                    <div className="flex justify-start gap-1">
                        <span>{row.mobile_number || '628229019021203'}</span>
                        <Image
                            src={CopyPasteIcon}
                            alt='copypaste-icon'
                            width={10}
                            height={10}
                            onClick={handleCopy}
                        />
                    </div>
                </div>
            }
        },
        {
            title: 'Order Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                const status = ['Draft', 'Approved', 'Processing', 'Awaiting Stock', 'Packed', 'Ready for Pickup', 'Shipped', 'In Transit',
                    'Out of Delivery'
                ];
                return status.indexOf(toCapitalize(a.status)) - status.indexOf(toCapitalize(b.status))
            },
            render: (val: any) => {
                const status = toCapitalize(val)
                console.log(status)
                return (
                    <StatusTag status={status} />
                );
                // kalau dia sudah bayar full baru bisa di lanjut ke processing
                // kalau processing sudah beres bisa di klik dan lanjut ke proses awaiting stock
                // awaiting beres -> packed
                // packed -> ready for pickup
                // ready for pickup -> shipped
                // shipping -> in transit
                // out of delivey -> delivered
            }
        },
        {
            title: 'Payment Status',
            dataIndex: 'payment_method',
            sorter: (a: any, b: any) => {
                const paymentMethod = ['Bank Transfer', 'Credit Card', 'Paypal'];
                return paymentMethod.indexOf(a.payment_method) - paymentMethod.indexOf(b.payment_method)

            },
            render: (_: any, row: any) => {
                // let payment_status
                // if (row.paid_amount === 0) {
                //     payment_status = 'Waiting for Payment'
                // } else if (row.paid_amount < row.total) {
                //     payment_status = 'Partially Paid'
                // } else if (row.paid_amount >= row.total) {
                //     payment_status = 'Paid'
                // }
                const payment_status = toCapitalize(row?.payment_status)
                return (
                    <div className="flex flex-col w-full">
                        <div className="flex justify-start gap-1">
                            <span>{row.payment_method || 'Credit Card'}</span>
                        </div>
                        <div className="flex justify-start gap-1">
                            <StatusBadge status={payment_status} />
                        </div>
                    </div>
                )

            }
        },

        {
            title: 'Total',
            dataIndex: 'total',
            sorter: (a: any, b: any) => a.email.localeCompare(b.email),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>${row.total || row.total_amount}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Created By',
            dataIndex: 'created_by',
            sorter: (a: any, b: any) => {
                return dayjs(a?.created_by?.date).valueOf() - dayjs(b?.created_by?.date).valueOf()
            },
            render: (_: any, row: any) => {
                const date = dayjs(row?.created_by?.date).format("DD/MM/YYYY")
                const user = row?.created_by?.name
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
            title: 'Modified By',
            dataIndex: 'modified',
            sorter: (a: any, b: any) => {
                return dayjs(a?.modified?.date).valueOf() - dayjs(b?.modified?.date).valueOf()
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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => {
                const status: Record<string, () => void> = {
                    'Draft': () => handleStatusAction('Draft', row.id),
                    'Approved': () => handleStatusAction('Approved', row.id),
                    'Processing': () => handleStatusAction('Processing', row.id),
                    'Awaiting Stock': () => handleStatusAction('Awaiting Stock', row.id),
                    'Packed': () => handleStatusAction('Packed', row.id),
                    'Ready for Pickup': () => handleStatusAction('Ready for Pickup', row.id),
                    'Shipped': () => handleStatusAction('Shipped', row.id),
                    'In Transit': () => handleStatusAction('In Transit', row.id),
                    'Out of Delivery': () => handleStatusAction('Out of Delivery', row.id),
                    'Delivered': () => handleStatusAction('Delivered', row.id),
                }
                const actionStatus = status[row.status] || ''
                const items: MenuProps['items'] = [
                    {
                        key: 'edit',
                        label: <Link href={routes.eCommerce.editOrder(row.id)}>
                            Edit
                        </Link>
                    },
                    {
                        key: 'delete',
                        label: <div className='cursor-pointer' onClick={() => handleOpenModalDelete(row.id)}>
                            Delete
                        </div>
                    },
                    {
                        key: 'detail',
                        label: <Link href={routes.eCommerce.detailOrder(row.id)}>
                            Detail
                        </Link>
                    },
                    row.status === 'Approved' && {
                        key: 'tracking',
                        label: (
                            <Link href={routes.eCommerce.detailOrder(row.invoice_number)}>
                                Tracking Number
                            </Link>
                        ),
                    },
                    {
                        key: 'create-po',
                        label: <Link href={routes.eCommerce.createPurchases}>
                            Create PO
                        </Link>
                    },
                    {
                        key: 'packing-slip',
                        label: <Link href={routes.eCommerce.detailPackingSlip(row.invoice_number)}>
                            Packing Slip
                        </Link>
                    },
                ].filter(Boolean) as MenuProps['items']

                return (
                    <div className='flex items-center gap-2' onClick={(e) => e.stopPropagation()} >
                        <Dropdown menu={{ items }} trigger={['click']} >
                            <ButtonIcon
                                color='primary'
                                variant='filled'
                                size="small"
                                icon={MoreIcon}
                            />
                        </Dropdown >
                    </div>
                );
            }
        },
    ]


    // const paymentStatusColumn = {
    //     title: 'Payment Status',
    //     dataIndex: 'payment_status',
    //     sorter: (a: any, b: any) => {
    //         const order = ['Unpaid', 'Verification', 'Paid', 'Refunded'];
    //         return order.indexOf(a.payment_status) - order.indexOf(b.payment_status);
    //     },
    //     render: (_: any, row: any) => {
    //         let payment_status
    //         if (row.paid_amount === 0) {
    //             payment_status = 'Waiting for Payment'
    //         } else if (row.paid_amount < row.total) {
    //             payment_status = 'Partially Paid'
    //         } else if (row.paid_amount >= row.total) {
    //             payment_status = 'Paid'
    //         }
    //         return payment_status ?? '-'
    //     },
    // };

    // const columns: TableColumnsType<OrderType> =
    //     activeTab !== 'draft'
    //         ? [...baseColumns.slice(0, 5), paymentStatusColumn, ...baseColumns.slice(5)]
    //         : baseColumns;

    const filteredData = React.useMemo(() => {
        if (!search) return data;
        const keyword = search.toLowerCase();
        return data.filter((item: any) => {
            const formattedDate = dayjs(item?.created_at)
                .format('DD/MM/YYYY')
                .toLowerCase();
            return (
                item?.name.toLowerCase().includes(keyword) ||
                formattedDate.includes(keyword)
            );
        });
    }, [search, data]);

    // const fetchPage = async (page: number, perPage: number) => {
    //     try {
    //         const res = await getBrands({ page, perPage })
    //         setData(res.data)
    //         setTotal(res.count)
    //         setCurrentPage(res.page)
    //         setPageSize(res.perPage)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    useEffect(() => {
        if (notification) {
            notifySuccess(notification);
            setNotification(null);
        }
    }, [notification]);

    console.log(currentOrder)

    console.log(!search ? dataByStatus : filteredData, filteredData, valueStatus)
    return (
        <>
            {contextHolder}
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this order?'
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Invoice / Order
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
                        label='Add Invoice / Order'
                        link={routes.eCommerce.createOrder}
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
                                style={{ padding: '1.2rem 1.7rem' }}
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
                                    onClick={() => setisOpenModalFilter(true)}
                                    position='start'
                                    style={{ padding: '1.2rem 1.7rem' }}
                                    btnClassname='btn-delete-all'
                                />
                            </div>
                        }
                    </div>
                    <Table
                        columns={columns}
                        dataSource={orderData}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                        detailRoutes={(slug: any) => routes.eCommerce.detailOrder(slug)}
                        getRowValue={(record: any) => record.invoice_number}
                    // pagination={{
                    //     pageSize,
                    //     onShowSizeChange: (_, size) => setPageSize(size),
                    //     showQuickJumper: true,
                    //     total: data.length,
                    // }}
                    />
                    <Pagination
                        current={currentPage}
                        total={total}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </Content>
            <Modal
                title='Filter Order'
                open={isOpenModalFilter}
                handleCancel={() => setisOpenModalFilter(false)}
                isBtnSave={true}
            >
                <SelectInput
                    id='status'
                    label='Status'
                    value={valueStatus}
                    onChange={(e: any) => setValueStatus(e)}
                    options={options}
                />

            </Modal>
            <Modal
                title='Approved Order'
                open={isOpenModal}
                handleYes={handleApproved}
                handleNo={handleCancelApproved}
                isBtnPopover={true}
                handleCancel={handleCancelApproved}
            >
                <span>Are you sure to approved this order?</span>
            </Modal>
            <Modal
                title='Add Payment'
                open={isOpenModalPaid}
                isBtnSave={true}
                handleCancel={() => setisOpenModalPaid(false)}
                handleSubmit={() => handleSavePaid(currentOrder?.id)}
            >
                <div className='flex flex-col'>
                    <Input
                        id='paid'
                        label='Amount Paid'
                        value={currentOrder?.total}
                        type='number'
                        onChange={handleChangePaid}
                    />
                    <DatePickerInput
                        label='Date Paid'
                        value={date}
                        onChange={handleDateChange}
                    />
                    <SelectInput
                        id='status'
                        allowClear
                        label='Account'
                        value={valueStatus}
                        onChange={(e: any) => setValueStatus(e)}
                        options={options}
                    />
                    <Input
                        id='reference'
                        label='Reference'
                        value={paid}
                        type='string'
                        onChange={handleChangePaid}
                    />
                </div>

            </Modal>
        </>
    )
}

export default index
