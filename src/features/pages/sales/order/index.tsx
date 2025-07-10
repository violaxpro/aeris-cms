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
            title: 'Order ID',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.id - b.id,
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>Order Id</span>
                        <span>:</span>
                        <span>{row.id}</span>
                    </div>
                    <div className="flex justify-start gap-1">
                        <span>PO Number</span>
                        <span>:</span>
                        <span>{row.status !== 'Draft' ? row.po_number : '-'}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a: any, b: any) => a.email.localeCompare(b.email),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>Email</span>
                        <span>:</span>
                        <span>{row.email}</span>
                    </div>
                    <div className="flex justify-start gap-1">
                        <span>Phone</span>
                        <span>:</span>
                        <span>{row.mobile_number}</span>
                    </div>
                </div>
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
                let payment_status
                if (row.paid_amount === 0) {
                    payment_status = 'Waiting for Payment'
                } else if (row.paid_amount < row.total) {
                    payment_status = 'Partially Paid'
                } else if (row.paid_amount >= row.total) {
                    payment_status = 'Paid'
                }
                return (
                    <div className="flex flex-col w-full">
                        <div className="flex justify-start gap-1">
                            <span>Method</span>
                            <span>:</span>
                            <span>{row.payment_method}</span>
                        </div>
                        <div className="flex justify-start gap-1">
                            <span>Status</span>
                            <span>:</span>
                            <span>{payment_status || '-'}</span>
                        </div>
                    </div>
                )

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
                const status = val.toUpperCase()
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
            title: 'Created',
            dataIndex: 'created_by',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => {
                return new Date(a.created_by).getTime() - new Date(b.created_by).getTime()
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
        {
            title: 'Modified',
            dataIndex: 'modified',
            sorter: (a: any, b: any) => {
                return new Date(a.modified).getTime() - new Date(b.modified).getTime()
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
                const menu = (
                    <Menu>
                        <Menu.Item key="status" onClick={actionStatus}>
                            {row?.status}
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
                        {/* <Menu.Item key="serialNumber">
                            <Link href={routes.eCommerce.createSerialNumber(row.id)}>
                                Serial Number
                            </Link>
                        </Menu.Item> */}
                        <Menu.Item key="reverse">
                            <Link href={routes.eCommerce.editOrder(row.id)}>
                                Reverse
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="delete">
                            <Popover
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
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Order
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>
            <Content className="mt-6 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-between mb-4'>
                        <Button
                            label='Add Payment'
                            btnClassname='!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]'
                            onClick={handleClickModalPaid}
                        />
                        <div className='flex items-center gap-2'>
                            <SearchInput onSearch={handleSearch} />
                            <Button
                                label='Filter'
                                icon={<FilterOutlined />}
                                onClick={() => setisOpenModalFilter(true)}
                            />
                            <Button
                                btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                                icon={<PlusCircleOutlined />}
                                label='Add Order'
                                link={routes.eCommerce.createOrder}
                            />
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={finalData}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                    />
                </div>
            </Content>
            <Modal
                title='Filter Order'
                open={isOpenModalFilter}
                handleCancel={() => setisOpenModalFilter(false)}
                isBtnSave={true}
                handleSubmit={handleApplyFilter}
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
