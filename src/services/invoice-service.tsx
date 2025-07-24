
import { InvoicePDF } from '@/features/pages/sales/invoice';
import { PDFViewer } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';

export const downloadInvoicePDF = async (invoiceData: any) => {
    const blob = await pdf(<InvoicePDF invoiceData={invoiceData} />).toBlob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `invoice-${invoiceData.invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl); // cleanup
};

export const previewAndPrintPDF = async (invoiceData: any) => {
    const blob = await pdf(<InvoicePDF invoiceData={invoiceData} />).toBlob();
    const blobUrl = URL.createObjectURL(blob);

    const newWindow = window.open(blobUrl);
    if (newWindow) {
        newWindow.onload = () => {
            newWindow.print();
        };
    }
};
