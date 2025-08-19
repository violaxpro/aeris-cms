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
    },
    container: {
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
        flexDirection: 'column',
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

    colSerialNumber: {
        width: '25%',
        textAlign: 'center',
        paddingHorizontal: 4,
    },

    colQty: {
        width: '10%',
        textAlign: 'center',
        paddingHorizontal: 4,
    },

    colPickPack: {
        width: '10%',
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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

export const PackingSlipPDF = ({ orderData, page }: { orderData: any, page: string }) => {
    console.log('ini order ptint', orderData)
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Image
                            src="/logo/Logo Xpro Group.png"
                            style={{ width: 170, height: 'auto' }}
                        />
                        <View style={{ width: 300, textAlign: 'right' }}>
                            <Text style={styles.fontHeader}>Packing Slip</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.titleAddress, { minWidth: 140 }]}>Sender Information</Text>
                            <Text>Xpro Group</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.titleAddress, { minWidth: 140 }]}>Recipient Information</Text>
                            <Text>Toko Serbaguna</Text>
                        </View>
                    </View>

                    {/* Table */}
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={styles.colSku}>SKU</Text>
                            <Text style={styles.colProduct}>Product Name</Text>
                            <Text style={styles.colSerialNumber}>Serial Number</Text>
                            <Text style={styles.colQty}>Qty</Text>
                            <Text style={styles.colPickPack}>Pick</Text>
                            <Text style={styles.colPickPack}>Pack</Text>

                        </View>

                        {/* Table Body */}
                        {orderData.product.map((item: any, index: any) => (
                            <View
                                style={[
                                    styles.tableRow,
                                    index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                                ]}
                                key={index}
                            >
                                <Text style={styles.colSku}>{item.sku}</Text>
                                <Text style={styles.colProduct}>{item.name}</Text>
                                <Text style={styles.colSerialNumber}>SN-UPX-0001</Text>
                                <Text style={styles.colQty}>{item.qty}</Text>
                                <View style={styles.colPickPack}>
                                    <Image
                                        src="/image/Checkbox.png"
                                        style={{ width: 10, height: 'auto' }}
                                    />
                                </View>
                                <View style={styles.colPickPack}>
                                    <Image
                                        src="/image/Checkbox.png"
                                        style={{ width: 10, height: 'auto' }}
                                    />
                                </View>

                            </View>
                        ))}

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60 }}>
                        {/* Issued by */}
                        <View style={{ alignItems: 'center', width: '25%' }}>
                            <Text>Issued by,</Text>
                            <View
                                style={{
                                    borderBottom: '1px dashed #000',
                                    width: '100%',
                                    marginTop: 80,
                                }}
                            />
                        </View>

                        {/* Received by */}
                        <View style={{ alignItems: 'center', width: '25%' }}>
                            <Text>Received by,</Text>
                            <View
                                style={{
                                    borderBottom: '1px dashed #000',
                                    width: '100%',
                                    marginTop: 80,
                                }}
                            />
                        </View>

                        {/* Approved by */}
                        <View style={{ alignItems: 'center', width: '25%' }}>
                            <Text>Approved by,</Text>
                            <View
                                style={{
                                    borderBottom: '1px dashed #000',
                                    width: '100%',
                                    marginTop: 80,
                                }}
                            />
                        </View>
                    </View>


                </View>

            </Page>
        </Document>
    );
};
