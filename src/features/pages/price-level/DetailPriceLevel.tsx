import React from 'react'
import { routes } from '@/config/routes';
import { Content } from 'antd/es/layout/layout';
import Breadcrumb from '@/components/breadcrumb';
import Button from '@/components/button'

const DetailPriceLevel = ({ data }: { data: any }) => {
    console.log(data)
    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Price Level', url: routes.eCommerce.priceLevel },
        { title: 'Detail Price Level' },
    ];
    return (
        <>
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">Detail Price Level</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div>
                        <DetailRow label="ID" value={data?.id} />
                        <DetailRow label="Name" value={data?.name} />
                        <DetailRow label="Brands" value={data?.brand?.name} />
                        <DetailRow label="Categories" value={data?.category?.name} />
                        <DetailRow label="Sub Categories" value={data?.subCategoryId} />
                        <DetailRow label="RRP Price" value={data?.rrp_price} />
                        <DetailRow label="Trade Price" value={data?.trade_price} />
                        <DetailRow label="Silver Price" value={data?.silver_price} />
                        <DetailRow label="Gold Price" value={data?.gold_price} />
                        <DetailRow label="Diamond Price" value={data?.diamond_price} />
                        <DetailRow label="Platinum Price" value={data?.platinum_price} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                            label='Back'
                            link={routes.eCommerce.priceLevel}
                        />
                    </div>
                </div>
            </Content>
        </>
    )
}

const DetailRow = ({ label, value }: { label: string; value: any }) => (
    <div className="flex">
        <div className="w-40 font-semibold">{label}</div>
        <div>:</div>
        <div className='ms-2'>{value}</div>
    </div>
)
export default DetailPriceLevel
