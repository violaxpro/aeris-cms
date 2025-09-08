'use client'
import React, { useState, useEffect } from 'react'
import Tabs, { Tab } from '@/components/tab'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Products from './product'
import Services from './service'

const index = ({ productServiceDatas }: { productServiceDatas?: any }) => {
    const [activeTab, setActiveTab] = useState<string>('products');

    const tabs: Tab[] = [
        { key: 'products', label: 'Products' },
        { key: 'services', label: 'Services' },
    ];

    const breadcrumb = [
        {
            title: 'Catalogue',
        },
        {
            title: 'Products / Services',
        },
    ]

    return (
        <>
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Product / Services
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                </div>
            </div>
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                borderClass='w-full'
            />
            {activeTab == 'products' && <Products products={productServiceDatas} />}
            {activeTab == 'services' && <Services />}
        </>
    )
}

export default index
