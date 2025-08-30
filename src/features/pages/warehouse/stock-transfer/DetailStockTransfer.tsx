'use client'
import React, { useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { Divider } from 'antd'
import { routes } from '@/config/routes'
import { Content } from 'antd/es/layout/layout'
import ButtonAction from '@/components/button/ButtonAction'
import ButtonIcon from '@/components/button/ButtonIcon'
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
    SendIcon,
    CloudDownloadIcon,
    ArrowPreviewIcon
} from '@public/icon'
import Button from '@/components/button'
import Table from '@/components/table'
import { QuoteType } from '@/plugins/types/sales-type'
import type { TableColumnsType } from 'antd'
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
import { useNotificationAntd } from '@/components/toast'
import StatusTag from '@/components/tag'
import exampleImage from '@public/image/Payment Remittance Example.png';
import StepComponent from '@/components/step'
import { toCapitalize } from '@/plugins/utils/utils'

const DetailStockTransfer = ({ slug, data }: { slug?: any, data: any }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [profitHidden, setProfitHidden] = useState(true)
    const [buyPriceHidden, setBuyPriceHidden] = useState(true)
    const [openModalPreview, setOpenModalPreview] = useState(false)
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
    const [revealedRows, setRevealedRows] = useState<number[]>([]);


    const breadcrumb = [
        {
            title: 'Warehouse',
        },
        {
            title: 'Stock Transfers (Inter Warehouse)', url: routes.eCommerce.stockTransfer,
        },
        { title: 'Detail' },

    ]

    const columns: TableColumnsType<any> = [
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
            title: 'QTY Requested',
            dataIndex: 'qty_requested',
            sorter: (a: any, b: any) => {
                return a?.qty_requested - b?.qty_requested
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.qty_requested}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'QTY Shipped',
            dataIndex: 'qty_shipped',
            sorter: (a: any, b: any) => {
                return a?.qty_shipped - b?.qty_shipped
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.qty_shipped}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Qty Received',
            dataIndex: 'qty_received',
            sorter: (a: any, b: any) => {
                return a?.qty_received - b?.qty_received
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.qty_received}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Serial / Lots',
            dataIndex: 'serialsLots',
            sorter: (a: any, b: any) => {
                return a?.serialsLots.localeCompare(b?.serialsLots)
            },
            render: (_: any, row: any) => {
                const serialLot = row.serialsLots.map((item: any, index: number) => item).join(', ')
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{serialLot}</span>
                    </div>
                </div>
            }
        },

    ]

    const columnsReceipts: TableColumnsType<any> = [
        {
            title: 'GRN Number',
            dataIndex: 'grn_number',
            sorter: (a: any, b: any) => {
                return a?.grn_number.localeCompare(b?.grn_number)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.grn_number}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a: any, b: any) => {
                return dayjs(a?.date).valueOf() - dayjs(b?.date).valueOf()
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.date}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Receiver',
            dataIndex: 'receiver',
            sorter: (a: any, b: any) => {
                return a?.receiver.localeCompare(b?.receiver)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.receiver}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Discrepancies',
            dataIndex: 'iscrepancies',
            sorter: (a: any, b: any) => {
                return a?.discrepancies.localeCompare(b?.discrepancies)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.discrepancies}</span>
                    </div>
                </div>
            }
        },
    ]

    const columnsPutawayTask: TableColumnsType<any> = [
        {
            title: 'Target Bin',
            dataIndex: 'bin',
            sorter: (a: any, b: any) => {
                return a?.bin.localeCompare(b?.bin)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.bin}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (val: any) => {
                return <StatusTag status={val} />
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

    // console.log(modalSerialNumber, serialNumberData)
    return (
        <>
            {contextHolder}
            <Modal
                open={openModalPreview}
                handleCancel={() => setOpenModalPreview(false)}
                title='Remittance Advice'
                rightButton={<Button
                    icon={<Image
                        src={ExportIcon}
                        alt='export-icon'
                        width={15}
                        height={15}
                    />}
                    label='Download PDF'
                    onClick={() => console.log('download pdf')}
                />}
            >
                <div className='max-w-700 max-h-100'>
                    <Image
                        src={exampleImage}
                        alt="image"
                        width={700}
                        height={100}
                        className="block rounded-xl border !border-gray-300"
                    />
                </div>
            </Modal>
            <div className="mt-6 mx-6 mb-0">
                <div className='flex flex-col justify-start md:flex-row md:justify-between md:items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Stock Transfers (Inter Warehouse) Detail
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <div className='flex gap-3'>
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
                <div className='flex flex-col gap-6 min-h-[360px] p-6'>
                    <div className='grid gap-4'>
                        <Card title='Stock Transfers Information' gridcols='md:grid-cols-4 grid-cols-1' >
                            <InfoItem label='Transfer Number' value={data.transfer_number} />
                            <InfoItem label='From' value={data.from_warehouse} />
                            <InfoItem label='To' value={data.to_warehouse} />
                            <InfoItem label='Status' value={toCapitalize(data.status)} textColor={statusMap[toCapitalize(data?.status)]?.textColor} />
                        </Card>
                    </div>
                    <div>
                        <div className='flex justify-between my-2'>
                            <h4 className='text-xl font-semibold'>Product Lists</h4>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={[
                                {
                                    id: 1,
                                    sku: '0317-8471',
                                    description: 'U-Prox Keyfob White',
                                    qty_requested: 30,
                                    qty_shipped: 30,
                                    qty_received: 0,
                                    price: 1000,
                                    serialsLots: ['LOT-KEYW-20250801']
                                }
                            ]}
                        />
                    </div>
                    <div className='grid gap-4'>
                        <Card title='Logistic' gridcols='md:grid-cols-2 grid-cols-1' >
                            <div className='grid md:grid-cols-2 gap-3'>
                                <div className='col-span-full' >
                                    <h4 className='text-lg font-semibold'>Shipment</h4>
                                </div>
                                <InfoItem label='Shipment Carrier' value='DHL Express' />
                                <InfoItem label='Tracking Number' value='DHL987654321AU' />
                                <InfoItem label='Supporting Docs' value={
                                    <div className='flex gap-2 max-w-xs'>
                                        <ButtonAction
                                            label='PO-2025-00123.pdf'
                                            icon={<Image
                                                src={CloudDownloadIcon}
                                                alt='download-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            position='end'
                                            btnClassname='w-full'
                                            labelClassname='truncate block'
                                        />
                                        <ButtonAction
                                            label='PO-2025-00435.pdf'
                                            icon={<Image
                                                src={CloudDownloadIcon}
                                                alt='download-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            position='end'
                                            btnClassname='w-full'
                                            labelClassname='truncate block'
                                        />
                                    </div>
                                } />
                            </div>

                            <div className='grid md:grid-cols-2'>
                                <div className='col-span-full' >
                                    <h4 className='text-lg font-semibold'>In Transit</h4>
                                </div>
                                <div className='col-span-full'>
                                    <InfoItem label='In Transit Details' value={
                                        data?.from_warehouse ?

                                            <StepComponent
                                                current={1}
                                                items={[
                                                    {
                                                        label: "From",
                                                        date: "26 Aug, 2025, 09:15",
                                                        title: "Departed Seaden Parramatta",
                                                        status: "finish",
                                                    },
                                                    {
                                                        label: "Now",
                                                        date: "26 Aug, 2025, 18:40",
                                                        title: "Departed Sydney Hub",
                                                        status: "process",
                                                    },
                                                    {
                                                        label: "Expected Arrival",
                                                        date: "28 August, 2025",
                                                        title: "ETA Melbourne Warehouse",
                                                        status: "wait",
                                                    },
                                                ]}
                                            />
                                            : 'None'
                                    } />
                                </div>

                            </div>
                        </Card>
                    </div>

                    {/* <div>
                        <div className='flex justify-between my-2'>
                            <h4 className='text-xl font-semibold'>Receipts (GRN)</h4>
                        </div>
                        <Table
                            columns={columnsReceipts}
                            dataSource={[
                                {
                                    id: 1,
                                    grn_number: 'GRN-21',
                                    date: 'August 29, 2025',
                                    receiver: 'Smith',
                                    discrepancies: 'Shortage SKU 0317-8471(20 pcs not delivered)'
                                }
                            ]}
                        />
                    </div> */}

                    <div className='grid grid-cols-2 gap-4'>
                        <Card title='Receipt' gridcols='md:grid-cols-3'>
                            <InfoItem label='Receiver' value={data?.receiver || 'Not yet receiver'} />
                            <InfoItem label='Date' value={data?.date || 'None'} />
                            <InfoItem label='Discrepancies' value={data?.discrepancies || 'Pending'} />
                        </Card>
                        <Card title='Movements' gridcols='md:grid-cols-2 grid-cols-1'>
                            <InfoItem label='Out (From)' value='Picking Ref OUT-ST0004-01' />
                            <InfoItem label='In (To) References' value='Receiving Ref IN-ST0004-01 (Pending)' />
                        </Card>
                    </div>

                    <div className=''>
                        <Card title='Attachments & Thread' gridcols='md:grid-cols-2 grid-cols-1'>
                            <InfoItem label='Attachments' value={
                                <div className='flex flex-col gap-2 max-w-sm'>
                                    <ButtonAction
                                        label='PO-2025-00123.pdf'
                                        icon={<Image
                                            src={CloudDownloadIcon}
                                            alt='download-icon'
                                            width={15}
                                            height={15}
                                        />}
                                        position='end'
                                        btnClassname='w-full'
                                        labelClassname='truncate block'
                                    />
                                </div>

                            } />
                            <InfoItem label='Thread' value={
                                <div>
                                    <ul className='list-disc px-5'>
                                        <li >23 Aug 2025, 10:45</li>
                                        <p>Customer requested express shipping via DHL.</p>
                                    </ul>
                                </div>
                            } />
                        </Card>

                    </div>
                </div>
            </Content>
        </>
    )
}

export default DetailStockTransfer
