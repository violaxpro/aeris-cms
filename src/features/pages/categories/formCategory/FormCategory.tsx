import React, { useState } from 'react'
import { Content } from 'antd/es/layout/layout';
import Button from "@/components/button"
import GeneralForm from './GeneralForm';
import SEOForm from './SEOForm';
import { formCategoryProps } from '@/plugins/types/treeTypes';


const FormCategory = ({ parentId, data }: formCategoryProps) => {
    const [activeTab, setActiveTab] = useState<'General' | 'SEO'>('General');
    return (
        <>
            <div className="mx-4 mb-0 bg-white px-4">
                <div className="flex border-b border-gray-200" style={{ borderColor: '#E5E7EB' }}>
                    {['General', 'SEO'].map((tab) => (
                        <button
                            key={tab}
                            className={`capitalize px-4 py-2 -mb-px border-b-2 transition-colors duration-300 ${activeTab === tab
                                ? 'border-blue-500 text-blue-500'
                                : 'border-transparent text-gray-500 hover:text-blue-500'
                                }`}
                            onClick={() => setActiveTab(tab as any)}
                        >
                            {tab === 'General'
                                ? 'General'
                                : 'SEO'
                            }
                        </button>
                    ))}
                </div>
                <Content className="mt-4 mx-4 mb-0">
                    <div style={{ minHeight: 360, background: '#fff' }}>

                        {/* Tab Content */}
                        <div>
                            {activeTab === 'General' && (
                                <div className="space-y-8">
                                    <GeneralForm data={data} parentId={parentId}/>
                                </div>
                            )}


                            {activeTab === 'SEO' && (
                                <div>
                                    <SEOForm data={data} parentId={parentId}/>
                                </div>
                            )}


                        </div>

                        {/* Submit */}
                        <div className="mt-6 flex justify-end">
                            <Button
                                btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                                label={'Save'}
                            />
                        </div>
                    </div>
                </Content>
            </div>
        </>
    )
}

export default FormCategory
