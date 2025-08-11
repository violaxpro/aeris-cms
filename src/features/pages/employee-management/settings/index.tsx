'use client'
import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb"
import Tabs, { Tab } from '@/components/tab'
import General from './general'
import EmployeeType from './employee-type'
import CompanyPolicy from './company-policy'
import ShiftConfiguration from './shift-configuration'

const index = ({ data }: { data?: any }) => {
    const [activeTab, setActiveTab] = useState<string>('employee-type');

    const tabs: Tab[] = [
        { key: 'general', label: 'General' },
        { key: 'employee-type', label: 'Employee Type' },
        { key: 'company-policy', label: 'Company Policy' },
        { key: 'shift-configuration', label: 'Shift Configuration' },
    ];


    const breadcrumb = [
        {
            title: 'Employee Management',
        },
        {
            title: 'Settings',
        },
    ]

    return (
        <>
            <div className="mt-6 mx-8 mb-0">
                <h1 className='text-xl font-bold'>
                    Settings
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


            {activeTab == 'general' && <div></div>}
            {activeTab == 'employee-type' && <EmployeeType mode='create' />}
            {activeTab == 'company-policy' && <CompanyPolicy mode='create' />}
            {activeTab == 'shift-configuration' && <ShiftConfiguration mode='create' />}

        </>
    )
}

export default index
