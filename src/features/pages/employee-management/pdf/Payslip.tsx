// components/pdf/InvoicePDF.tsx
'use client'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font
} from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer';
// Optional: custom font
// Font.register({ family: 'Roboto', src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxM.woff2' });

Font.register({
    family: 'Inter', fonts: [
        { src: '/font/Inter/Inter-VariableFont.ttf', }, // font-style: normal, font-weight: normal
        { src: '/font/Inter/Inter-Italic-VariableFont_opsz,wght.ttf', fontStyle: 'italic' },
        { src: '/font/Inter/Inter_18pt-Bold.ttf', fontStyle: 'normal', fontWeight: 700 },
        { src: '/font/Inter/Inter_18pt-Medium.ttf', fontStyle: 'normal', fontWeight: 500 },
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Inter',
        gap: 6,
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    header: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    section: {
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 10,
    },
    fontHeader: {
        color: '#0A3353',
        fontSize: '1.8rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.2rem'
    },
    statusHeader: {
        color: '#0A3353',
        textAlign: 'right',
        fontSize: '16px'
    },
    senderTitle: {
        fontWeight: 500,
        fontSize: '1rem',
    },
    line: {
        lineHeight: '1.5rem',
        // width: '50%'
    },
    bold: {
        fontWeight: 'bold',
    },
    sectionTable: {
        flexDirection: 'row',
        marginTop: '2rem',
        gap: 8
    },
    card: {
        flex: 1,
        padding: 8,
        border: '1px solid #ccc',
        borderRadius: '7px'
    },
    table: {
        width: 'auto',
        marginTop: 10
    },
    tableColHeader: {
        width: '25%',
        borderBottom: '1px solid #000',
        paddingBottom: 4
    },
    tableCol: {
        width: '25%',
        paddingVertical: 2
    },
    row: {
        flexDirection: 'row',
        gap: '4',
        alignItems: 'flex-start',
        // fontSize: 10,
        // marginBottom: 4,
    },
    label: {
        width: 80,
        // fontWeight: 'bold',
    },
    value: {
        maxWidth: 130,
        textAlign: 'left',
    },
    titleAddress: {
        fontSize: '0.7rem',
        fontWeight: 500
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    summaryLeft: {
        width: '60%',
    },

    summaryRight: {
        width: '40%',
        alignItems: 'flex-end',
        lineHeight: '1rem'
    },

    noteTitle: {
        fontWeight: 500,
        marginBottom: 4,
    },

    noteText: {
        fontSize: 10,
        lineHeight: 1.5,
    },

    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 2,
    },

    totalAmountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        fontSize: 12,
        fontWeight: 500,
        marginTop: 6,
        borderTop: '1px solid #000',
        paddingTop: 4,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        border: '1px solid #eee',
        paddingVertical: 8,
        fontSize: 10,
        width: '100%'
    },
    rowOdd: {
        backgroundColor: '#3666AA0D',
    },

    rowEven: {
        backgroundColor: '#FFFFFF',
    },

    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#9D9D9D1A',
        border: '0.5px solid #eee',
        borderTopLeftRadius: '0.2rem',
        borderTopRightRadius: '0.2rem',
        paddingVertical: 8,
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2F2F2F',
        textTransform: 'uppercase',
    },
    title: {
        fontWeight: 500,
        marginBottom: 4
    },
    colThird: {
        width: '20%',
        textAlign: 'center',
        paddingHorizontal: 4,
    },

    colSecond: {
        width: '35%',
        textAlign: 'left',
        paddingHorizontal: 6,
    },
    colFirst: {
        width: '20%',
        textAlign: 'center',
        paddingHorizontal: 4,
    },

    colQty: {
        width: '10%',
        textAlign: 'center',
        paddingHorizontal: 4,
    },

    colTotal: {
        width: '25%',
        textAlign: 'center',
        paddingHorizontal: 4,
    },
    footer: {
        backgroundColor: '#0A3253',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        color: '#ffffff',
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    footerText: {
        fontSize: 10,
        color: '#ffffff',
    },
    footerIcon: {
        width: 10,
        height: 10,
    },
    contentWrapper: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },


});

export const PaySlipPDF = ({ payslipData, page }: { payslipData: any, page: string }) => {
    return (
        <Document>
            <Page size="A4">
                <View style={styles.page}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Image
                            src="/logo/Logo Xpro Group.png"
                            style={{ width: 170, height: 'auto' }}
                        />
                        <View style={{ width: 200, textAlign: 'right' }}>
                            <Text style={styles.fontHeader}>Payslip</Text>
                        </View>
                    </View>

                    {/* Customer Info */}
                    <View style={styles.section}>
                        <View style={[styles.line, { width: '50%' }]}>
                            <Text style={styles.senderTitle}>Company Details</Text>
                            <div style={{ lineHeight: '1rem' }}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>ABN</Text>
                                    <Text style={styles.value}>12 345 678 901</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Phone</Text>
                                    <Text style={styles.value}>(+62) 876 5468 9876</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Email</Text>
                                    <Text style={styles.value}>
                                        admin@alarmexpert.com.au
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Address</Text>
                                    <Text style={[styles.value, { maxWidth: 160 }]}>
                                        Jl Darat No 114, Kec Medan Baru
                                    </Text>
                                </View>
                            </div>
                        </View>
                        <View style={{ lineHeight: '1rem', width: '40%', minHeight: 65 }}>
                            <Text style={[styles.senderTitle, { lineHeight: '1.5rem' }]}>Employee Details</Text>
                            <View style={styles.row}>
                                <Text style={styles.label}>Employee ID</Text>
                                <Text style={styles.value}>9043</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Name</Text>
                                <Text style={styles.value}>Marcella Indarwati</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Phone</Text>
                                <Text style={styles.value}>
                                    (+62) 819 3697 6917
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Email</Text>
                                <Text style={styles.value}>
                                    marcella@gmail.com
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Address</Text>
                                <Text style={styles.value}>
                                    Kab. Nganjuk Jawa Timur
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={{ lineHeight: 1 }}>
                            <Text style={styles.titleAddress}>Approved By</Text>
                            <Text>Andri Setiawan</Text>
                        </View>
                        <View style={{ lineHeight: 1, alignItems: 'center' }}>
                            <Text style={styles.titleAddress}>Date Period</Text>
                            <Text>25/05/25 to 25/06/25</Text>
                        </View>
                        <View style={{ lineHeight: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.titleAddress}>Payment Method</Text>
                            <Text>Bank Transfer</Text>
                        </View>
                    </View>

                    {/* Section table */}
                    <View style={styles.sectionTable}>
                        <View style={styles.card}>
                            <Text style={styles.title}>Income Summary</Text>
                            <View style={styles.tableHeader}>
                                <Text style={{ width: '50%' }}>Name</Text>
                                <Text style={{ width: '50%' }}>Price</Text>
                            </View>
                            {payslipData?.income?.map((item: any, index: number) => (
                                <View
                                    key={index}
                                    style={styles.tableRow}
                                >
                                    <Text style={{ width: '50%', textAlign: 'left', paddingLeft: 8 }}>{item.name}</Text>
                                    <Text style={{ width: '50%', textAlign: 'center' }}>{item.price}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.title}>Deduction Summary</Text>
                            <View style={styles.tableHeader}>
                                <Text style={{
                                    width: '50%',
                                }}>Name</Text>
                                <Text style={{ width: '50%' }}>Price</Text>
                            </View>
                            {payslipData?.deductions?.map((item: any, index: number) => (
                                <View
                                    key={index}
                                    style={styles.tableRow}
                                >
                                    <Text style={{ width: '50%', textAlign: 'left', paddingLeft: 8 }}>{item.name}</Text>
                                    <Text style={{ width: '50%', textAlign: 'center', }}>{item.price}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    {/* Overtime & Leave Summary */}
                    <View style={styles.sectionTable}>
                        <View style={[styles.card, { flexDirection: 'row', gap: 6 }]}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.title}>Overtime Summary</Text>
                                <View style={styles.tableHeader}>
                                    <Text style={{ width: '25%' }}>Date</Text>
                                    <Text style={styles.colSecond}>Description</Text>
                                    <Text style={styles.colFirst}>Hours</Text>
                                    <Text style={{ width: '25%' }}>Price</Text>
                                </View>
                                {payslipData?.overtime?.map((item: any, index: number) => (
                                    <View
                                        key={index}
                                        style={styles.tableRow}
                                    >
                                        <Text style={{ width: '25%', textAlign: 'center' }}>{item.date}</Text>
                                        <Text style={styles.colSecond}>{item.description}</Text>
                                        <Text style={styles.colFirst}>{item.hours}</Text>
                                        <Text style={{ width: '25%' }}>{item.price}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.title}>Leaves Summary</Text>
                                <View style={styles.tableHeader}>
                                    <Text style={styles.colSecond}>Leave Type</Text>
                                    <Text style={{ width: '25%' }}>Eligible</Text>
                                    <Text style={styles.colFirst}>Used</Text>
                                    <Text style={{ width: '25%', textAlign: 'center' }}>Remaining</Text>
                                </View>
                                {payslipData?.leaves?.map((item: any, index: number) => (
                                    <View
                                        key={index}
                                        style={styles.tableRow}
                                    >
                                        <Text style={styles.colSecond}>{item.type}</Text>
                                        <Text style={{ width: '25%', textAlign: 'center' }}>{item.eligible}</Text>
                                        <Text style={styles.colFirst}>{item.used}</Text>
                                        <Text style={{ width: '25%', textAlign: 'center' }}>{item.remaining}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* Total Summary */}
                    <View style={styles.summary}>
                        <View style={styles.summaryLeft}></View>
                        <View style={styles.summaryRight}>
                            <View style={styles.amountRow}>
                                <Text>Sub Total Income</Text>
                                <Text>{payslipData?.summary?.totalIncome}</Text>
                            </View>
                            <View style={styles.amountRow}>
                                <Text>Sub Total Deduction</Text>
                                <Text>{payslipData?.summary?.totalDeduction}</Text>
                            </View>
                            <View style={styles.totalAmountRow}>
                                <Text>Total Received</Text>
                                <Text>{payslipData?.summary?.totalReceived}</Text>
                            </View>
                        </View>
                    </View>


                </View>
            </Page>
        </Document >
    );
};
