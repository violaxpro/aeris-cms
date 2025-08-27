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
    DownloadIcon
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
import { downloadInvoicePDF, previewAndPrintPDF } from '@/services/invoice-service'

const DetailQuote = ({ slug, data }: { slug?: string | number, data: any }) => {
    const [profitHidden, setProfitHidden] = useState(true)

    const breadcrumb = [
        { title: 'Sales' },
        {
            title: 'Quote', url: routes.eCommerce.quote
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
            title: 'Product',
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
            title: 'Buy Price',
            dataIndex: 'price',
            sorter: (a: any, b: any) => {
                return a?.price.localeCompare(b?.price)
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
            title: 'Supplier',
            dataIndex: 'supplier_name',
            sorter: (a: any, b: any) => {
                return a?.supplier_name.localeCompare(b?.supplier_name)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.supplier_name}</span>
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
    const quoteDetailData = {
        invoiceNumber: 'INV9043',
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
        await downloadInvoicePDF(data, 'quote');
    }

    const handlePreview = async (data: any) => {
        await previewAndPrintPDF(data, 'quote');
    }

    console.log(data)
    return (
        <>
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Quote Detail
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
                            data?.status && data?.status?.toLowerCase() == 'approved' ||
                            data?.status?.toLowerCase() == 'accepted' && <ButtonAction
                                icon={<Image
                                    src={ConvertIcon}
                                    alt='convert-icon'
                                    width={15}
                                    height={15}
                                />}
                                label='Convert to Invoice'
                            // link={routes.eCommerce.editQuote}
                            />
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
                            onClick={() => handlePreview(quoteDetailData)}
                        />
                        <ButtonAction
                            icon={<Image
                                src={DownloadIcon}
                                alt='download-icon'
                                width={15}
                                height={15}
                            />}
                            label='Download PDF'
                            onClick={() => handlePrint(quoteDetailData)}
                        />
                        <Button
                            icon={<Image
                                src={ExportIcon}
                                alt='export-icon'
                                width={15}
                                height={15}
                            />}
                            label='Export'
                        // link={routes.eCommerce.editQuote}
                        />
                    </div>

                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }} className='flex flex-col gap-6'>
                    <div className='grid grid-cols-12 gap-4'>
                        <Card title='Quote Information' gridcols='grid-cols-3' className='col-span-8'>
                            <InfoItem label='Quote Date' value='June 30, 2025' />
                            <InfoItem label='Customer Phone' value='+628 63 8765 5589' />
                            <InfoItem label='Customer Group' value='Distributor' />
                            <InfoItem label='PO Number' value='PO-2025-0034' />
                            <InfoItem label='Sales Person' value='Sales A' />
                            <InfoItem label='Quote Status' value={data?.status} textColor={statusMap[data?.status]?.textColor || ''} />
                        </Card>

                        <Card title='Account Information' className='col-span-4'>
                            <InfoItem label='Customer Name' value='Customer A' />
                            <InfoItem label='Customer Email' value='customer@gmail.com' />
                            <InfoItem label='Order Reference' value='ORD-0925' />
                        </Card>
                    </div>

                    <div>
                        <h4 className='text-xl font-semibold'>Item Ordered</h4>
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
                                onReveal={() => setProfitHidden(false)}
                                profit={100}
                                subtotal={1130.4}
                                shippingFee={50}
                                discount={5}
                                taxAmount={0.1}
                            />
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default DetailQuote
