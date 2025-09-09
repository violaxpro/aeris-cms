'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Tabs, { Tab } from '@/components/tab'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Products from './product'
import Services from './service'

const index = ({ products, services }: { products?: any, services: any }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialTab = searchParams.get("tab") || "products"
    const [activeTab, setActiveTab] = useState<string>(initialTab)

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        router.replace(`?tab=${tab}`, { scroll: false });
    };

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
    console.log(activeTab)

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
                setActiveTab={handleTabChange}
                borderClass='w-full'
            />
            {activeTab == 'products' && <Products products={products} />}
            {activeTab == 'services' && <Services services={services} />}
        </>
    )
}

export default index
