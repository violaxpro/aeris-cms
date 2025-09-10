import React, { useState, useEffect } from 'react'
import { Content } from 'antd/es/layout/layout';
import Button from "@/components/button"
import GeneralForm from './GeneralForm';
import SEOForm from './SEOForm';
import { formCategoryProps } from '@/plugins/types/treeTypes';
import { addCategory, updateCategory } from '@/services/category-service';
import { useCreateCategory, useUpdateCategory } from '@/core/hooks/use-category';
import { useNotificationAntd } from '@/components/toast';

const FormCategory = ({ parentId, data, mode, onSaved }: formCategoryProps) => {
    const [activeTab, setActiveTab] = useState<'General' | 'SEO'>('General');
    const { contextHolder, notifyError, notifySuccess } = useNotificationAntd()
    const idEdit = data ? data?.id : ''
    const [formData, setFormData] = useState({
        general: {
            // name: data && data?.categoriesData ? data.categoriesData.name : '',
            // slug: data && data?.categoriesData ? data.categoriesData.url_slug : '',
            // isSearch: data && data.categoriesData ? data.categoriesData.show_in_search : false,
            // isShow: data && data.categoriesData ? data.categoriesData.show_in_page : false,
            // isStatus: data && data.categoriesData ? data.categoriesData.status : false
            name: data ? data.name : '',
            slug: data ? data.url_slug : '',
            isSearch: data ? data.show_in_search : false,
            isShow: data ? data.show_in_page : false,
            isStatus: data ? data.status : false
        },
        seo: {
            // url_logo: data && data?.categoriesData ? data.categoriesData.url_logo : '',
            // url_banner: data && data?.categoriesData ? data.categoriesData.url_banner : '',
            // metaTitle: data && data?.categoriesData ? data.categoriesData.meta_title : '',
            // metaDescription: data && data?.categoriesData ? data.categoriesData.meta_description : '',
            // pageDesc: data && data?.categoriesData ? data.categoriesData.page_description : '',
            url_logo: data ? data.url_logo : '',
            url_banner: data ? data.url_banner : '',
            metaTitle: data ? data.meta_title : '',
            metaDescription: data ? data.meta_description : '',
            pageDesc: data ? data.page_description : '',
        }
    })
    const { mutate: createCategoryMutate } = useCreateCategory()
    const { mutate: updateCategoryMutate } = useUpdateCategory(idEdit ?? '')
    const [formErrors, setFormErrors] = useState({
        name: '',
        url_slug: ''
    })

    console.log(parentId, data, idEdit)

    const handleChange = (section: string, updatedData: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                ...updatedData
            }
        }));
    };

    const handleSubmit = () => {
        let errors: any = {}
        if (!formData.general.name) {
            errors.name = 'Name is required'
        }
        if (!formData.general.slug) {
            errors.url_slug = 'URL Slug is required'
        }

        setFormErrors(errors)

        if (Object.keys(errors).length > 0) {
            return;
        }
        if (!formData.general.name || !formData.general.slug) {
            notifyError('General form is empty, please filled the form')
            return
        }
        // if (!formData.seo.url_logo || !formData.seo.metaTitle || !formData.seo.metaDescription || !formData.seo.url_banner) {
        //     notifyError('Seo form is empty, please filled the form')
        //     return
        // }

        const data = {
            name: formData.general.name,
            url_slug: formData.general.slug,
            show_in_search: formData.general.isSearch,
            show_in_page: formData.general.isShow,
            status: formData.general.isStatus,
            url_logo: formData.seo.url_logo,
            url_banner: formData.seo.url_banner,
            meta_title: formData.seo.metaTitle,
            meta_description: formData.seo.metaDescription,
            page_description: formData.seo.pageDesc,
            parent_id: parentId ?? null
        }

        if (idEdit) {
            updateCategoryMutate(data)
        } else {
            createCategoryMutate(data)
        }


        if (onSaved) {
            setTimeout(() => {
                onSaved()
            }, 2000);
        }
    }

    useEffect(() => {
        if (data) {
            setFormData({
                general: {
                    name: data.name,
                    slug: data.url_slug,
                    isSearch: data.show_in_search,
                    isShow: data.show_in_page,
                    isStatus: data.status
                },
                seo: {
                    url_logo: data.url_logo,
                    url_banner: data.url_banner,
                    metaTitle: data.meta_title,
                    metaDescription: data.meta_description,
                    pageDesc: data.page_description,
                }
            })

        } else {
            setFormData({
                general: {
                    name: '',
                    slug: '',
                    isSearch: '',
                    isShow: '',
                    isStatus: ''
                },
                seo: {
                    url_logo: '',
                    url_banner: '',
                    metaTitle: '',
                    metaDescription: '',
                    pageDesc: '',
                }
            })
        }

    }, [data, mode])

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
                    <div className='min-h-[360px] p-6'>

                        {/* Tab Content */}
                        <div>
                            {activeTab === 'General' && (
                                <div className="space-y-8">
                                    <GeneralForm
                                        data={data}
                                        parentId={parentId}
                                        onChange={(data) => handleChange('general', data)}
                                        formDataCreate={formData}
                                        errors={formErrors}
                                    />
                                </div>
                            )}


                            {activeTab === 'SEO' && (
                                <div>
                                    <SEOForm
                                        data={data}
                                        parentId={parentId}
                                        onChange={(data) => handleChange('seo', data)}
                                        formDataCreate={formData}
                                    />
                                </div>
                            )}


                        </div>

                        {/* Submit */}
                        <div className="mt-6 flex justify-end">
                            <Button
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
