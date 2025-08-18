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
import { returnSalesAtom } from '@/store/SalesAtom'
import { ReturnSalesType } from '@/plugins/types/sales-type'
import dayjs from 'dayjs';
import DatePickerInput from '@/components/date-picker';
import StatusTag from '@/components/tag'
import { stripHTML } from '@/plugins/validators/common-rules'
import Pagination from '@/components/pagination'
import { MoreIcon, TrashIconRed, FilterIcon, AddIcon } from '@public/icon'
import Image from 'next/image'
import ButtonIcon from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ButtonDelete from '@/components/button/ButtonAction'
import ButtonFilter from '@/components/button/ButtonAction'
import ConfirmModal from '@/components/modal/ConfirmModal'

const index = ({ returnSales }: { returnSales?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(returnSalesAtom)
    const [activeTab, setActiveTab] = useState<string>('all');
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenModalPaid, setisOpenModalPaid] = useState(false)
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [filteredData, setFilteredData] = useState<ReturnSalesType[]>([])
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
        : data.filter((order: ReturnSalesType) => {
            return order.status.toLowerCase() === activeTab.toLowerCase();
        })
    const finalData = (!search ? dataByStatus : filteredData).filter(item => {
        if (!filterStatus || filterStatus === 'all') return true;
        return item.status.toLowerCase() === filterStatus.toLowerCase();
    });

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

    // const handleSavePaid = (id: number | string) => {
    //     setData(prev =>
    //         prev.map(order => {
    //             if (order.id === id) {
    //                 const newPaidAmount = Number(order.paid_amount || 0) + Number(paid);
    //                 return { ...order, paid_amount: newPaidAmount };
    //             }
    //             return order;
    //         })
    //     );
    //     notifySuccess('Balance is accepted')
    //     setTimeout(() => {
    //         setisOpenModalPaid(false)
    //     }, 2000);
    // }

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
            title: 'RMA',
        },
        {
            title: 'RMA Sales',
        },
    ]
    const columns: TableColumnsType<ReturnSalesType> = [
        {
            title: 'Order ID',
            dataIndex: 'order_id',
            sorter: (a: any, b: any) => a.order_id.localeCompare(b.order_id),
            render: (_: any, row: any) => {
                return row.order_id
            }
        },
        {
            title: 'Sales Person',
            dataIndex: 'sales_person',
            render: (_: any, row: any) => {
                return row.sales_person
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
                const status = stripHTML(val);
                const statusCapitalized = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
                return <StatusTag status={statusCapitalized} />
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
                            {stripHTML(row?.status)}
                        </Menu.Item>
                        <Menu.Item key="edit">
                            <Link href={routes.eCommerce.editReturnSales(row.id)}>
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
                    <div className='flex items-center gap-2' onClick={(e) => e.stopPropagation()}>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <ButtonIcon
                                color='primary'
                                variant='filled'
                                size="small"
                                icon={MoreIcon}
                            />
                        </Dropdown >
                        <ButtonIcon
                            color='danger'
                            variant='filled'
                            size="small"
                            icon={TrashIconRed}
                            onClick={(e) => {
                                e.stopPropagation()
                                handleOpenModalDelete(row.id)
                            }}
                        />
                    </div>
                );
            }
        },
    ]


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
        setData(returnSales)
        if (!search) {
            setFilteredData(returnSales)
        }
    }, [returnSales, search])

    console.log(data)

    return (
        <>
            {contextHolder}
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this rma sales?'
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Return Sales
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
                        label='Add Return'
                        link={routes.eCommerce.createReturnSales}
                    />
                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-between mb-4 gap-2'>
                        <div className='flex items-center gap-2'>
                            <ShowPageSize
                                pageSize={pageSize}
                                onChange={setPageSize}
                            />
                            <ButtonFilter
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
                            selectedRowKeys.length > 0 && <ButtonDelete
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
            // handleSubmit={() => handleSavePaid(currentOrder?.id)}
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
