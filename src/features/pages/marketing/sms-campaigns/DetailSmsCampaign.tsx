'use client'
import React, { useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import Divider from '@/components/divider'
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
    EyeWhiteIcon,
    AlertIcon,
    WarningIcon,
    SuccessIcon
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
import ModalSmsPreview from './ModalSmsPreview'

const DetailSmsCampaign = ({ slug, data }: { slug?: any, data: any }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [openModalPreview, setOpenModalPreview] = useState(false)

    const breadcrumb = [
        {
            title: 'Campaigns Management',
        },
        {
            title: 'SMS Campaigns', url: routes.eCommerce.smsCampaigns,
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

    const handlePrint = async (data: any) => {
        await downloadInvoicePDF(data, 'order');
    }

    const handlePreview = async (data: any) => {
        await previewAndPrintPDF(data, 'order');
    }

    // console.log(modalSerialNumber, serialNumberData)
    return (
        <>
            {contextHolder}
            <ModalSmsPreview
                isModalOpen={openModalPreview}
                handleCancel={() => setOpenModalPreview(false)}
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex flex-col justify-start md:flex-row md:justify-between md:items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            SMS Campaigns Detail
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
                            <InfoItem label='Channel' value={data.channel || 'SMS'} />
                            <InfoItem label='Audience Segment' value={data.audience || 'All Subscribers'} />
                            <InfoItem label='Status' value={toCapitalize(data.status)} textColor={statusMap[toCapitalize(data?.status)]?.textColor} />
                            <InfoItem label='Schedule Type' value={data.schedule_type || 'Send Now'} />
                            <InfoItem label='Schedule At' value={data.schedule_at || '01 Sep 2025, 10:00'} />
                            <InfoItem label='UTM Parameters' value={data.utm_parameters || 'utm_source=sms&utm_campaign=flashsale_alt'} />
                        </Card>
                    </div>
                    <div className='grid gap-4'>
                        <Card title='Message Details' gridcols='md:grid-cols-3' >
                            <InfoItem label='Provider' value={data.provider || 'Twilio'} />
                            <InfoItem label='Sender ID / Number' value={data.sender_id || 'ALRMEXP'} />
                            <InfoItem label='Message Body' value={
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
                            <InfoItem label='Template Selector' value={data.template_selector || 'Not Used (Manual Message)'} />
                            <InfoItem label='Max Length Strategy' value={data.max_length_strategy || 'Split'} />
                            <InfoItem label='Link Shortener & Tracking' value={data.max_length_strategy || 'Enable'} />
                            <div className='col-span-full py-2'>
                                <Divider />
                            </div>
                            <div className='col-span-full'>
                                <h4 className='text-lg font-semibold'>Live Counters</h4>
                            </div>
                            <InfoItem label='Characters' value={data.characters || '160'} />
                            <InfoItem label='Segments' value={data.segments || '1'} />
                            <InfoItem label='Estimate Costs' value={data.estimate_cost || '$0.045 per recipient'} />
                        </Card>
                    </div>
                    <div className='grid md:grid-cols-[1fr_3fr] gap-4'>
                        <Card title='Controls' gridcols='grid-cols-1'>
                            <InfoItem label='Skip if No Opt-in' value={data.skip_if_no_option || 'Enable (locked)'} />
                            <InfoItem label='Country Routing' value={data.country_routing || 'Australia, Indonesia'} />
                            <InfoItem label='Rate Limit per Minute' value={data.rate_limit_per_minute || '1,000 messages'} />
                        </Card>
                        <Card title='Validation & Testing' gridcols='md:grid-cols-2'>
                            <InfoItem label='Validation Panel' value={
                                <div>
                                    <div className='flex gap-2 items-center'>
                                        <Image src={SuccessIcon} alt='icon' />
                                        <span>All contacts are opted-in</span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <Image src={WarningIcon} alt='icon' />
                                        <span>Sending restricted in Indonesia after 9 PM local time</span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <Image src={SuccessIcon} alt='icon' />
                                        <span>No blacklisted numbers detected</span>
                                    </div>
                                </div>
                            } />
                            <InfoItem label='Test Number' value={data.test_numbers || '+6281234567890, +6281234567890'} />
                        </Card>
                    </div>
                    <div className='grid gap-4'>
                        <Card title='Performance & Report'>
                            <div className='col-span-full grid md:grid-cols-2'>
                                <div>
                                    <h4 className='text-lg font-semibold'>KPIs (01 Sep 2025, 11:00)</h4>
                                    <div className='grid md:grid-cols-5'>
                                        <InfoItem label='Sent/Delivered' value={data.send_delivered || '10.000/9,850'} />
                                        <InfoItem label='Failed' value={data.failed || '150'} />
                                        <InfoItem label='Clicks Rate' value={data.click_rate || '18.5%'} />
                                        <InfoItem label='Conversions' value={data.conversions || '310'} />
                                        <InfoItem label='Revenue' value={data.revenue || '$12.000'} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className='text-lg font-semibold'>Opt-out Events (STOP)</h4>
                                    <InfoItem label='Contacts Unsubscribed' value={data.contacts_unsubscribes || '34 Contacts'} />
                                </div>
                            </div>
                            <div className='col-span-full py-2'>
                                <Divider />
                            </div>
                            <div className='col-span-full grid md:grid-cols-2'>
                                <div>
                                    <h4 className='text-lg font-semibold'>Delivery Errors Sample</h4>
                                    <div className='grid md:grid-cols-2'>
                                        <InfoItem label='Error 1' value={data.error || '+61 411 222 333 → Invalid Number'} />
                                        <InfoItem label='Error 2' value={data.error || '+62 812 7777 8888 → DND (Do Not Disturb)'} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className='text-lg font-semibold'>Heat Map by Country/Hour</h4>
                                    <div className='grid md:grid-cols-2'>
                                        <InfoItem label='Australia' value={data.error || 'Peak Engagement at 12:00'} />
                                        <InfoItem label='Indonesia' value={data.error || 'Peak Engagement at 20:00'} />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </Content>
        </>
    )
}

export default DetailSmsCampaign
