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
    ApproveIcon
} from '@public/icon'
import Button from '@/components/button'
import Table from '@/components/table'
import { QuoteType } from '@/plugins/types/sales-type'
import type { TableColumnsType } from 'antd'
import OrderSummary from '../OrderSummary'
import { statusMap } from '@/config/colors-status'
import dayjs from 'dayjs'

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
    console.log(data)
    return (
        <>
            <div className="mt-6 mx-5 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
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
                            data?.status && data?.status?.toLowerCase() == 'approved' && <ButtonAction
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
                        // link={routes.eCommerce.editQuote}
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
                        <div className='col-span-8 border p-4 rounded-xl' style={{ borderColor: '#E5E7EB' }}>
                            <h4 className='text-lg font-semibold'>Quote Information</h4>
                            <div className='my-4 grid grid-cols-3 gap-4'>
                                <div className='flex flex-col'>
                                    <label className='text-gray-500'>Quote Date</label>
                                    <span>June 30, 2025</span>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-gray-500'>Customer Phone</label>
                                    <span>+62 812-3456-7890</span>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-gray-500'>Customer Group</label>
                                    <span>Distributor</span>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-gray-500'>PO Number</label>
                                    <span>PO-2025-0034</span>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-gray-500'>Sales Person</label>
                                    <span>Sales A</span>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-gray-500'>Quote State</label>
                                    <span style={{ color: statusMap[data?.status].textColor }}>
                                        {data.status}
                                    </span>
                                </div>
                            </div>

                        </div>
                        <div className='col-span-4 border p-4 rounded-xl' style={{ borderColor: '#E5E7EB' }}>
                            <h4 className='text-lg font-semibold'>Account Information</h4>
                            <div className='my-4 grid grid-cols-2 gap-4'>
                                <div className='flex flex-col'>
                                    <label className='text-gray-500'>Customer Name</label>
                                    <span>Customer A</span>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-gray-500'>Customer Email</label>
                                    <span>customer@gmail.com</span>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-gray-500'>Order Reference</label>
                                    <span>ORD-0925</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className='text-xl font-semibold'>Item Ordered</h4>
                        <Table
                            columns={columns}
                            dataSource={data?.product}
                        />
                    </div>

                    <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-9 border p-4 rounded-xl flex flex-col justify-center' style={{ borderColor: '#E5E7EB' }}>
                            <div className='p-4'>
                                <h4 className='text-lg font-semibold'>Notes</h4>
                                <div className='my-4 grid gap-4 grid-cols-2'>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-500'>Delivery Notes</label>
                                        <span>Picked 1 U-Prox Keyflo for Order #9821</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-500'>Internal Notes</label>
                                        <span>Picked 1 U-Prox Keyflo for Order #9821</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-span-3 my-4'>
                            <OrderSummary
                                profitHidden={profitHidden}
                                onReveal={() => setProfitHidden(false)}
                                profit={100}
                                subtotal={1130.4}
                                shippingFee={50}
                                discount={5}
                                gstRate={0.1}
                            />
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default DetailQuote
