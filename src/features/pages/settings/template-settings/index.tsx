'use client'
import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb"
import Tabs, { Tab } from '@/components/tab'
import EmailTemplates from './EmailTemplates'
import SmsTemplate from './SmsTemplate'

const index = () => {
    const [activeTab, setActiveTab] = useState<string>('email-template');

    const tabs: Tab[] = [
        { key: 'email-template', label: 'Email Template' },
        { key: 'sms-template', label: 'SMS Template' },
    ];

    const breadcrumb = [
        {
            title: 'Settings',
        },
        {
            title: 'Template Settings',
        },
    ]

    return (
        <>
            <div className="mt-6 mx-6 mb-0">
                <h1 className='text-2xl font-bold'>
                    Template Settings
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


            {activeTab == 'email-template' && <EmailTemplates />}

            {activeTab == 'sms-template' && <SmsTemplate />}




        </>
    )
}

export default index
