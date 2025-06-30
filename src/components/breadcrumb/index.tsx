import React from 'react'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { BreadcrumbProps } from '@/plugins/types'
import Link from 'next/link'

const Breadcrumb = ({ items }: BreadcrumbProps) => {
    const breadcrumbItems = items.map(item => ({
        title: item.url ? (
            <Link href={item.url}>{item.title}</Link>
        ) : (
            item.title
        )
    }));

    return (
        <AntdBreadcrumb
            style={{ margin: '16px 0' }}
            items={breadcrumbItems}
        />
    );
};

export default Breadcrumb;
