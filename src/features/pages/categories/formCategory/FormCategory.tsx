import React, { useState, useEffect } from 'react'
import { Content } from 'antd/es/layout/layout';
import Button from "@/components/button"
import GeneralForm from './GeneralForm';
import SEOForm from './SEOForm';
import { formCategoryProps } from '@/plugins/types/treeTypes';
import { addCategory, updateCategory } from '@/services/category-service';
import { useNotificationAntd } from '@/components/toast';

const FormCategory = ({ parentId, data }: formCategoryProps) => {
    const [activeTab, setActiveTab] = useState<'General' | 'SEO'>('General');
    const { contextHolder, notifyError, notifySuccess } = useNotificationAntd()
    const idEdit = data && data.categoriesData ? data.categoriesData.id : ''
    const [formData, setFormData] = useState({
        general: {
            name: data && data?.categoriesData ? data.categoriesData.name : '',
            slug: data && data?.categoriesData ? data.categoriesData.slug : '',
            isSearch: data && data.categoriesData ? data.categoriesData.show_in_search : false,
            isShow: data && data.categoriesData ? data.categoriesData.show_in_page : false,
            isStatus: data && data.categoriesData ? data.categoriesData.enabled : false
        },
        seo: {
            url_logo: '',
            url_banner: '',
            metaTitle: '',
            metaDescription: '',
            pageDesc: '',
        }
    })

    console.log(data)

    const handleGeneralChange = (updatedGeneral: any) => {
        setFormData(prev => ({
            ...prev,
            general: {
                ...prev.general,
                ...updatedGeneral
            }
        }))
    }

    const handleSeoChange = (updatedSeo: any) => {
        setFormData(prev => ({
            ...prev,
            seo: updatedSeo
        }))
    }

    const handleSubmit = async () => {
        try {
            console.log(formData.general.name === '')
            if (!formData.general.name || !formData.general.slug) {
                notifyError('General form is empty, please filled the form')
                return
            }
            if (!formData.seo.url_logo || !formData.seo.metaTitle || !formData.seo.metaDescription || !formData.seo.url_banner) {
                notifyError('Seo form is empty, please filled the form')
                return
            }

            const data = {
                name: formData.general.name,
                slug: formData.general.slug,
                show_in_search: formData.general.isSearch,
                show_in_page: formData.general.isShow,
                enabled: formData.general.isStatus,
                url_logo: formData.seo.url_logo,
                url_banner: formData.seo.url_banner,
                meta_title: formData.seo.metaTitle,
                meta_description: formData.seo.metaDescription,
                page_description: formData.seo.pageDesc
            }


            let response;
            if (idEdit) {
                response = await updateCategory(idEdit, data)
            } else {
                response = await addCategory(data)
            }

            console.log(response)
            if (response.success == true) {
                notifySuccess(response.message)
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }

        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            {contextHolder}
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
                                    <GeneralForm
                                        data={data}
                                        parentId={parentId}
                                        onChange={handleGeneralChange}
                                    />
                                </div>
                            )}


                            {activeTab === 'SEO' && (
                                <div>
                                    <SEOForm
                                        data={data}
                                        parentId={parentId}
                                        onChange={handleSeoChange}
                                    />
                                </div>
                            )}


                        </div>

                        {/* Submit */}
                        <div className="mt-6 flex justify-end">
                            <Button
                                btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                                label={'Save'}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </Content>
            </div>
        </>
    )
}

export default FormCategory
