'use client'
import React, { useState } from 'react';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import BasicInformationProduct from './basic-information';
import ProductPrice from './price';
import AdvancedInformation from './advanced-information';
import Button from '@/components/button'
import Tabs, { Tab } from '@/components/tab'
import { routes } from '@/config/routes';
import { addProduct, updateProduct } from '@/services/products-service';
import { useNotificationAntd } from '@/components/toast';
import { useRouter } from 'next/navigation';
import { FormProps } from '@/plugins/types/form-type';

const ProductForm: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const [activeTab, setActiveTab] = useState<string>('basic');
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [formData, setFormData] = useState({
        tab_basic_information: {
            productName: initialValues ? initialValues.name : '',
            shortDesc: initialValues ? initialValues.shotDesc : '',
            brand: initialValues ? initialValues.brandId : '',
            slug: initialValues ? initialValues.slug : '',
            categories: initialValues ? initialValues.categoriesId : '',
            subCategoriesId: initialValues ? initialValues.subCategoriesId : '',
            description: initialValues ? initialValues.description : '',
            metaTitle: initialValues ? initialValues.meta_title : '',
            metaDescription: initialValues ? initialValues.meta_description : '',
            taxClass: initialValues ? initialValues.tax : '',
            tags: initialValues ? initialValues.tags : [],
            manualUrl: initialValues ? initialValues.manual_url : '',
            warranty: initialValues ? initialValues.warranty : '',
            status: initialValues ? initialValues.status : false,
            sku: initialValues ? initialValues.sku : '',
            sku2: initialValues ? initialValues.sku2 : '',
            mpn: initialValues ? initialValues.mpn : '',
            inventory_management: initialValues ? initialValues.inventory_management : '',
            qty: initialValues ? initialValues.qty : '',
            stock: initialValues ? initialValues.stock : '',
            isBestSeller: initialValues ? initialValues.is_best_seller : false,
            isBackOrder: initialValues ? initialValues.is_back_order : false,
            images: initialValues ? initialValues.images : [],
            base_images: initialValues ? initialValues.images : '',
            additional_images: '',
        },
        tab_price: {
            buying_price: initialValues ? initialValues.price : '',
            rrp: initialValues ? initialValues.rrp_price : '',
            trade: initialValues ? initialValues.trade_price : '',
            silver: initialValues ? initialValues.silver_price : '',
            gold: initialValues ? initialValues.gold_price : '',
            platinum: initialValues ? initialValues.platinum_price : '',
            diamond: initialValues ? initialValues.diamond_price : '',
            kit_price: initialValues ? initialValues.kit_price : '',
            price_notes: initialValues ? initialValues.price_notes : ''
        },
        tab_advanced: {}
    })
    const tabs: Tab[] = [
        { key: 'basic', label: 'Basic Information' },
        { key: 'price', label: 'Price' },
        { key: 'advanced', label: 'Advanced Information' },
    ];

    console.log(formData)

    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Products', url: routes.eCommerce.products },
        { title: mode === 'create' ? 'Create Product' : 'Edit Product' },
    ];

    const handleChange = (section: string, updatedData: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                ...updatedData
            }
        }));
    };

    const handleSubmit = async () => {
        try {

            const submitData = {
                name: formData.tab_basic_information.productName,
                short_description: formData.tab_basic_information.shortDesc || 'short-desc',
                description: formData.tab_basic_information.description,
                slug: formData.tab_basic_information.slug,
                sku: formData.tab_basic_information.sku,
                sku2: formData.tab_basic_information.sku2,
                mpn: formData.tab_basic_information.mpn,
                brandId: Number(formData.tab_basic_information.brand),
                categoriesId: Number(formData.tab_basic_information.categories),
                subCategoriesId: Number(formData.tab_basic_information.subCategoriesId) || 1,
                // tax: formData.tab_basic_information.taxClass,
                // qty: Number(formData.tab_basic_information.qty),
                // stock: Number(formData.tab_basic_information.stock),
                stock: formData.tab_basic_information.stock,
                tags: formData.tab_basic_information.tags,
                status: formData.tab_basic_information.status == true ? 1 : 0,
                price_buy: Number(formData.tab_price.buying_price),
                rrp_price: Number(formData.tab_price.rrp),
                trade_price: Number(formData.tab_price.trade),
                silver_price: Number(formData.tab_price.silver),
                gold_price: Number(formData.tab_price.gold),
                platinum_price: Number(formData.tab_price.platinum),
                diamond_price: Number(formData.tab_price.diamond),
                meta_title: formData.tab_basic_information.metaTitle,
                meta_description: formData.tab_basic_information.metaDescription,
                images: formData.tab_basic_information.images
                // images: [
                //     {
                //         "name": "image a",
                //         "url": "https://cdn.alarmexpert.com.au/local/images/undefined/1738868084095.png",
                //         "default": true,
                //         "alt_image": "image a"
                //     }
                // ]
            }
            console.log(submitData)

            let response
            if (mode == 'edit' && slug) {
                response = await updateProduct(slug, submitData)
            } else {
                response = await addProduct(submitData)
            }


            if (response.success == true) {
                notifySuccess(response.message)
                setTimeout(() => {
                    router.push(routes.eCommerce.products)
                }, 2000);
            }

        } catch (error) {
            console.error(error)
        }
    }


    console.log('ini dari form product', formData)

    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Product' : 'Edit Product'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    {/* Tab Content */}
                    <div className='bg-background'>
                        {activeTab === 'basic' && (
                            <div className="space-y-8">
                                <BasicInformationProduct
                                    onChange={(data) => handleChange('tab_basic_information', data)}
                                    dataById={initialValues}
                                    formDataCreate={formData}
                                />
                            </div>
                        )}


                        {activeTab === 'price' && (
                            <div>
                                <ProductPrice
                                    onChange={(data) => handleChange('tab_price', data)}
                                    dataById={initialValues}
                                    formDataCreate={formData}
                                />
                            </div>
                        )}

                        {activeTab === 'advanced' && (
                            <div>
                                <AdvancedInformation />
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                            label={mode === 'create' ? 'Create Product' : 'Edit Product'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default ProductForm;
