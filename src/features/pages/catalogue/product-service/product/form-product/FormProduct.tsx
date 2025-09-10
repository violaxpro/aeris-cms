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
import { useCreateProduct, useUpdateProduct } from '@/core/hooks/use-product';
import { useNotificationAntd } from '@/components/toast';
import { useRouter } from 'next/navigation';
import { FormProps } from '@/plugins/types/form-type';
import { useSetAtom } from 'jotai';
import { notificationAtom } from '@/store/NotificationAtom';

const ProductForm: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const [activeTab, setActiveTab] = useState<string>('basic');
    const setNotification = useSetAtom(notificationAtom);
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [formData, setFormData] = useState({
        tab_basic_information: {
            productName: initialValues ? initialValues.name : '',
            shortDesc: initialValues ? initialValues.shotDesc : '',
            brand: initialValues ? initialValues.brand_id : '',
            slug: initialValues ? initialValues.slug : '',
            categories: initialValues ? initialValues.category_id : '',
            subCategoriesId: initialValues ? initialValues.sub_category_id : '',
            description: initialValues ? initialValues.description : '',
            metaTitle: initialValues ? initialValues.meta_title : '',
            metaDescription: initialValues ? initialValues.meta_description : '',
            taxClass: initialValues ? initialValues.tax : '',
            tags: initialValues ? initialValues.tags.map((tag: any) => tag.id) : [],
            manualUrl: initialValues ? initialValues.manual_url : '',
            warranty: initialValues ? initialValues.warranty_month : '',
            status: initialValues ? initialValues.status : false,
            sku: initialValues ? initialValues.sku : '',
            sku2: initialValues ? initialValues.sku2 : '',
            mpn: initialValues ? initialValues.mpn : '',
            inventory_management: initialValues ? initialValues.inventory_management : '',
            qty: initialValues ? initialValues.qty : '',
            stock: initialValues ? initialValues.stock : '',
            isBestSeller: initialValues ? initialValues.best_seller : false,
            isBackOrder: initialValues ? initialValues.back_order : false,
            images: initialValues ? initialValues.images : [],
            base_images: initialValues ? initialValues.images : '',
            additional_images: '',
        },
        tab_price: {
            buying_price: initialValues ? initialValues.price : '',
            rrp: initialValues ? initialValues.recommended_retail_price : '',
            trade: initialValues ? initialValues.trade_price : '',
            silver: initialValues ? initialValues.silver_price : '',
            gold: initialValues ? initialValues.gold_price : '',
            platinum: initialValues ? initialValues.platinum_price : '',
            diamond: initialValues ? initialValues.diamond_price : '',
            price_notes: initialValues ? initialValues.price_notes : '',
            additional_shipping_cost: initialValues ? initialValues.additional_shipping_cost : '',
            last_price: initialValues ? initialValues.last_price : '',
            suppliers: initialValues && initialValues.suppliers.length > 0
                ? initialValues.suppliers.map((supp: any) => ({
                    supplierName: supp.id,
                    buyPrice: supp.price
                }))
                : [{ supplierName: '', buyPrice: 0 }],
            kits: initialValues && initialValues.kits.length > 0
                ? initialValues.kits.map((kit: any) => ({
                    productName: kit.id
                }))
                : [{ productName: '' }],

        },
        tab_advanced: {
            attributes: initialValues && initialValues.attributes.length > 0
                ? initialValues.attributes.map((attr: any) => ({
                    name: attr.attribute_id,
                    price: attr.price
                })) : [{ name: '', price: 0, categories: [] }],
            options: initialValues && initialValues.options.length > 0
                ? initialValues.options.map((opt: any) => ({
                    name: opt.id
                }))
                : [{ name: '', type: '', required: false, values: [] }],
            relateds: initialValues && initialValues.relateds.length > 0
                ? initialValues.relateds.map((rel: any) => rel) : [],
        }
    })
    const { mutate: createProductMutate } = useCreateProduct()
    const { mutate: updateProductMutate } = useUpdateProduct(slug ?? '')
    const [formErrors, setFormErrors] = useState({
        name: '',
        sku: '',
        images: [],
        description: ''
    })
    const metaTitle = formData.tab_basic_information.metaTitle;
    const titleLength = metaTitle.length;
    const isTitleInvalid = titleLength !== 0 && (titleLength < 55 || titleLength > 65)
    const metaDescription = formData.tab_basic_information.metaDescription;
    const descLength = metaDescription.length;
    const isDescInvalid = descLength !== 0 && (descLength < 155 || descLength > 165)
    const tabs: Tab[] = [
        { key: 'basic', label: 'Basic Information' },
        { key: 'price', label: 'Price' },
        { key: 'advanced', label: 'Advanced Information' },
    ];


    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Product', url: routes.eCommerce.products },
        { title: mode === 'create' ? 'Create' : 'Edit' },
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

    const handleSubmit = () => {
        let errors: any = {}
        if (!formData.tab_basic_information.productName) {
            errors.name = 'Product Name is required'
        }
        if (!formData.tab_basic_information.sku) {
            errors.sku = 'SKU is required'
        }
        if (!formData.tab_basic_information.description) {
            errors.description = 'Description is required'
        }
        if (formData.tab_basic_information.images.length == 0) {
            errors.images = 'Images is required'
        }

        setFormErrors(errors)

        if (Object.keys(errors).length > 0) {
            return;
        }
        if (isTitleInvalid || isDescInvalid) {
            return;
        }
        const submitData = {
            id: mode == 'edit' ? slug : null,
            brand_id: Number(formData.tab_basic_information.brand),
            category_id: Number(formData.tab_basic_information.categories),
            // subCategoriesId: Number(formData.tab_basic_information.subCategoriesId) || 1,
            name: formData.tab_basic_information.productName,
            // short_description: formData.tab_basic_information.shortDesc || 'short-desc',
            slug: formData.tab_basic_information.slug,
            description: formData.tab_basic_information.description,
            meta_title: formData.tab_basic_information.metaTitle,
            meta_description: formData.tab_basic_information.metaDescription,
            tax_class_id: formData.tab_basic_information.taxClass || null,
            manual_url: formData.tab_basic_information.manualUrl,
            warranty_month: Number(formData.tab_basic_information.warranty),
            status: formData.tab_basic_information.status,
            sku: formData.tab_basic_information.sku,
            sku2: formData.tab_basic_information.sku2,
            mpn: formData.tab_basic_information.mpn,
            best_seller: formData.tab_basic_information.isBestSeller,
            back_order: formData.tab_basic_information.isBackOrder,
            buy_price: Number(formData.tab_price.buying_price),
            recommended_retail_price: Number(formData.tab_price.rrp),
            trade_price: Number(formData.tab_price.trade),
            silver_price: Number(formData.tab_price.silver),
            gold_price: Number(formData.tab_price.gold),
            platinum_price: Number(formData.tab_price.platinum),
            diamond_price: Number(formData.tab_price.diamond),
            last_price: Number(formData.tab_price.last_price),
            additional_shipping_cost: Number(formData.tab_price.additional_shipping_cost),
            tags: formData.tab_basic_information.tags,
            images: formData.tab_basic_information.images,
            suppliers: formData.tab_price.suppliers
                .filter((supp: any) => supp?.supplierName && supp?.price)
                .map((supp: any) => ({
                    supplier_id: supp.supplierName,
                    price: supp.price
                })),
            kits: formData.tab_price.kits
                .filter((kit: any) => kit?.productName)
                .map((kit: any) => kit.productName),
            attributes: formData.tab_advanced.attributes
                .filter((attr: any) => attr?.name)
                .map((attr: any) => ({
                    attribute_id: attr.name,
                    price: attr.price
                })),

            options: formData.tab_advanced.options
                .filter((opt: any) => opt?.name)
                .map((opt: any) => opt.name),

            relateds: formData.tab_advanced.relateds
                .filter((rel: any) => rel)
                .map((rel: any) => rel),
        }

        if (mode == 'edit' && slug) {
            updateProductMutate(submitData)
        } else {
            createProductMutate(submitData)
        }

    }

    console.log('ini dari form product', formData)

    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Product' : 'Edit Product'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                borderClass='w-full'
            />

            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='bg-background'>
                        {activeTab === 'basic' && (
                            <div className="space-y-8">
                                <BasicInformationProduct
                                    onChange={(data) => handleChange('tab_basic_information', data)}
                                    dataById={initialValues}
                                    formDataCreate={formData}
                                    errors={formErrors}
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
                                <AdvancedInformation
                                    onChange={(data) => handleChange('tab_advanced', data)}
                                    dataById={initialValues}
                                    formDataCreate={formData}
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

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
