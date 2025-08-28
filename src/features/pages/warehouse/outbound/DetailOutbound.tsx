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

const DetailOutbound = ({ slug, data }: { slug?: any, data: any }) => {
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
            title: 'Outbound (Order Fullfillment)', url: routes.eCommerce.outbound,
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
            title: 'Description',
            dataIndex: 'description',
            sorter: (a: any, b: any) => {
                return a?.description.localeCompare(b?.description)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.description}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'QTY ordered',
            dataIndex: 'qty_ordered',
            sorter: (a: any, b: any) => {
                return a?.qty_ordered - b?.qty_ordered
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.qty_ordered}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Qty Allocated',
            dataIndex: 'qty_allocated',
            sorter: (a: any, b: any) => {
                return a?.qty_allocated - b?.qty_allocated
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.qty_allocated}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Qty Rejected ',
            dataIndex: 'qty_rejected',
            sorter: (a: any, b: any) => {
                return a?.qty_rejected - b?.qty_rejected
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.qty_rejected}</span>
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
                        <span>{row.price}</span>
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
                            Outbound (Order Fullfillment) Detail
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
                        <Card title='Outbound Information' gridcols='md:grid-cols-5 grid-cols-2' >
                            <InfoItem label='Order Number' value={data.order_number} />
                            <InfoItem label='Customer' value={data.customer} />
                            <InfoItem label='Warehouse' value={data.warehouse} />
                            <InfoItem label='Status' value={toCapitalize(data.status)} textColor={statusMap[toCapitalize(data?.status)]?.textColor} />
                            <InfoItem label='Currency' value='AUD' />
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
                                    qty_ordered: 30,
                                    qty_allocated: 20,
                                    qty_rejected: 5,
                                    price: 1000,
                                    serialsLots: ['LOT-KEYW-20250801']
                                }
                            ]}
                        />
                    </div>
                    <div className='grid md:grid-cols-[1fr_3fr] gap-4 '>
                        <Card title='Allocations' gridcols='md:grid-cols-3'>
                            <InfoItem label='Bin' value='A1-B05' />
                            <InfoItem label='Quantity' value='20' />
                            <InfoItem label='Picker' value='Andi Saputra' />
                        </Card>
                        <Card title='Picking/Packing' gridcols='md:grid-cols-5'>
                            <InfoItem label='Pick Task Refs' value='PICK-AX-4521' />
                            <InfoItem label='Packer' value='Nanda Ayu' />
                            <InfoItem label='Carton' value='3 Carton' />
                            <InfoItem label='Weights / Dimensions' value='45kg / 90x60x55cm' />
                            <InfoItem label='Label' value={
                                <div className='w-full'>
                                    <ButtonAction
                                        label='ORDR-001-2025.pdf'
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
                        </Card>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='col-span-full grid md:grid-cols-[3fr_1fr] gap-4'>
                            <Card title='Shipment' gridcols='md:grid-cols-3'>
                                <InfoItem label='Carrier' value='DHL Express' />
                                <InfoItem label='Service' value='Express Worldwide' />
                                <InfoItem label='Shipped Date' value='25 August, 2025' />
                                <InfoItem label='Tracking Number' value='DHL987654321AU' />
                                <InfoItem label='Label / Docs' value={
                                    <div className='w-full'>
                                        <ButtonAction
                                            label='TRACK-001-2025.pdf'
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
                            </Card>
                            <Card title='Financial Links' gridcols='grid-cols-1'>
                                <InfoItem label='AR Invoice Ref' value='INV-AX-2025-0897' />
                                <InfoItem label='Receipt Ref' value='RCPT-AX-2025-0366' />
                            </Card>
                        </div>
                        <div className='col-span-full'>
                            <Card title='Attachments & Thread' gridcols='md:grid-cols-2 grid-cols-1'>
                                <InfoItem label='Attachments' value={
                                    <div className='max-w-md'>
                                        <ButtonAction
                                            label='SafeHome_PO142.pdf'
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
                                <InfoItem label='Emails/Notes' value={
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
                </div>
            </Content>
        </>
    )
}

export default DetailOutbound
