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

const DetailReturnWarehouse = ({ slug, data }: { slug?: any, data: any }) => {
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
            title: 'Returns (RMA / Reverse Logistics)', url: routes.eCommerce.rmaWarehouse,
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
            title: 'Order / Shipment Link',
            dataIndex: 'reference',
            sorter: (a: any, b: any) => {
                return a?.reference.localeCompare(b?.reference)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.reference}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'QTY',
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
        {
            title: 'Reason',
            dataIndex: 'reason_code',
            sorter: (a: any, b: any) => {
                return a?.reason_code.localeCompare(b?.reason_code)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.reason_code}</span>
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
                            Returns (RMA / Reverse Logistics) Detail
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
                        <Card title='Return Information' gridcols='md:grid-cols-5' >
                            <InfoItem label='Return Number' value={data.rma_no || ''} />
                            <InfoItem label='Customer' value={data.customer || '-'} />
                            <InfoItem label='Contact' value={
                                <div className='flex flex-col'>
                                    <span>johnsmith@gmail.com</span>
                                    <span>085687290874</span>
                                </div>
                            } />
                            <InfoItem label='Authorization Number' value='AUTH-78910' />
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
                                    qty: 4,
                                    reference: 'ORD-321/SHP-889',
                                    serialsLots: ['LOT-KEYW-20250801'],
                                    reason_code: 'Damage'
                                }
                            ]}
                        />
                    </div>
                    <div className='grid gap-4'>
                        <Card title='Logistics' gridcols='md:grid-cols-4'>
                            <InfoItem label='Carrier' value='Australian Express' />
                            <InfoItem label='Tracking Number' value='TRK-556677' />
                            <InfoItem label='Return Date' value='26 August, 2025' />
                            <InfoItem label='Docs' value={
                                <div className='flex flex-col gap-2 max-w-lg'>
                                    <ButtonAction
                                        label='Return-01.pdf'
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
                        <Card title='Inspection'>
                            <InfoItem label='QC Result' value='Accepted' />
                            <InfoItem label='Notes' value='All units confirmed defective; not repairable.' />
                        </Card>
                        <Card title='Disposition' gridcols='grid-cols-1'>
                            <InfoItem label='SKU 0317-8471' value='Refund (AR Credit Note issued)' />
                            <InfoItem label='SKU 0317-8472' value='Replacement (Replacement Order created)' />
                        </Card>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='col-span-full grid md:grid-cols-[1fr_3fr] gap-4'>
                            <Card title='Financial Links' gridcols='grid-cols-1'>
                                <InfoItem label='AR Credit Note' value='CN-2025-219 (AUD 450.00)' />
                                <InfoItem label='Refund Status' value='Processed via bank transfer (29 Aug, 2025)' />
                                <InfoItem label='Replacement Order' value='RO-1123 (Scheduled shipment - 30 Aug, 2025)' />
                            </Card>
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
                                        <ButtonAction
                                            label='Invoice-90231.pdf'
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
                </div>
            </Content>
        </>
    )
}

export default DetailReturnWarehouse
