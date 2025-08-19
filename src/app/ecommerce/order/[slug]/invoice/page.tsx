
'use client'
import React, { useEffect } from 'react'
import { InvoicePDF } from '@/features/pages/sales/pdf/Invoice';
import { PackingSlipPDF } from '@/features/pages/sales/pdf/PackingSlip';
import { PaySlipPDF } from '@/features/pages/employee-management/pdf/Payslip';
import { SerialNumberPDF } from '@/features/pages/sales/pdf/SerialNumber';
import { Params } from '@/plugins/types'
import { orderDummyData } from '@/plugins/types/sales-type';
import { PDFViewer } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';

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
            { sku: '0317-8471', name: 'U-Prox Keyfob - White SMART9412', quantity: 2, unit_price: 141.44, serialNumbers: ["SN0293U", "SN0294U"] },
            { sku: '0317-8472', name: 'U-Prox Keyfob - Black SMART9412', quantity: 1, unit_price: 140, serialNumbers: ["SN0295U"] },
            { sku: '0317-8473', name: 'Hikvision Wireless Repeater DS-PR1-WB', quantity: 3, unit_price: 235.36, serialNumbers: ["SN0296U", "SN0297U", "SN0298U"] },
        ],
        total: 250,
        subtotal: 879.98,
        gst: 56.00,
        freight: 15.00,
        unitPrice: 200,
        quantity: 10
    };

    const payslipData = {
        income: [
            { name: "Base Salary", price: "Rp. 4.500.000" },
            { name: "Overtime", price: "Rp. 500.000" },
            { name: "KPI", price: "Rp. 300.000" },
            { name: "Reimbursement", price: "Rp. 300.000" },
            { name: "Bonus", price: "Rp. 300.000" },
        ],
        deductions: [
            { name: "Late Free", price: "Rp. 50.000" },
            { name: "BPJS Kesehatan", price: "Rp. 150.000" },
            { name: "BPJS Ketenagakerjaan", price: "Rp. 100.000" },
            { name: "PPh21", price: "Rp. 100.000" },
            { name: "Debt", price: "Rp. 100.000" },
        ],
        overtime: [
            {
                date: "03 June 2025",
                description: "Special Shift",
                hours: "2.5h",
                price: "Rp. 75.000",
            },
            {
                date: "05 June 2025",
                description: "Extra Work",
                hours: "1.0h",
                price: "Rp. 30.000",
            },
        ],
        leaves: [
            {
                type: "Sick Leave",
                eligible: "12/Year",
                used: "2x",
                remaining: "10x",
            },
            {
                type: "Vacation",
                eligible: "12/Year",
                used: "3x",
                remaining: "9x",
            },
            {
                type: "Personal Leave",
                eligible: "6/Year",
                used: "0x",
                remaining: "6x",
            },
        ],
        summary: {
            totalIncome: "Rp. 5.300.000",
            totalDeduction: "Rp. 300.000",
            totalReceived: "Rp. 5.000.000",
        },
    };

    //preview dulu baru cetak
    useEffect(() => {
        const generateAndPrint = async () => {
            const blob = await pdf(<InvoicePDF invoiceData={invoiceData} page='order' />).toBlob();
            const blobUrl = URL.createObjectURL(blob);

            // Buka di tab baru
            const newWindow = window.open(blobUrl);
            if (newWindow) {
                newWindow.onload = () => {
                    newWindow.print();
                };
            }
        };

        generateAndPrint();
    }, []);

    //langsung cetak

    // useEffect(() => {
    //     const generateAndDownload = async () => {
    //         const blob = await pdf(<InvoicePDF invoiceData={invoiceData} />).toBlob();
    //         const blobUrl = URL.createObjectURL(blob);

    //         const link = document.createElement('a');
    //         link.href = blobUrl;
    //         link.download = `invoice-${invoiceData.invoiceNumber}.pdf`;
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //         URL.revokeObjectURL(blobUrl); // optional cleanup
    //     };

    //     generateAndDownload();
    // }, []);



    return (
        <div className="h-screen">
            <PDFViewer width="100%" height="100%">
                <SerialNumberPDF invoiceData={invoiceData} page='order' />
            </PDFViewer>
            <PDFViewer width="100%" height="100%">
                <InvoicePDF invoiceData={invoiceData} page='order' />
            </PDFViewer>
            <PDFViewer width="100%" height="100%">
                <PackingSlipPDF orderData={invoiceData} page='order' />
            </PDFViewer>
            <PDFViewer width="100%" height="100%">
                <PaySlipPDF payslipData={payslipData} page='packing-slip' />
            </PDFViewer>
        </div>
    );
}


