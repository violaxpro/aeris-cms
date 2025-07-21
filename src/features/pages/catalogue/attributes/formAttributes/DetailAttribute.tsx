import React from 'react'
import { routes } from '@/config/routes';
import { Content } from 'antd/es/layout/layout';
import Breadcrumb from '@/components/breadcrumb';
import Button from '@/components/button'
import dayjs from 'dayjs'

const DetailAttribute = ({ data }: { data: any }) => {
    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Attributes', url: routes.eCommerce.attributes },
        { title: 'Detail Attributes' },
    ];
    return (
        <>
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">Detail Attributes</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div>
                        <DetailRow label="ID" value={data?.id} />
                        <DetailRow label="Name" value={data?.name} />
                        <DetailRow label="Attribute Set" value={data?.attribute_set} />
                        <DetailRow label="Filterable" value={data?.filterable} />
                        <DetailRow label="Created At" value={data?.created_at && dayjs(data?.created_at).format('DD MMMM, YYYY')} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            label='Back'
                            link={routes.eCommerce.attributes}
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
export default DetailAttribute
