import React from 'react'
import { routes } from '@/config/routes';
import { Content } from 'antd/es/layout/layout';
import Breadcrumb from '@/components/breadcrumb';
import Button from '@/components/button'

const DetailBrand = ({ data }: { data: any }) => {
    console.log(data)
    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Brands', url: routes.eCommerce.brands },
        { title: 'Detail Brands' },
    ];
    return (
        <>
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">Detail Brands</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="2mb-0">
                <div className='bg-[#fff] min-h-[360px] p-6'>
                    <div>
                        <DetailRow label="ID" value={data?.id} />
                        <DetailRow label="Name" value={data?.name} />
                        <DetailRow label="Status" value={data?.status} />
                        <DetailRow label="Discount Percent" value={data?.discount_percent} />
                        <DetailRow label="Meta Title" value={data?.meta_title} />
                        <DetailRow label="Meta Description" value={data?.meta_description} />
                        <DetailRow label="Url Logo" value={data?.url_logo} />
                        <DetailRow label="Url Banner" value={data?.url_banner} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            label='Back'
                            link={routes.eCommerce.brands}
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
export default DetailBrand
