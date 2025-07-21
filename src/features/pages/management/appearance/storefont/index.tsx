'use client'
import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb"
import Tabs, { Tab } from '@/components/tab'
import GeneralSetting from './general-setting'
import HomepageSetting from './homepage-section'

const index = ({ taxesData }: { taxesData?: any }) => {
    const [activeTab, setActiveTab] = useState<string>('homepage');

    const tabs: Tab[] = [
        { key: 'general', label: 'General Setting' },
        { key: 'homepage', label: 'Homepage Section' },
    ];

    const breadcrumb = [
        {
            title: 'Management',
        },
        {
            title: 'Appearance'
        },
        {
            title: 'Storefront'
        },
    ]

    return (
        <>
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Storefront
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                borderClass='w-full'
            />


            {activeTab == 'general' && <GeneralSetting mode='create' />}
            {activeTab == 'homepage' && <HomepageSetting mode='create' />}


        </>
    )
}

export default index
