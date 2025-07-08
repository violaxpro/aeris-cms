'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import Popover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import Input from '@/components/input'
import { Content } from 'antd/es/layout/layout'
import Tabs, { Tab } from '@/components/tab'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import Modal from '@/components/modal'
import { deleteSupplierList } from '@/services/supplier-list-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { orderAtom } from '@/store/SalesAtom'
import { OrderType } from '@/plugins/types/sales-type'
import dayjs from 'dayjs'

const index = ({ orderData }: { orderData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(orderAtom)
    const [activeTab, setActiveTab] = useState<string>('draft');
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenModalPaid, setisOpenModalPaid] = useState(false)
    const [filteredData, setFilteredData] = useState<OrderType[]>([])
    const [search, setSearch] = useState('')
    const [isApproved, setIsApproved] = useState(false)

    const tabs: Tab[] = [
        { key: 'draft', label: 'Draft' },
        { key: 'approved', label: 'Approved' },
        { key: 'processing', label: 'Processing' },
        { key: 'awaiting stock', label: 'Awaiting Stock' },
        { key: 'packed', label: 'Packed' },
        { key: 'ready for pickup', label: 'Ready for Pickup' },
        { key: 'shipped', label: 'Shipped' },
        { key: 'in transit', label: 'In Transit' },
        { key: 'out of delivery', label: 'Out of Delivery' },
        { key: 'delivered', label: 'Delivered' },
    ];
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

    const breadcrumb = [
        {
            title: 'Sales',
        },
        {
            title: 'Order',
        },
    ]
    const baseColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.id - b.id
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            sorter: (a: any, b: any) => a.po_number.localeCompare(b.po_number)
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a: any, b: any) => a.email.localeCompare(b.email)
        },
        {
            title: 'Phone',
            dataIndex: 'mobile_number',
            sorter: (a: any, b: any) => a.mobile_number.localeCompare(b.mobile_number)
        },
        {
            title: 'Payment Method',
            dataIndex: 'payment_method',
            sorter: (a: any, b: any) => {
                const paymentMethod = ['Bank Transfer', 'Credit Card', 'Paypal'];
                return paymentMethod.indexOf(a.payment_method) - paymentMethod.indexOf(b.payment_method)

            },
            render: (val: string) => {
                const paymentMethod = ['Bank Transfer', 'Credit Card', 'Paypal'];
                return val || '-'
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                const status = ['Pending', 'Processing', 'Tooltip', 'Completed', 'Refunded', 'Canceled'];
                return status.indexOf(a.status) - status.indexOf(b.status
                )
            },
            render: (val: any) => {
                const status = ['Draft', 'Approved', 'Processing', 'Awaiting Stock', 'Packed', 'Ready for Pickup', 'Shipped', 'In Transit',
                    'Out ot Delivery'
                ];

                // kalau dia sudah bayar full baru bisa di lanjut ke processing
                // kalau processing sudah beres bisa di klik dan lanjut ke proses awaiting stock
                // awaiting beres -> packed
                // packed -> ready for pickup
                // ready for pickup -> shipped
                // shipping -> in transit
                // out of delivey -> delivered
                return val
            }
        },
        {
            title: 'Created By',
            dataIndex: 'created_by',
            sorter: (a: any, b: any) => {
                return new Date(a.created_by).getTime() - new Date(b.created_by).getTime()
            },
            render: (val: any) => {
                const date = dayjs(val.date).format("DD MMMM, YYYY")
                const user = val.name
                return <span>{`${date}, by ${user}`}</span>
            }
        },
        {
            title: 'Modified',
            dataIndex: 'modified',
            sorter: (a: any, b: any) => {
                return new Date(a.modified).getTime() - new Date(b.modified).getTime()
            },
            render: (val: any) => {
                const date = dayjs(val.date).format("DD MMMM, YYYY")
                const user = val.name
                return <span>{`${date}, by ${user}`}</span>
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => (
                <div className="flex items-center justify-end gap-3 pe-4">
                    <Link href={routes.eCommerce.editOrder(row.id)}>
                        <EditOutlined />
                    </Link>
                    <Popover
                        title='Delete Order'
                        description='Are you sure to delete this data?'
                        onDelete={() => handleDelete(row.id)}
                    />
                </div >
            ),
        },
        {
            title: '',
            dataIndex: 'approved',
            key: 'approved',
            width: 120,
            render: (_: string, row: any) => (
                <div className="flex items-center justify-end gap-3 pe-4">
                    {
                        activeTab == 'draft' && <div>
                            <Button
                                label='Approved'
                                btnClassname='!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]'
                                onClick={handleClickModalApproved}
                            />
                            <Modal
                                title='Approved Order'
                                open={isOpenModal}
                                handleYes={handleApproved}
                                handleNo={handleCancelApproved}
                                isBtnPopover={true}
                            >
                                <span>Are you sure to approved this order?</span>
                            </Modal>
                        </div>
                    }
                    {
                        activeTab == 'approved' && <div>
                            <Button
                                label='Paid'
                                btnClassname='!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]'
                                onClick={handleClickModalPaid}
                            />
                            <Modal
                                title='Payment'
                                open={isOpenModalPaid}
                                isBtnSave={true}
                                handleCancel={() => setisOpenModalPaid(false)}
                            >
                                <Input
                                    id='paid'
                                    label='Input Paid'
                                    value={500}
                                    type='number'
                                />
                            </Modal>
                        </div>
                    }
                    {
                        activeTab == 'processing' && <div>
                            <Button
                                label='Processing'
                                btnClassname='!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]'
                                onClick={handleClickModalApproved}
                            />
                        </div>
                    }
                    {
                        activeTab == 'awaiting stock' && <div>
                            <Button
                                label='Awaiting Stock'
                                btnClassname='!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]'
                                onClick={handleClickModalApproved}
                            />
                        </div>
                    }
                    {
                        activeTab == 'packed' && <div>
                            <Button
                                label='Packed'
                                btnClassname='!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]'
                                onClick={handleClickModalApproved}
                            />
                        </div>
                    }
                    {
                        activeTab == 'ready for pickup' && <div>
                            <Button
                                label='Ready for Pickup'
                                btnClassname='!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]'
                                onClick={handleClickModalApproved}
                            />
                        </div>
                    }
                    {
                        activeTab == 'shipped' && <div>
                            <Button
                                label='Shipped'
                                btnClassname='!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]'
                                onClick={handleClickModalApproved}
                            />
                        </div>
                    }
                    {
                        activeTab == 'in transit' && <div>
                            <Button
                                label='In Transit'
                                btnClassname='!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]'
                                onClick={handleClickModalApproved}
                            />
                        </div>
                    }
                    {
                        activeTab == 'out of delivery' && <div>
                            <Button
                                label='Out of Delivery'
                                btnClassname='!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]'
                                onClick={handleClickModalApproved}
                            />

                        </div>
                    }

                </div >
            ),
        },

    ]

    const paymentStatusColumn = {
        title: 'Payment Status',
        dataIndex: 'payment_status',
        sorter: (a: any, b: any) => {
            const order = ['Unpaid', 'Verification', 'Paid', 'Refunded'];
            return order.indexOf(a.payment_status) - order.indexOf(b.payment_status);
        },
        render: (val: any) => val ?? '-',
    };

    const columns: TableColumnsType<OrderType> =
        activeTab !== 'draft'
            ? [...baseColumns.slice(0, 5), paymentStatusColumn, ...baseColumns.slice(5)]
            : baseColumns;

    const dataByStatus = data.filter((order: OrderType) => {
        return order.status.toLowerCase() === activeTab.toLowerCase();
    })

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

    // console.log(search !== '' ? dataByStatus : filteredData, search !== '', !search, search)
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
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <Content className="mt-6 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-end mb-4'>
                        <div className='flex items-center gap-2'>
                            <SearchInput onSearch={handleSearch} />
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
                        dataSource={!search ? dataByStatus : filteredData}
                        withSelectableRows
                    />
                </div>
            </Content>
        </>
    )
}

export default index
