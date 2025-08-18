'use client'
import React, { useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { Divider } from 'antd'
import { routes } from '@/config/routes'
import { Content } from 'antd/es/layout/layout'
import ButtonAction from '@/components/button/ButtonAction'
import Image from 'next/image'
import {
    PencilIconBlack,
    PrintIconBlack,
    ExportIcon,
    SentEmailIcon,
    ConvertIcon,
    ApproveIcon,
    DownloadIcon,
    TrackingIcon,
    SendIcon
} from '@public/icon'
import Button from '@/components/button'
import Table from '@/components/table'
import { QuoteType } from '@/plugins/types/sales-type'
import type { TableColumnsType } from 'antd'
import OrderSummary from '../OrderSummary'
import { statusMap } from '@/config/colors-status'
import dayjs from 'dayjs'
import { Card } from '@/components/card'
import { InfoItem } from '@/components/card/InfoItem'
import { useRouter } from 'next/navigation'
import { downloadInvoicePDF, previewAndPrintPDF } from '@/services/invoice-service'
import Modal from '@/components/modal'
import HoverPopover from '@/components/popover/HoverPopover'
import CheckboxInput from '@/components/checkbox'
import Input from '@/components/input'
import Pagination from '@/components/pagination'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ModalTrackingNumber from './ModalTrackingNumber'
import { useNotificationAntd } from '@/components/toast'

const DetailOrder = ({ slug, data }: { slug?: any, data: any }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [profitHidden, setProfitHidden] = useState(true)
    const [buyPriceHidden, setBuyPriceHidden] = useState(true)
    const [isOpenModalSupplier, setIsOpenModalSupplier] = useState(false)
    const [isOpenModalTracking, setIsOpenModalTracking] = useState(false)
    const [serialNumberData, setSerialNumberData] = useState<any>({
        pickId: [],
        packId: [],
        serialNumber: {},
        productFrom: ''
    })
    const [trackingNumberData, setTrackingNumberData] = useState<any>({
        courier: '',
        tracking_number: [{ value: '' }],
    })
    const [isSendTrackingNumber, setIsSendTrackingNumber] = useState(false)
    const [modalSerialNumber, setModalSerialNumber] = useState<{ open: boolean; row: any }>({ open: false, row: null })
    const [currentOrder, setCurrentOrder] = useState<any>(null)
    const [currentPageWarehouse, setCurrentPageWarehouse] = useState(1);
    const [pageSizeWarehouse, setPageSizeWarehouse] = useState(10);
    const [search, setSearch] = useState('')

    console.log(serialNumberData)

    const breadcrumb = [
        { title: 'Sales' },
        {
            title: 'Order', url: routes.eCommerce.order
        },
        { title: 'Detail' },
    ];

    const columns: TableColumnsType<QuoteType> = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            sorter: (a: any, b: any) => {
                return a?.sku.localeCompare(b?.sku)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.sku}</span>
                        {/* <span>{row.status !== 'Draft' ? row.po_number : '-'}</span> */}
                    </div>
                </div>
            }
        },
        {
            title: 'Description',
            dataIndex: 'name',
            sorter: (a: any, b: any) => {
                return a?.name.localeCompare(b?.name)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.name}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Unit Price',
            dataIndex: 'price',
            sorter: (a: any, b: any) => {
                return a?.price - b?.price
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>${row.price}</span>
                    </div>
                    <div className="flex justify-start gap-1">
                        {
                            buyPriceHidden ? <button onClick={() => setBuyPriceHidden(false)} className="text-[#3666AA] font-medium cursor-pointer">
                                Reveal
                            </button> : <span onClick={() => setBuyPriceHidden(true)} className='cursor-pointer'>Buy Price : {row?.price?.buying_price || 100}</span>
                        }
                    </div>
                </div>
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            sorter: (a: any, b: any) => {
                return a?.qty - b?.qty
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.qty}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Line Total',
            dataIndex: 'total',
            sorter: (a: any, b: any) => {
                return a?.total - b?.total
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>${row.total}</span>
                    </div>
                </div>
            }
        },

    ]


    const columnsSerialNumber: TableColumnsType<any> = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            sorter: (a: any, b: any) => {
                return a?.sku.localeCompare(b?.sku)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.sku}</span>
                        {/* <span>{row.status !== 'Draft' ? row.po_number : '-'}</span> */}
                    </div>
                </div>
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => {
                return a?.name.localeCompare(b?.name)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.name}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Serial Number',
            dataIndex: 'serial_number',
            sorter: (a: any, b: any) => {
                return a?.serial_number.localeCompare(b?.serial_number)
            },
            render: (_: any, row: any) => {
                const value = serialNumberData.serialNumber[row.id]
                    ? serialNumberData.serialNumber[row.id] == 'Empty' ? '' : serialNumberData.serialNumber[row.id]
                    : ''
                return <Input
                    id='serialNumber'
                    value={serialNumberData.serialNumber[row.id] || ''}
                    type='text'
                    placeholder="Select Serial Number"
                    onClick={() => {
                        // Buka modal dan kirim row.id
                        openSerialNumberModal(row);
                    }}
                    onChange={(e) => {
                        setSerialNumberData((prev: any) => ({
                            ...prev,
                            serialNumber: {
                                ...prev.serialNumber,
                                [row.id]: e.target.value
                            }
                        }))
                    }}
                />
            }
        },
        {
            title: 'Product From',
            dataIndex: 'product_from',
            sorter: (a: any, b: any) => {
                return a?.product_form.localeCompare(b?.product_form)
            },
            render: (_: any, row: any) => {
                return serialNumberData.productFrom[row.id] || ''
            }
        },
        {
            title: 'Pick',
            dataIndex: 'pick',
            sorter: (a: any, b: any) => {
                return a?.pick - b?.pick
            },
            render: (_: any, row: any) => {
                const isChecked = serialNumberData.pickId.includes(row.id);
                return <CheckboxInput
                    checked={isChecked}
                    onChange={(checked) => {
                        setSerialNumberData((prev: any) => ({
                            ...prev,
                            pickId: checked
                                ? [...prev.pickId, row.id] // add
                                : prev.pickId.filter((id: any) => id !== row.id) // remove
                        }));
                    }}
                />
            }
        },
        {
            title: 'Pack',
            dataIndex: 'pack',
            sorter: (a: any, b: any) => {
                return a?.pack - b?.pack
            },
            render: (_: any, row: any) => {
                const isChecked = serialNumberData.packId.includes(row.id);
                return <CheckboxInput
                    checked={isChecked}
                    onChange={(checked) => {
                        setSerialNumberData((prev: any) => ({
                            ...prev,
                            packId: checked
                                ? [...prev.packId, row.id] // add
                                : prev.packId.filter((id: any) => id !== row.id) // remove
                        }));
                    }}
                />
            }
        },

    ]

    const columnLogs: TableColumnsType<any> = [
        {
            title: 'Staff',
            dataIndex: 'staff',
            sorter: (a: any, b: any) => {
                return a?.staff.localeCompare(b?.staff)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.staff}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Internal Notes',
            dataIndex: 'internal_notes',
            sorter: (a: any, b: any) => {
                return a?.internal_notes.localeCompare(b?.internal_notes)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.internal_notes}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Update',
            dataIndex: 'update',
            sorter: (a: any, b: any) => {
                return a?.update.localeCompare(b?.update)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.update}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            sorter: (a: any, b: any) => {
                return a?.action.localeCompare(b?.action)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.action}</span>
                    </div>
                </div>
            }
        },
    ]

    const columnSuppliers: TableColumnsType<any> = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            sorter: (a: any, b: any) => {
                return a?.sku.localeCompare(b?.sku)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.sku}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Description',
            dataIndex: 'name',
            sorter: (a: any, b: any) => {
                return a?.name.localeCompare(b?.name)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.name}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Supplier & Buying Price',
            dataIndex: 'supplier',
            sorter: (a: any, b: any) => {
                const aName = a?.supplier?.[0]?.name || '';
                const bName = b?.supplier?.[0]?.name || '';
                return aName.localeCompare(bName);
            },
            render: (_: any, row: any) => {
                const suppliers = row?.supplier || []
                return <div className="flex flex-col w-full">
                    {
                        suppliers?.map((item: any, index: number) => (
                            <div key={index} className="flex justify-start gap-1">
                                {/* <HoverPopover
                                    key={index}
                                    content={<p>Buying Price : {item?.buying_price}</p>}
                                >
                                    <span>{item?.name}</span>
                                </HoverPopover> */}
                                <div className="flex justify-between w-full">
                                    <span className='w-25'>{item.name}</span>
                                    <span>:</span>
                                    <span className="whitespace-nowrap">${item.buying_price}</span>
                                </div>
                            </div>
                        ))
                    }

                </div>
            }
        },
    ]

    const columnWarehouse: TableColumnsType<any> = [
        {
            title: 'Warehouse Location',
            dataIndex: 'location',
            sorter: (a: any, b: any) => {
                return a?.location.localeCompare(b?.location)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.location}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Serial Number',
            dataIndex: 'serial_number',
            sorter: (a: any, b: any) => {
                return a?.serial_number.localeCompare(b?.serial_number)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.serial_number}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            sorter: (a: any, b: any) => {
                const aName = a?.supplier?.[0]?.name || '';
                const bName = b?.supplier?.[0]?.name || '';
                return a?.po_number.localeCompare(b?.po_number);
            },
            render: (_: any, row: any) => {
                return row.po_number
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a: any, b: any) => {
                return dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf();
            },
            render: (_: any, row: any) => {
                return row.date
            }
        },
        {
            render: (_: any, row: any) => {
                return <Button
                    label='Choose'
                    onClick={() => handleSelectSerialNumber(
                        modalSerialNumber?.row?.id,
                        row.serial_number,
                        row.location,
                        row.po_number
                    )}
                    shape='round'
                    hasHeight={false}
                />
            }
        },
    ]


    const invoiceData = {
        invoiceNumber: 'INV-2025-001',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        items: [
            { sku: '0317-8471', name: 'U-Prox Keyfob - White SMART9412', quantity: 2, unit_price: 141.44 },
            { sku: '0317-8471', name: 'Hikvision Wireless Repeater DS-PR1-WB', quantity: 3, unit_price: 235.36 },
        ],
        total: 250,
        subtotal: 879.98,
        gst: 56.00,
        freight: 15.00,
        unitPrice: 200,
        quantity: 10
    };

    const openSerialNumberModal = (row: any) => {
        setModalSerialNumber({ open: true, row });
    };

    // Saat user pilih serial number di modal:
    const handleSelectSerialNumber = (rowId: string, serial: string, warehouseName: string, poNumber: string) => {
        setSerialNumberData((prev: any) => ({
            ...prev,
            serialNumber: {
                ...prev.serialNumber,
                [rowId]: serial
            },
            productFrom: {
                ...prev.productFrom,
                [rowId]: `${warehouseName} - ${poNumber}`
            }
        }));

        // Tutup modal
        setModalSerialNumber({ open: false, row: null });
    };

    const handleTrackingChange = (field: string, value: any) => {
        setTrackingNumberData((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmitTracking = () => {
        console.log("Tracking data dikirim:", trackingNumberData);
        setIsSendTrackingNumber(true)
        setIsOpenModalTracking(false)
        // TODO: kirim ke API di sini
    };

    const handlePrint = async (data: any) => {
        await downloadInvoicePDF(data, 'order');
    }

    const handlePreview = async (data: any) => {
        await previewAndPrintPDF(data, 'order');
    }

    const handleSendTrackingNumber = () => {
        notifySuccess('Tracking Number has succesfully send!')
    }

    console.log(modalSerialNumber)
    return (
        <>
            {contextHolder}
            <Modal
                open={modalSerialNumber.open}
                handleCancel={() => setModalSerialNumber({ open: false, row: null })}
                title='Choose Serial Number'
                subtitle='Please choose serial number.'
            >
                <div className='flex justify-between mb-3'>
                    <div className='flex flex-col'>
                        <span className='text-2xl font-semibold'>{modalSerialNumber?.row?.sku}</span>
                        <span>{modalSerialNumber?.row?.name}</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <SearchTable
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onSearch={() => {
                                console.log('Searching for:', search)
                            }}
                        />
                        <ShowPageSize
                            pageSize={pageSizeWarehouse}
                            onChange={setPageSizeWarehouse}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <Table
                        columns={columnWarehouse}
                        dataSource={modalSerialNumber?.row?.warehouses}
                    />
                    <Pagination
                        current={currentPageWarehouse}
                        total={modalSerialNumber?.row?.warehouses.length}
                        pageSize={pageSizeWarehouse}
                        onChange={(page) => setCurrentPageWarehouse(page)}
                    />
                </div>
            </Modal>
            <Modal
                open={isOpenModalSupplier}
                title='Supplier'
                handleCancel={() => setIsOpenModalSupplier(false)}
            >
                <Table
                    columns={columnSuppliers}
                    dataSource={data?.product}
                />
            </Modal>
            <ModalTrackingNumber
                isModalOpen={isOpenModalTracking}
                handleCancel={() => setIsOpenModalTracking(false)}
                handleChange={handleTrackingChange}
                handleSubmit={handleSubmitTracking}
                formData={trackingNumberData}
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Order Detail
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <div className='flex gap-3'>
                        {
                            data?.status && data?.status?.toLowerCase() == 'draft' && <ButtonAction
                                icon={<Image
                                    src={SentEmailIcon}
                                    alt='sent-email-icon'
                                    width={15}
                                    height={15}
                                />}
                                label='Sent Email'
                            // link={routes.eCommerce.editQuote}
                            />
                        }
                        {
                            data?.status && data?.status?.toLowerCase() == 'sent' && <ButtonAction
                                icon={<Image
                                    src={ApproveIcon}
                                    alt='approve-icon'
                                    width={15}
                                    height={15}
                                />}
                                label='Approved'
                            // link={routes.eCommerce.editQuote}
                            />
                        }
                        {
                            isSendTrackingNumber &&
                            <ButtonAction
                                icon={<Image
                                    src={SendIcon}
                                    alt='send-icon'
                                    width={15}
                                    height={15}
                                />}
                                label='Send Tracking Number'
                                onClick={handleSendTrackingNumber}
                            />
                        }
                        {
                            data?.status && data?.status?.toLowerCase() == 'approved' &&
                            <div className='flex gap-3'>
                                <ButtonAction
                                    icon={<Image
                                        src={TrackingIcon}
                                        alt='tracking-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    label='Tracking Number'
                                    onClick={() => setIsOpenModalTracking(true)}
                                />
                                <ButtonAction
                                    icon={<Image
                                        src={ConvertIcon}
                                        alt='convert-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    label='Convert to Invoice'
                                // link={routes.eCommerce.editQuote}
                                />
                            </div>
                        }

                        <ButtonAction
                            icon={<Image
                                src={PencilIconBlack}
                                alt='pencil-icon'
                                width={15}
                                height={15}
                            />}
                            label='Edit'
                        // link={routes.eCommerce.editQuote}
                        />
                        <ButtonAction
                            icon={<Image
                                src={PrintIconBlack}
                                alt='print-icon'
                                width={15}
                                height={15}
                            />}
                            label='Print'
                            onClick={() => handlePreview(invoiceData)}
                        />
                        <Button
                            icon={<Image
                                src={ExportIcon}
                                alt='export-icon'
                                width={15}
                                height={15}
                            />}
                            label='Download PDF'
                            onClick={() => handlePrint(invoiceData)}
                        />
                        {/* <ButtonAction
                            icon={<Image
                                src={DownloadIcon}
                                alt='download-icon'
                                width={15}
                                height={15}
                            />}
                            label='Download PDF'
                            onClick={() => handlePrint(invoiceData)}
                        /> */}
                        {/* <Button
                            icon={<Image
                                src={ExportIcon}
                                alt='export-icon'
                                width={15}
                                height={15}
                            />}
                            label='Export'
                        // link={routes.eCommerce.editQuote}
                        /> */}
                    </div>

                </div>
            </div>
            <Content className="mb-5">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }} className='flex flex-col gap-6'>
                    <div className='grid grid-cols-12 gap-4'>
                        <Card title='Order Information' gridcols='grid-cols-4' className='col-span-8'>
                            <InfoItem label='Order Date' value='June 30, 2025' />
                            <InfoItem label='Shipping Method' value='Local Pickup' />
                            <InfoItem label='Order Reference' value='ORD-0925' />
                            <InfoItem label='Payment Method' value='Bank Transfer' />
                            <InfoItem label='PO Number' value='PO-2025-0034' />
                            <InfoItem label='Sales Person' value='Sales A' />
                            <InfoItem label='Order Status' value={data.status} textColor={statusMap[data?.status].textColor} />
                            <InfoItem label='Payment Status' value='Unpaid' />
                        </Card>

                        <Card title='Account Information' className='col-span-4'>
                            <InfoItem label='Customer Name' value='Customer A' />
                            <InfoItem label='Customer Email' value='customer@gmail.com' />
                            <InfoItem label='Customer Phone' value='+628 63 8765 5589' />
                            <InfoItem label='Customer Group' value='Distributor' />
                        </Card>
                    </div>
                    {
                        data?.status == 'Approved' &&
                        <div className='grid gap-4'>
                            <Card title='Tracking Number Information' gridcols='grid-cols-4'>
                                <InfoItem label='Customer Name' value='James Smith' />
                                <InfoItem label='Tracking Number 1' value='33AA1111111111111' />
                                <InfoItem label='Tracking Number 2' value='33AB2222222222222' />
                                <InfoItem label='Tracking Number 3' value='33AC3333333333333' />
                            </Card>
                        </div>
                    }
                    <div className='grid gap-4'>
                        <Card title='Address Information'>
                            <Card title='Billing Address'>
                                <InfoItem label='Customer Name' value='James Smith' />
                                <InfoItem label='Country' value='Australia' />
                                <InfoItem label='Billing Address' value='12 Garden Street, Carlton VIC 3053' />
                                <InfoItem label='City, State, Post Code' value='Carlton, Victoria, 3053' />
                            </Card>
                            <Card title='Shipping Address'>
                                <InfoItem label='Customer Name' value='James Smith' />
                                <InfoItem label='Country' value='Australia' />
                                <InfoItem label='Billing Address' value='22 Oakridge Avenue, Glen Waverley VIC 3150' />
                                <InfoItem label='City, State, Post Code' value='Glen Waverley, Victoria, 3150' />
                            </Card>
                        </Card>
                    </div>
                    <div>
                        <div className='flex justify-between my-2'>
                            <h4 className='text-xl font-semibold'>Item Ordered</h4>
                            <Button
                                label='View Supplier'
                                onClick={() => setIsOpenModalSupplier(true)}
                            />
                        </div>
                        <Table
                            columns={columns}
                            dataSource={data?.product}
                        />
                    </div>

                    <div className='grid grid-cols-12 gap-4'>
                        <Card title='Notes' className='col-span-9 flex flex-col justify-center'>
                            <InfoItem label='Delivery Notes' value='Picked 1 U-Prox Keyflo for Order #9821' />
                            <InfoItem label='Internal Notes' value='Picked 1 U-Prox Keyflo for Order #9821' />
                        </Card>
                        <div className='col-span-3 my-4'>
                            <OrderSummary
                                profitHidden={profitHidden}
                                onReveal={() => setProfitHidden(!profitHidden)}
                                profit={100}
                                subtotal={1130.4}
                                shippingFee={50}
                                discount={5}
                                gstRate={0.1}
                            />
                        </div>
                    </div>
                    <Divider />
                    <div className='grid gap-6'>
                        <div>
                            <h4 className='text-xl font-semibold'> Serial Number</h4>
                            <Table
                                columns={columnsSerialNumber}
                                dataSource={data?.serialNumbers}
                            />
                        </div>
                        <div>
                            <h4 className='text-xl font-semibold'>Last 5 Order Log</h4>
                            <Table
                                columns={columnLogs}
                                dataSource={[
                                    {
                                        staff: 'Rina',
                                        internal_notes: 'Picked 2 U-Prox Keyflo for Order #9821',
                                        update: '17/07/2025 08:00 AM',
                                        action: 'Pick'
                                    },
                                    {
                                        staff: 'Budi',
                                        internal_notes: 'Picked 2 U-Prox Keyflo for Order #9821',
                                        update: '17/07/2025 08:20 AM',
                                        action: 'Pack'
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default DetailOrder
