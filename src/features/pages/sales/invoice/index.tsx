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
        gap: 10,
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
        textTransform: 'uppercase'
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
        width: 100,
        // fontWeight: 'bold',
    },
    value: {
        maxWidth: 160,
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
    },
    rowOdd: {
        backgroundColor: '#3666AA0D',
    },

    rowEven: {
        backgroundColor: '#FFFFFF',
    },

    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#0A3353',
        border: '0.5px solid #0A3353',
        borderTopLeftRadius: '0.2rem',
        borderTopRightRadius: '0.2rem',
        paddingVertical: 8,
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
    },

    colSku: {
        width: '15%',
        textAlign: 'center',
        paddingHorizontal: 4,
    },

    colProduct: {
        width: '35%',
        textAlign: 'left',
        paddingHorizontal: 4,
    },

    colUnitPrice: {
        width: '15%',
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

export const InvoicePDF = ({ invoiceData, page }: { invoiceData: any, page: string }) => {
    return (
        <Document>
            <Page size="A4">
                <View style={styles.page}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Image
                            src="/logo/Alarm Expert Logo.png"
                            style={{ width: 170, height: 'auto' }}
                        />
                        <View style={{ width: 200, textAlign: 'right' }}>
                            <Text style={styles.fontHeader}>Invoice</Text>
                            {
                                page == 'order' ? <Text style={styles.statusHeader}>Approved</Text>
                                    : <Text style={[styles.statusHeader, { textTransform: 'uppercase' }]}>Draft</Text>
                            }

                        </View>
                    </View>

                    {/* Customer Info */}
                    <View style={styles.section}>
                        <View style={[styles.line, { width: '50%' }]}>
                            <Text style={styles.senderTitle}>Company Details</Text>
                            <div style={{ lineHeight: '1rem' }}>
                                <Text>
                                    PO Box 1234 , Sydney, NSW, 2000
                                </Text>
                                <Text>Phone : (+62) 876 5468 9876 </Text>
                                <Text>Email: admin@alarmexpert.com.au </Text>
                                <Text>ABN : 12 345 678 901</Text>
                            </div>
                        </View>
                        <View style={{ lineHeight: '1rem', width: '40%', minHeight: 65 }}>
                            <Text style={[styles.senderTitle, { lineHeight: '1.5rem' }]}>Order Details</Text>
                            <View style={styles.row}>
                                {
                                    page == 'order' && <>
                                        <Text style={styles.label}>Invoice Number</Text>
                                        <Text style={styles.value}>{invoiceData.invoiceNumber}</Text></>
                                }
                                {
                                    page == 'quote' && <>
                                        <Text style={styles.label}>Quote No</Text>
                                        <Text style={styles.value}>{invoiceData.invoiceNumber}</Text>
                                    </>
                                }

                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Invoice Date</Text>
                                <Text style={styles.value}>December 25, 2025</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Customer Name</Text>
                                <Text style={[styles.value, { maxWidth: 153 }]}>
                                    Protech Security xxxxxxxxx
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={{ width: '50%' }}>
                            <View style={{ lineHeight: '1rem' }}>
                                <Text style={styles.titleAddress}>Shipping Address</Text>
                                <Text>
                                    Jl. Nangka, No. 234, Sydney, Australia
                                </Text>
                                <Text>Sydney, NSW, 2300</Text>
                                <Text>Australia</Text>
                            </View>
                        </View>
                        <View style={{ width: '40%' }}>
                            <View style={{ lineHeight: '1rem' }}>
                                <Text style={styles.titleAddress}>Billing Address</Text>
                                {/* <Text>
                                    Jl. Nangka, No. 234, Sydney, Australia Sydney, NSW, 2300, Australia
                                </Text> */}
                                <Text>
                                    Jl. Nangka, No. 234, Sydney, Australia
                                </Text>
                                <Text>Sydney, NSW, 2300</Text>
                                <Text>Australia</Text>
                            </View>
                        </View>


                    </View>

                    <View style={styles.section}>
                        <View style={{ lineHeight: 1 }}>
                            <Text style={styles.titleAddress}>Sales Number</Text>
                            <Text>Andri Setiawan</Text>
                        </View>
                        <View style={{ lineHeight: 1, alignItems: 'center' }}>
                            <Text style={styles.titleAddress}>PO Number</Text>
                            <Text>ORD897EH2025</Text>
                        </View>
                        <View style={{ lineHeight: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.titleAddress}>Payment Method</Text>
                            <Text>Credit Card</Text>
                        </View>
                    </View>


                    {/* Table */}
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={styles.colSku}>SKU</Text>
                            <Text style={styles.colProduct}>Product</Text>
                            <Text style={styles.colUnitPrice}>Unit Price</Text>
                            <Text style={styles.colQty}>Qty</Text>
                            <Text style={styles.colTotal}>Line Total</Text>
                        </View>

                        {/* Table Body */}
                        {invoiceData.items.map((item: any, index: any) => (
                            <View
                                style={[
                                    styles.tableRow,
                                    index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                                ]}
                                key={index}
                            >
                                <Text style={styles.colSku}>{item.sku}</Text>
                                <Text style={styles.colProduct}>{item.name}</Text>
                                <Text style={styles.colUnitPrice}>${item.unit_price.toFixed(2)}</Text>
                                <Text style={styles.colQty}>{item.quantity}</Text>
                                <Text style={styles.colTotal}>${(item.unit_price * item.quantity).toFixed(2)}</Text>
                            </View>
                        ))}

                    </View>

                    <View style={styles.summary}>
                        {/* LEFT: Notes */}
                        <View style={[styles.summaryLeft, { maxWidth: 180 }]}>
                            <Text style={styles.noteTitle}>Delivery Notes</Text>
                            <Text style={styles.noteText}>
                                Please deliver between 9 AM – 5 PM, and call before arriving.
                            </Text>
                        </View>

                        {/* RIGHT: Amount Summary */}
                        <View style={styles.summaryRight}>
                            <View style={styles.amountRow}>
                                <Text>Subtotal</Text>
                                <Text>${invoiceData.subtotal.toFixed(2)}</Text>
                            </View>
                            <View style={styles.amountRow}>
                                <Text>Include GST</Text>
                                <Text>${invoiceData.gst.toFixed(2)}</Text>
                            </View>
                            <View style={styles.amountRow}>
                                <Text>Freight</Text>
                                <Text>${invoiceData.freight.toFixed(2)}</Text>
                            </View>
                            <View style={styles.totalAmountRow}>
                                <Text>Total</Text>
                                <Text>${invoiceData.total.toFixed(2)}</Text>
                            </View>
                            <View style={styles.amountRow}>
                                <Text>Paid Amount</Text>
                                <Text>${invoiceData.total.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontWeight: 500, fontSize: 12 }}>
                            Due Date: 23 Jul 2025
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            Please use the following details if payment is by direct debit.
                        </Text>

                        <View style={{ marginTop: 8, lineHeight: 1.2, fontSize: 10 }}>
                            <Text>Account Name: Xpro Group Pty Ltd</Text>
                            <Text>BSB: 112-879</Text>
                            <Text>Account: 495-000-845</Text>
                            <Text>Reference: Please use the invoice number as a payment reference.</Text>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
                            <Image src="/image/Visa.png" style={{ width: 30, height: 20 }} />
                            <Image src="/image/MasterCard.png" style={{ width: 30, height: 20 }} />
                            <Image src="/image/American_Express.png" style={{ width: 30, height: 20 }} />
                            <Image src="/image/Paypal.png" style={{ width: 30, height: 20 }} />
                        </View>

                        <Text
                            style={{
                                color: '#1E90FF',
                                marginTop: 6,
                                fontSize: 10,
                                textDecoration: 'underline',
                            }}
                        >
                            View and pay online now
                        </Text>
                    </View>

                </View>
                {/* <View style={styles.footer} fixed>
                    <View style={styles.footerItem}>
                        <Image
                            src="/image/TelephoneImage.png"
                            style={{ width: 7, height: 'auto' }}
                        />
                        <Text style={styles.footerText}>
                            1300 843 883
                        </Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Image
                            src="/image/EmailImage.png"
                            style={{ width: 7, height: 'auto' }}
                        />
                        <Text style={styles.footerText}> admin@alarmexpert.com.au</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Image
                            src="/image/MapsImage.png"
                            style={{ width: 7, height: 'auto' }}
                        />
                        <Text style={styles.footerText}> Church Avenue, Mascot, NSW, 2020</Text>
                    </View>
                </View> */}
            </Page>
        </Document>
    );
};
