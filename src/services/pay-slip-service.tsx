
import { PaySlipPDF } from '@/features/pages/employee-management/pdf/Payslip';
import { PDFViewer } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';

export const downloadPayslipPDF = async (payslipData: any, page: any) => {
    const blob = await pdf(<PaySlipPDF payslipData={payslipData} page={page} />).toBlob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `Pay Slip-${payslipData.employee_id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl); // cleanup
};

export const previewAndPrintPDF = async (payslipData: any, page: any) => {
    const blob = await pdf(<PaySlipPDF payslipData={payslipData} page={page} />).toBlob();
    const blobUrl = URL.createObjectURL(blob);

    const newWindow = window.open(blobUrl);
    if (newWindow) {
        newWindow.onload = () => {
            newWindow.print();
        };
    }
};
