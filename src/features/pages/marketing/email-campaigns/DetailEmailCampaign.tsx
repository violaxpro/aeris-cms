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
    ArrowPreviewIcon,
    EyeWhiteIcon
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
import ModalEmailPreview from './ModalEmalPreview'
import ModalActivityHistory from '../../warehouse/inventory-list/ModalActivityHistory'

const DetailEmailCampaigns = ({ slug, data }: { slug?: any, data: any }) => {
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
            title: 'Email Campaigns', url: routes.eCommerce.emailCampaigns,
        },
        { title: 'Detail' },

    ]

    const columns: TableColumnsType<any> = [
        {
            title: 'Run Date',
            dataIndex: 'run_date',
            sorter: (a: any, b: any) => {
                return a?.run_date.localeCompare(b?.run_date)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.run_date}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Parameters',
            dataIndex: 'parameters',
            sorter: (a: any, b: any) => {
                return a?.parameters.localeCompare(b?.parameters)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.parameters}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            sorter: (a: any, b: any) => {
                return a?.duration.localeCompare(b?.duration)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.duration}s</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Row Count',
            dataIndex: 'row_count',
            sorter: (a: any, b: any) => {
                return a?.row_count - b?.row_count
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.row_count} rows</span>
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
            <ModalEmailPreview
                isModalOpen={openModalPreview}
                handleCancel={() => setOpenModalPreview(false)}
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex flex-col justify-start md:flex-row md:justify-between md:items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Email Campaigns Detail
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
                        <Card title='Campaign Information' gridcols='md:grid-cols-4' >
                            <InfoItem label='Campaign Name' value={data.name || '-'} />
                            <InfoItem label='Channel' value={data.channel || 'Email'} />
                            <InfoItem label='Status' value={toCapitalize(data.status)} textColor={statusMap[toCapitalize(data?.status)]?.textColor} />
                            <InfoItem label='Last Updated' value={data.last_updated || '01 Sep 2025, 10:00'} />
                        </Card>
                    </div>
                    <div className='grid gap-4'>
                        <Card title='Sender Information' gridcols='md:grid-cols-3' >
                            <InfoItem label='From Name' value={data.from_name || 'Alarm Expert Australia'} />
                            <InfoItem label='From Email' value={data.from_email || 'promo@alarmexpert.com.au'} />
                            <InfoItem label='Repply To' value={data.repply_to || 'support@alarmexpert.com.au'} />
                        </Card>
                    </div>
                    <div className='grid gap-4'>
                        <Card title='Message'>
                            <InfoItem label='Subject' value={data.subject || 'Protect Your Home – 20% Off Alarm Systems'} />
                            <InfoItem label='Content Type' value={data.content_type || 'HTML'} />
                            <InfoItem label='Preheader' value={data.preheader || 'Special limited-time offer for our valued customers.'} />
                            <InfoItem label='HTML Body' value={
                                <Button
                                    label='Preview Content'
                                    icon={<Image
                                        src={EyeWhiteIcon}
                                        alt='preview-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    shape='round'
                                    hasHeight={false}
                                    onClick={() => setOpenModalPreview(true)}
                                />
                            }
                            />
                        </Card>
                    </div>
                    <div className='grid md:grid-cols-[1fr_3fr] gap-4'>
                        <Card title='Audience' gridcols='grid-cols-1'>
                            <InfoItem label='Segment' value={data.segment || 'INV-AX-2025-0897'} />
                            <InfoItem label='Exclusions' value={data.exclusions || 'RCPT-AX-2025-0366'} />
                        </Card>
                        <Card title='A/B Testing' gridcols='md:grid-cols-[3fr_1fr]'>
                            <InfoItem label='Variants' value={
                                <div>
                                    <ul className='list-disc px-5'>
                                        <li>A (50%) - Subject : “Secure Your Home – 20% Off Today”</li>
                                        <li>B (50%) - Subject : “Protect Your Family with 20% Discount”</li>
                                    </ul>

                                </div>
                            } />
                            <InfoItem label='Weights Total' value={data.weights_total || '100%'} />
                        </Card>
                    </div>
                    <div className='grid md:grid-cols-[1fr_3fr] gap-4'>
                        <Card title='Schedule' gridcols='grid-cols-1'>
                            <InfoItem label='Send Date / Time' value={data.send_date_time || '5 Sep 2025, 08:45'} />
                            <InfoItem label='Throttling' value={data.throttling || '5,000 emails per hour'} />
                        </Card>
                        <Card title='Tracking & Compliance' gridcols='md:grid-cols-[3fr_1fr]'>
                            <InfoItem label='Open Tracking' value={data.open_tracking || 'Enable'} />
                            <InfoItem label='Click Tracking' value={data.click_tracking || 'Enable'} />
                            <InfoItem label='UTM Parameters' value={data.utm_parameters || 'utm_campaign=winter_safety, utm_source=email'} />
                        </Card>
                    </div>
                    <div className='grid gap-4'>
                        <Card title='Performance Metrics' gridcols='md:grid-cols-5' >
                            <InfoItem label='Sent/Delivered' value={data.send_delivered || '2,000/1,900'} />
                            <InfoItem label='Open Rate' value={data.open_rate || '45%'} />
                            <InfoItem label='Click Rate' value={data.click_rate || '27%'} />
                            <InfoItem label='Conversions' value={data.conversions || '450'} />
                            <InfoItem label='Revenue Attributed' value={data.revenue || '$7,500'} />
                        </Card>
                    </div>

                </div>
            </Content>
        </>
    )
}

export default DetailEmailCampaigns
