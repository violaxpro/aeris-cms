
'use client'
import React from 'react'
import { InvoicePDF } from '@/features/pages/sales/invoice';
import { Params } from '@/plugins/types'
import { orderDummyData } from '@/plugins/types/sales-type';
import { PDFViewer } from '@react-pdf/renderer';

export default async function InvoicePage(props: { params: Params }) {
    // const params = await props.params;
    // const slug = params.slug;
    // let data
    // try {

    //     const dataByid = orderDummyData.find((item) => {
    //         return item.id === Number(slug)
    //     })
    //     data = dataByid
    // } catch (error) {

    // }
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

    return (
        <div className="h-screen">
            <PDFViewer width="100%" height="100%">
                <InvoicePDF invoiceData={invoiceData} />
            </PDFViewer>
        </div>
    );
}


