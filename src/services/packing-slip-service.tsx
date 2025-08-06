
import { PackingSlipPDF } from '@/features/pages/sales/pdf/PackingSlip';
import { PDFViewer } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';

export const downloadPackingSlipPDF = async (orderData: any, page: any) => {
    const blob = await pdf(<PackingSlipPDF orderData={orderData} page={page} />).toBlob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `Packing-Slip-${orderData.invoice_number}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl); // cleanup
};

export const previewAndPrintPDF = async (orderData: any, page: any) => {
    const blob = await pdf(<PackingSlipPDF orderData={orderData} page={page} />).toBlob();
    const blobUrl = URL.createObjectURL(blob);

    const newWindow = window.open(blobUrl);
    if (newWindow) {
        newWindow.onload = () => {
            newWindow.print();
        };
    }
};
