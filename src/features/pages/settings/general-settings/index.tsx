'use client'
import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb"
import Tabs, { Tab } from '@/components/tab'
import TaxesSetting from './TaxesSettings'

const index = ({ taxesData }: { taxesData?: any }) => {
    const [activeTab, setActiveTab] = useState<string>('tax-setting');

    const tabs: Tab[] = [
        { key: 'tax-setting', label: 'Tax Settings' },
    ];


    const breadcrumb = [
        {
            title: 'Settings',
        },
        {
            title: 'General Settings',
        },
    ]

    return (
        <>
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    General Setting
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {activeTab == 'tax-setting' && <TaxesSetting taxesData={taxesData} />}

        </>
    )
}

export default index
