import React from 'react'
import { Breadcrumb } from 'antd'
import { BreadcrumbProps } from '@/plugins/types'
import Link from 'next/link'

const index = ({ items }: BreadcrumbProps) => {
    return (
        <Breadcrumb
            style={{ margin: '16px 0' }}
        >
            {
                items.map((item, index) => (
                    <Breadcrumb.Item key={index}>
                        {item.url ?
                            <Link href={item.url}>
                                {item.label}
                            </Link>
                            : item.label
                        }
                    </Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    )
}

export default index
