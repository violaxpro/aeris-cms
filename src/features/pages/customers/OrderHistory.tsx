'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
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

const index = ({ orderData }: { orderData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(orderAtom)
    const [activeTab, setActiveTab] = useState<string>('all');
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenModalPaid, setisOpenModalPaid] = useState(false)
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [filteredData, setFilteredData] = useState<OrderType[]>([])
    const [valueStatus, setValueStatus] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
    const [search, setSearch] = useState('')
    const [isApproved, setIsApproved] = useState(false)
    const [paid, setPaid] = useState('')
    const [payment, setPayment] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [date, setDate] = useState<any | null>(null);
    const [currentOrder, setCurrentOrder] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleDateChange = (date: any, dateString: string | string[]) => {
        console.log('Selected date:', dateString);
        setDate(date);
    };

    const dataByStatus = activeTab == 'all'
        ? data
        : data.filter((order: OrderType) => {
            return order.status.toLowerCase() === activeTab.toLowerCase();
        })
    const finalData = (!search ? dataByStatus : filteredData).filter(item => {
        if (!filterStatus || filterStatus === 'all') return true;
        return item.status.toLowerCase() === filterStatus.toLowerCase();
    });

    // const dataFromLocalStorage = localStorage.getItem('products');
    // const products = dataFromLocalStorage ? JSON.parse(localStorage.getItem('products') || '{}') : [];
    // orderData.push(products)

    // console.log(orderData);

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
        setData(prev =>
            prev.map(order => {
                if (order.id === id) {
                    const newPaidAmount = Number(order.paid_amount || 0) + Number(paid);
                    return { ...order, paid_amount: newPaidAmount };
                }
                return order;
            })
        );
        notifySuccess('Balance is accepted')
        setTimeout(() => {
            setisOpenModalPaid(false)
        }, 2000);
    }

    const handleApplyFilter = () => {
        if (valueStatus === 'all') {
            setFilteredData(data);
        } else {
            setFilterStatus(valueStatus)
            const result = data.filter((item: any) => {
                return item.status.toLowerCase() === valueStatus.toLowerCase();
            });
            setFilteredData(result);
        }
        setisOpenModalFilter(false);
    };

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
            title: 'Order',
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
            title: 'Contact',
            dataIndex: 'email',
            sorter: (a: any, b: any) => a.email.localeCompare(b.email),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.email}</span>
                        <Image
                            src={CopyPasteIcon}
                            alt='copypaste-icon'
                            width={10}
                            height={10}
                        />
                    </div>
                    <div className="flex justify-start gap-1">
                        <span>{row.mobile_number}</span>
                        <Image
                            src={CopyPasteIcon}
                            alt='copypaste-icon'
                            width={10}
                            height={10}
                        />
                    </div>
                </div>
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                const status = ['Draft', 'Approved', 'Processing', 'Awaiting Stock', 'Packed', 'Ready for Pickup', 'Shipped', 'In Transit',
                    'Out of Delivery'
                ];
                return status.indexOf(a.status) - status.indexOf(b.status
                )
            },
            render: (val: any) => {
                const status = val
                console.log(status)
                return (
                    <StatusTag status={status} type='order' />
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
            title: 'Payment',
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
                return (
                    <div className="flex flex-col w-full">
                        <div className="flex justify-start gap-1">
                            <span>{row.payment_method}</span>
                        </div>
                        <div className="flex justify-start gap-1">
                            <StatusBadge status={row.payment_status} />
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
                        <span>${row.total}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Created By',
            dataIndex: 'created_by',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => {
                return dayjs(a.created_by).valueOf() - dayjs(b.created_by).valueOf()
            },
            render: (_: any, row: any) => {
                const date = dayjs(row.date).format("DD/MM/YYYY")
                const user = row.name
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
                return dayjs(a.modified).valueOf() - dayjs(b.modified).valueOf()
            },
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

    const handleSearch = (value: string) => {
        const search = value.toLowerCase()
        setSearch(search)
        const result = dataByStatus.filter((item: any) => {
            const formattedDate = dayjs(item?.createdAt).format('DD MMMM, YYYY').toLowerCase();
            return item?.po_number.toLowerCase().includes(search) ||
                formattedDate.includes(search);
        });
        setFilteredData(result);
    };

    useEffect(() => {
        setData(orderData)
        if (!search) {
            setFilteredData(orderData)
        }
    }, [orderData, search])

    console.log(currentOrder)

    console.log(!search ? dataByStatus : filteredData, filteredData, valueStatus)
    return (
        <>
            {contextHolder}
            <div className='flex flex-col gap-8'>
                <div className='flex justify-between mt-4 items-center'>
                    <div>
                        <h4 className="text-2xl font-semibold">Order History</h4>
                        <p className="mt-2">Orders History Information</p>
                    </div>
                    <SearchTable
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onSearch={() => console.log('Searching for:', search)}
                    />
                </div>
                <div>
                    <Table
                        columns={columns}
                        dataSource={finalData}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                        detailRoutes={(slug: any) => routes.eCommerce.detailOrder(slug)}
                        getRowValue={(record: any) => record.invoice_number}
                    />
                    <Pagination
                        current={currentPage}
                        total={finalData.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>

        </>
    )
}

export default index
