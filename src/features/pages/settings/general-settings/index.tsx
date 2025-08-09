'use client'
import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb"
import Tabs, { Tab } from '@/components/tab'
import TaxesSetting from './TaxesSettings'
import General from './General'
import TimeSetting from './Time'
import Currency from './Currency'
import Communications from './Communications'
import PaymentSettings from './PaymentSettings'
import Notifications from './Notifications'
import DefaultSettings from './DefaultSettings'
import Maintenance from './Maintenance'
import MarketingSetting from './MarketingSettings'
import StorageSettings from './StorageSettings'

const index = ({ taxesData }: { taxesData?: any }) => {
    const [activeTab, setActiveTab] = useState<string>('general');

    const tabs: Tab[] = [
        { key: 'general', label: 'General' },
        { key: 'time', label: 'Time' },
        { key: 'communications', label: 'Communications' },
        { key: 'payment-settings', label: 'Payment Settings' },
        { key: 'invoice', label: 'Invoice' },
        { key: 'notifications', label: 'Notifications' },
        { key: 'default-setting', label: 'Default Settings' },
        { key: 'maintenance', label: 'Maintenance' },
        { key: 'marketing-setting', label: 'Marketing Settings' },
        { key: 'storage-setting', label: 'Storage Settings' },
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
                className='relative'
                overflowClass='gap-6 pr-8'
            />


            {activeTab == 'general' && <General mode='create' />}

            {activeTab == 'time' && <TimeSetting mode='create' />}

            {activeTab == 'communications' && <Communications mode='create' />}

            {activeTab == 'payment-settings' && <PaymentSettings mode='create' />}

            {activeTab == 'invoice' && <TaxesSetting taxesData={taxesData} />}

            {activeTab == 'notifications' && <Notifications mode='create' />}

            {activeTab == 'default-setting' && <DefaultSettings mode='create' />}

            {activeTab == 'maintenance' && <Maintenance mode='create' />}

            {activeTab == 'marketing-setting' && <MarketingSetting mode='create' />}

            {activeTab == 'storage-setting' && <StorageSettings mode='create' />}


        </>
    )
}

export default index
