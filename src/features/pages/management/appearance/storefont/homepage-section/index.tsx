'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form-group';
import Input from "@/components/input"
import TextArea from "@/components/textarea"
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import SwitchInput from '@/components/switch';
import { uploadImages } from '@/services/upload-images';
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file';
import DatePickerInput from '@/components/date-picker';
import { PlusOutlined, MinusCircleOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'
import { Divider } from 'antd';

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [isLoading, setIsLoading] = useState({
        logo: false,
        favicon: false,
        mail_logo: false,
        payment_method_image: false,
        background_image: false,
        product_banner: false,
        slide_image: false,
        background_image_column_width: false,
        image: false,
        two_column_banner_image: false,
        three_column_banner_image: false,
        contact_banner_image: false,
        one_column_banner_image: false
    })
    const [formData, setFormData] = useState({
        banners: [
            {
                call_to_action_url: initialValues ? initialValues.call_to_action_url : '',
                open_in_new_window: initialValues ? initialValues.open_in_new_window : false,
                slide_image: initialValues ? initialValues.slide_image : []
            }
        ],

        three_column_full_width: {
            background_image_column_width: initialValues ? initialValues.background_image : [],
            section_status: initialValues ? initialValues.section_status : false,
            section_title: initialValues ? initialValues.section_title : '',
            banners: [
                {
                    call_to_action_url: initialValues ? initialValues.call_to_action_url : '',
                    open_in_new_window: initialValues ? initialValues.open_in_new_window : false,
                    image: initialValues ? initialValues.image : []
                }
            ]
        },

        featured_categories: {
            section_status: initialValues ? initialValues.section_status : false,
            section_title: initialValues ? initialValues.section_title : '',
            section_subtitle: initialValues ? initialValues.section_subtitle : '',
            categories: [
                {
                    category: initialValues ? initialValues.category : '',
                    type: initialValues ? initialValues.type : '',
                }
            ]
        },

        product_tabs_one: {
            section_status: initialValues ? initialValues.section_status : false,
            section_title: initialValues ? initialValues.section_title : '',
            tabs: [
                {
                    title: initialValues ? initialValues.title : '',
                    type: initialValues ? initialValues.type : '',
                    product: initialValues ? initialValues.product : [],
                }
            ]
        },

        top_brands: {
            section_status: initialValues ? initialValues.section_status : false,
            top_brand: initialValues ? initialValues.top_brand : [],
        },

        flash_sale_vertical_product: {
            section_status: initialValues ? initialValues.section_status : false,
            section_title: initialValues ? initialValues.section_title : '',
            flash_sale_title: initialValues ? initialValues.flash_sale_title : '',
            active_campaign: initialValues ? initialValues.active_campaign : '',
            vertical_product: [
                {
                    title: initialValues ? initialValues.title : '',
                    type: initialValues ? initialValues.type : '',
                    product: initialValues ? initialValues.product : [],
                }
            ]
        },

        two_column_banners: {
            section_status: initialValues ? initialValues.section_status : false,
            banners: [
                {
                    call_to_action_url: initialValues ? initialValues.call_to_action_url : '',
                    open_in_new_window: initialValues ? initialValues.open_in_new_window : false,
                    two_column_banner_image: initialValues ? initialValues.two_column_banner_image : []
                }
            ]
        },

        product_grid: {
            section_status: initialValues ? initialValues.section_status : false,
            tabs: [
                {
                    title: initialValues ? initialValues.title : '',
                    type: initialValues ? initialValues.type : '',
                    product: initialValues ? initialValues.product : [],
                    category: initialValues ? initialValues.category : [],
                }
            ]
        },

        three_column_banner: {
            section_status: initialValues ? initialValues.section_status : false,
            banners: [
                {
                    call_to_action_url: initialValues ? initialValues.call_to_action_url : '',
                    open_in_new_window: initialValues ? initialValues.open_in_new_window : false,
                    three_column_banner_image: initialValues ? initialValues.three_column_banner_image : []
                }
            ]
        },

        contact_banner: {
            section_status: initialValues ? initialValues.section_status : false,
            banners: [
                {
                    call_to_action_url: initialValues ? initialValues.call_to_action_url : '',
                    open_in_new_window: initialValues ? initialValues.open_in_new_window : false,
                    contact_banner_image: initialValues ? initialValues.contact_banner_image : []
                }
            ]
        },

        product_tabs_two: {
            section_status: initialValues ? initialValues.section_status : false,
            section_title: initialValues ? initialValues.section_title : '',
            title: initialValues ? initialValues.title : '',
            tabs: [
                {
                    title: initialValues ? initialValues.title : '',
                    type: initialValues ? initialValues.type : '',
                    category: initialValues ? initialValues.category : '',
                }
            ]
        },


        one_column_banner: {
            section_status: initialValues ? initialValues.section_status : false,
            banners: [
                {
                    call_to_action_url: initialValues ? initialValues.call_to_action_url : '',
                    open_in_new_window: initialValues ? initialValues.open_in_new_window : false,
                    one_column_banner_image: initialValues ? initialValues.one_column_banner_image : []
                }
            ]

        },


    });

    const handleDateChange = (field: 'bills_default_due_date' | 'sales_invoice_default_due_date' | 'expire_due_date', value: any, dateString: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: dateString,
        }));
    };

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleChangeSelect = (id: string, value: string | string[]) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleCheckbox = (key: string, val: boolean) => {
        const updated = { ...formData, [key]: val };
        setFormData(updated)
    };


    const handleArrayFieldChange = (
        fieldName: keyof typeof formData,
        index: number,
        key: string,
        value: any
    ) => {
        const updatedArray = [...(formData[fieldName] as any[])];
        updatedArray[index][key] = value;

        setFormData(prev => ({
            ...prev,
            [fieldName]: updatedArray
        }));
    };

    const handleNestedObjectSelectChange = (
        parentKey: keyof typeof formData, // contoh: 'top_brands'
        childKey: string,                 // contoh: 'top_brand'
        value: any
    ) => {
        setFormData(prev => ({
            ...prev,
            [parentKey]: {
                ...prev[parentKey],
                [childKey]: value,
            }
        }));
    };


    // const handleObjectFieldChangeSelect = (
    //     parentKey: keyof typeof formData,       // 'top_brands'
    //     childKey: string,                       // 'top_brand'
    //     index: number,
    //     key: string,
    //     value: any
    // ) => {
    //     setFormData(prev => {
    //         const parent = prev[parentKey] as any;

    //         const updatedArray = [...(parent[childKey] || [])];
    //         updatedArray[index] = {
    //             ...updatedArray[index],
    //             [key]: value,
    //         };

    //         return {
    //             ...prev,
    //             [parentKey]: {
    //                 ...parent,
    //                 [childKey]: updatedArray,
    //             }
    //         };
    //     });
    // };


    const handleSuccess = async (file: any, field: string, index?: number, parentField?: string) => {
        setIsLoading(prev => ({ ...prev, [field]: true }));
        try {
            const formData = new FormData()
            formData.append('image', file);          // field harus sama dengan API
            formData.append('path_name', 'product');
            const res = await uploadImages(formData)
            if (res.success == true) {
                const images = [{
                    name: file.name,
                    url: res?.data?.public_url,
                    default: true,
                    alt_image: file.name
                }]

                setFormData((prev: any) => {
                    if (typeof index === 'number') {
                        if (parentField) {
                            // ✅ nested array: three_column_full_width.banners[index]
                            const nestedArray = [...(prev[parentField]?.banners || [])];
                            nestedArray[index] = {
                                ...nestedArray[index],
                                [field]: images,
                            };
                            return {
                                ...prev,
                                [parentField]: {
                                    ...(prev[parentField] || {}),
                                    banners: nestedArray,
                                },
                            };
                        } else if (prev.banners) {
                            // ✅ non-nested array: banners[index]
                            const updatedBanners = [...prev.banners];
                            updatedBanners[index] = {
                                ...updatedBanners[index],
                                [field]: images,
                            };
                            return { ...prev, banners: updatedBanners };
                        }
                    } else if (parentField) {
                        // ✅ nested non-array: three_column_full_width.background_image
                        return {
                            ...prev,
                            [parentField]: {
                                ...(prev[parentField] || {}),
                                [field]: images,
                            },
                        };
                    }

                    // ✅ root-level field: e.g., formData.thumbnail_image
                    return { ...prev, [field]: images };
                });


            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleError = (file: any) => {
        console.error('Failed to upload:', file);
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            banners: [
                ...prev.banners,
                {
                    call_to_action_url: '',
                    open_in_new_window: false,
                    slide_image: []
                }
            ]
        }));
    };

    const removeItem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            banners: prev.banners.filter((_, i) => i !== index)
        }));
    };

    const addNestedItem = (
        parentField: string,
        nestedField: string,
        newItem: any
    ) => {
        setFormData((prev: any) => ({
            ...prev,
            [parentField]: {
                ...(prev[parentField] || {}),
                [nestedField]: [
                    ...((prev[parentField]?.[nestedField] as any[]) || []),
                    newItem,
                ],
            },
        }));
    };

    const removeNestedItem = (
        parentField: string,
        nestedField: string,
        index: number
    ) => {
        setFormData((prev: any) => {
            const updated = [
                ...((prev[parentField]?.[nestedField] as any[]) || []),
            ];
            updated.splice(index, 1);

            return {
                ...prev,
                [parentField]: {
                    ...(prev[parentField] || {}),
                    [nestedField]: updated,
                },
            };
        });
    };

    const handleNestedArrayFieldChange = (
        parentField: string,
        nestedField: string,
        index: number,
        key: string,
        value: any
    ) => {
        setFormData((prev: any) => {
            const updatedNestedArray = [...(prev[parentField]?.[nestedField] || [])];
            updatedNestedArray[index][key] = value;

            return {
                ...prev,
                [parentField]: {
                    ...(prev[parentField] || {}),
                    [nestedField]: updatedNestedArray,
                },
            };
        });
    };



    const handleSubmit = async () => {
        try {
            // const submitData = {
            //     logo: formData.logo,
            //     logo_favicon: formData.logo_favicon,
            //     company_name: formData.company_name,
            //     address: formData.address,
            //     city: formData.city,
            //     country: formData.country,
            //     postcode: formData.postcode,
            //     phone_number: formData.phone_number,
            //     email: formData.email,

            // }

            // let response;
            // if (mode == 'edit' && slug) {
            //     response = await updatePriceLevel(slug, submitData)
            // } else {
            //     response = await addPriceLevel(submitData)
            // }

            // if (response.success == true) {
            //     notifySuccess(response.message)
            //     setTimeout(() => {
            //         router.push(routes.eCommerce.priceLevel)
            //     }, 2000);
            // }
        } catch (error) {
            console.error(error)
        }

    }

    const optionsColor = [
        { label: 'Blue', value: 'blue' },
        { label: 'Bondi Blue', value: 'bondiblue' },
        { label: 'Cornflower', value: 'cornflower' },
        { label: 'Violet', value: 'violet' },
        { label: 'Red', value: 'red' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Orange', value: 'orange' },
        { label: 'Pink', value: 'pink' },
        { label: 'Green', value: 'green' },
        { label: 'Black', value: 'black' },
        { label: 'Indigo', value: 'indigo' },
        { label: 'Magenta', value: 'magenta' }
    ]

    const optionsSlider = [
        { label: 'Main Slider', value: 'mainslider' }
    ]
    const optionsTermConditions = [
        { label: 'Term & Conditions Alarm Expert', value: 'term-conditions-alarm-expert' }
    ]

    const optionsCategory = [
        { label: "Alarm", value: 'alarm' },
    ]

    const optionsType = [
        { label: "Custom Products", value: 'custom_products' },
    ]

    console.log(formData)

    return (
        <>
            {contextHolder}
            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    <div className='flex flex-col md:gap-10 gap-6'>
                        <div>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h4 className="text-lg font-semibold">Slide Banners</h4>
                                    <p className="mt-2">Slide Banners</p>
                                </div>
                                <Button
                                    label='Add Banner'
                                    icon={<PlusOutlined />}
                                    onClick={addItem}
                                />
                            </div>
                            <Divider />
                            <div className={`col-span-12 md:col-span-8 grid grid-cols-2 gap-4`}>
                                <div className="space-y-4 col-span-full">
                                    {
                                        formData.banners.map((feat, index: number) => {
                                            return (
                                                <div key={index} className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                                    <div className='col-span-full flex gap-3 justify-between mb-4'>
                                                        <h4 className='text-base font-medium'>Banner {index + 1}</h4>
                                                        <div>
                                                            <CloseOutlined className='cursor-pointer' onClick={() => removeItem(index)} />
                                                        </div>
                                                    </div>
                                                    <div className='grid md:grid-cols-3 gap-2'>
                                                        <Input
                                                            id='title'
                                                            label='Title'
                                                            type='text'
                                                            placeholder='Title'
                                                            onChange={(e) => handleArrayFieldChange('banners', index, 'call_to_action_url', e.target.value)}
                                                            value={feat.call_to_action_url}
                                                        />
                                                        <CheckboxInput
                                                            label='Open in new window'
                                                            text='Enable open in new window'
                                                            checked={feat.open_in_new_window}
                                                            onChange={(checked) => handleArrayFieldChange('banners', index, 'open_in_new_window', checked)}
                                                        />
                                                        <FileUploader
                                                            label='Slide Image'
                                                            action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                                            onSuccess={(file) => handleSuccess(file, 'slide_image', index)}
                                                            onError={handleError}
                                                            isUpload={isLoading.slide_image}
                                                            fileList={feat.slide_image.logo?.map((img: any, index: any) => {
                                                                return {
                                                                    uid: `${index}`,
                                                                    name: img.name ?? img.url,
                                                                    status: 'done',
                                                                    url: img.url
                                                                }
                                                            })}
                                                        />
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <FormGroup
                            title="Three Column Full Width"
                            description="Three Column Full Width"

                        >
                            <div className='grid  md:grid-cols-3 gap-3'>
                                <CheckboxInput
                                    label='Section Status'
                                    text='Enable features section'
                                    checked={formData.three_column_full_width.section_status}
                                    onChange={(checked) => handleCheckbox('section_status', checked)}
                                />
                                <Input
                                    id='section_title'
                                    label='Section Title'
                                    type='text'
                                    placeholder='Section Title'
                                    onChange={handleChange}
                                    value={formData.three_column_full_width.section_title}
                                    className='mb-1'
                                />
                                <FileUploader
                                    label='Background Image'
                                    action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                    onSuccess={(file) => handleSuccess(file, 'background_image_column_width', undefined, 'three_column_full_width')}
                                    onError={handleError}
                                    isUpload={isLoading.background_image_column_width}
                                    fileList={formData.three_column_full_width.background_image_column_width?.map((img: any, index: any) => {
                                        return {
                                            uid: `${index}`,
                                            name: img.name ?? img.url,
                                            status: 'done',
                                            url: img.url
                                        }
                                    })}
                                />
                                <Button
                                    label='Add Banner'
                                    icon={<PlusOutlined />}
                                    onClick={() => addNestedItem('three_column_full_width', 'banners', {
                                        call_to_action_url: '',
                                        open_in_new_window: false,
                                        image: []
                                    })}
                                />
                                {
                                    formData.three_column_full_width.banners.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                                <div className='col-span-full flex gap-3 justify-between mb-4'>
                                                    <h4 className='text-base font-medium'>Banner {index + 1}</h4>
                                                    <div>
                                                        <CloseOutlined className='cursor-pointer' onClick={() => removeNestedItem('three_column_full_width', 'banners', index)} />
                                                    </div>
                                                </div>
                                                <div className='grid md:grid-cols-3 gap-2'>
                                                    <Input
                                                        id='title'
                                                        label='Title'
                                                        type='text'
                                                        placeholder='Title'
                                                        onChange={(e) => handleNestedArrayFieldChange(
                                                            'three_column_full_width',
                                                            'banners',
                                                            index,
                                                            'call_to_action_url',
                                                            e.target.value
                                                        )}
                                                        value={item.call_to_action_url}
                                                    />
                                                    <CheckboxInput
                                                        label='Open in new window'
                                                        text='Enable open in new window'
                                                        checked={item.open_in_new_window}
                                                        onChange={(checked) => handleNestedArrayFieldChange(
                                                            'three_column_full_width',
                                                            'banners',
                                                            index,
                                                            'open_in_new_window',
                                                            checked
                                                        )}
                                                    />
                                                    <FileUploader
                                                        label='Image'
                                                        action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                                        onSuccess={(file) => handleSuccess(file, 'image', index, 'three_column_full_width')}
                                                        onError={handleError}
                                                        isUpload={isLoading.image}
                                                        fileList={item.image.map((img: any, index: any) => {
                                                            return {
                                                                uid: `${index}`,
                                                                name: img.name ?? img.url,
                                                                status: 'done',
                                                                url: img.url
                                                            }
                                                        })}
                                                    />
                                                </div>

                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Featured Categories"
                            description="Featured categories"

                        >
                            <div className='grid  md:grid-cols-3 gap-3'>
                                <CheckboxInput
                                    label='Section Status'
                                    text='Enable features section'
                                    checked={formData.featured_categories.section_status}
                                    onChange={(checked) => handleCheckbox('section_status', checked)}
                                />
                                <Input
                                    id='section_title'
                                    label='Section Title'
                                    type='text'
                                    placeholder='Section Title'
                                    onChange={handleChange}
                                    value={formData.featured_categories.section_title}
                                    className='mb-1'
                                />
                                <Input
                                    id='section_subtitle'
                                    label='Section Sub Title'
                                    type='text'
                                    placeholder='Section Sub Title'
                                    onChange={handleChange}
                                    value={formData.featured_categories.section_subtitle}
                                    className='mb-1'
                                />
                                <Button
                                    label='Add Category'
                                    icon={<PlusOutlined />}
                                    onClick={() => addNestedItem('featured_categories', 'categories', {
                                        category: '',
                                        type: '',
                                    })}
                                />
                                {
                                    formData.featured_categories.categories.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                                <div className='col-span-full flex gap-3 justify-between mb-4'>
                                                    <h4 className='text-base font-medium'>Category {index + 1}</h4>
                                                    <div>
                                                        <CloseOutlined className='cursor-pointer' onClick={() => removeNestedItem('featured_categories', 'categories', index)} />
                                                    </div>
                                                </div>
                                                <div className='grid md:grid-cols-2 gap-2'>
                                                    <SelectInput
                                                        id='category'
                                                        label='Category'
                                                        placeholder='Category'
                                                        onChange={(selected: any) => handleNestedArrayFieldChange(
                                                            'featured_categories',
                                                            'categories',
                                                            index,
                                                            'category',
                                                            selected?.value
                                                        )}
                                                        value={item.category}
                                                        options={optionsCategory}
                                                    />
                                                    <SelectInput
                                                        id='type'
                                                        label='Type'
                                                        placeholder='Type'
                                                        onChange={(selected: any) => handleNestedArrayFieldChange(
                                                            'featured_categories',
                                                            'categories',
                                                            index,
                                                            'type',
                                                            selected?.value
                                                        )}
                                                        value={item.type}
                                                        options={optionsType}
                                                    />

                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Product Tabs One"
                            description="Product Tabs One"

                        >
                            <div className='grid  md:grid-cols-3 gap-3'>
                                <CheckboxInput
                                    label='Section Status'
                                    text='Enable features section'
                                    checked={formData.featured_categories.section_status}
                                    onChange={(checked) => handleCheckbox('section_status', checked)}
                                />
                                <Input
                                    id='section_title'
                                    label='Section Title'
                                    type='text'
                                    placeholder='Section Title'
                                    onChange={handleChange}
                                    value={formData.featured_categories.section_title}
                                    className='mb-1'
                                />
                                <Button
                                    label='Add Tab'
                                    icon={<PlusOutlined />}
                                    onClick={() => addNestedItem('product_tabs_one', 'tabs', {
                                        title: '',
                                        type: '',
                                        product: ''
                                    })}
                                />
                                {
                                    formData.product_tabs_one.tabs.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                                <div className='col-span-full flex gap-3 justify-between mb-4'>
                                                    <h4 className='text-base font-medium'>Tab {index + 1}</h4>
                                                    <div>
                                                        <CloseOutlined className='cursor-pointer' onClick={() => removeNestedItem('product_tabs_one', 'tabs', index)} />
                                                    </div>
                                                </div>
                                                <div className='grid md:grid-cols-3 gap-2'>
                                                    <Input
                                                        id='title'
                                                        label='Title'
                                                        type='text'
                                                        placeholder='Title'
                                                        onChange={(e) => handleNestedArrayFieldChange(
                                                            'product_tabs_one',
                                                            'tabs',
                                                            index,
                                                            'title',
                                                            e.target.value
                                                        )}
                                                        value={item.title}
                                                    />
                                                    <SelectInput
                                                        id='type'
                                                        label='Type'
                                                        placeholder='Type'
                                                        onChange={(selected: any) => handleNestedArrayFieldChange(
                                                            'product_tabs_one',
                                                            'tabs',
                                                            index,
                                                            'type',
                                                            selected?.value
                                                        )}
                                                        value={item.type}
                                                        options={optionsType}
                                                    />
                                                    <SelectInput
                                                        id='product'
                                                        label='Product'
                                                        placeholder='Product'
                                                        modeType='multiple'
                                                        onChange={(selected: any) => handleNestedArrayFieldChange(
                                                            'product_tabs_one',
                                                            'tabs',
                                                            index,
                                                            'product',
                                                            selected?.value
                                                        )}
                                                        value={item.product || undefined}
                                                        options={optionsCategory}
                                                    />

                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Top Brands"
                            description="Top Brands"

                        >
                            <div className='grid  md:grid-cols-3 gap-3'>
                                <CheckboxInput
                                    label='Section Status'
                                    text='Enable features section'
                                    checked={formData.top_brands.section_status}
                                    onChange={(checked) => handleCheckbox('section_status', checked)}
                                />
                                <SelectInput
                                    id='top_brand'
                                    label='Top Brand'
                                    modeType='multiple'
                                    placeholder='Top Brand'
                                    onChange={(selected: any) =>
                                        handleNestedObjectSelectChange(
                                            'top_brands',
                                            'top_brand',
                                            selected
                                        )
                                    }
                                    value={formData.top_brands.top_brand || undefined}
                                    options={optionsType}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Flash Sale & Vertical Product"
                            description="Flash Sale & Vertical Product"

                        >
                            <div className='grid md:grid-cols-3 gap-3'>
                                <CheckboxInput
                                    label='Section Status'
                                    text='Enable features section'
                                    checked={formData.flash_sale_vertical_product.section_status}
                                    onChange={(checked) => handleCheckbox('section_status', checked)}
                                />
                                <Input
                                    id='section_title'
                                    label='Section Title'
                                    type='text'
                                    placeholder='Section Title'
                                    onChange={handleChange}
                                    value={formData.flash_sale_vertical_product.section_title}
                                    className='mb-1'
                                />
                                <div className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                    <div className='col-span-full flex gap-3 justify-between mb-4'>
                                        <h4 className='text-base font-medium'>Flash Sale</h4>
                                    </div>
                                    <div className='grid md:grid-cols-3 gap-2'>
                                        <Input
                                            id='title'
                                            label='Title'
                                            type='text'
                                            placeholder='Title'
                                            onChange={handleChange}
                                            value={formData.flash_sale_vertical_product.flash_sale_title}
                                        />
                                        <SelectInput
                                            id='flash_sale_title'
                                            label='Title'
                                            placeholder='Title'
                                            onChange={(selected: any) =>
                                                handleNestedObjectSelectChange(
                                                    'flash_sale_vertical_product',
                                                    'flash_sale_title',
                                                    selected
                                                )
                                            }
                                            value={formData.flash_sale_vertical_product.flash_sale_title}
                                            options={optionsType}
                                        />

                                    </div>
                                </div>
                                <Button
                                    label='Add Vertical Category'
                                    icon={<PlusOutlined />}
                                    onClick={() => addNestedItem('flash_sale_vertical_product', 'vertical_product', {
                                        title: '',
                                        type: '',
                                        product: ''
                                    })}
                                />
                                {
                                    formData.flash_sale_vertical_product.vertical_product.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                                <div className='col-span-full flex gap-3 justify-between mb-4'>
                                                    <h4 className='text-base font-medium'>Vertical Category {index + 1}</h4>
                                                    <div>
                                                        <CloseOutlined className='cursor-pointer' onClick={() => removeNestedItem('flash_sale_vertical_product', 'vertical_product', index)} />
                                                    </div>
                                                </div>
                                                <div className='grid md:grid-cols-3 gap-2'>
                                                    <Input
                                                        id='title'
                                                        label='Title'
                                                        type='text'
                                                        placeholder='Title'
                                                        onChange={(e) => handleNestedArrayFieldChange(
                                                            'flash_sale_vertical_product',
                                                            'vertical_product',
                                                            index,
                                                            'title',
                                                            e.target.value
                                                        )}
                                                        value={item.title}
                                                    />
                                                    <SelectInput
                                                        id='type'
                                                        label='Type'
                                                        placeholder='Type'
                                                        onChange={(selected: any) => handleNestedArrayFieldChange(
                                                            'flash_sale_vertical_product',
                                                            'vertical_product',
                                                            index,
                                                            'type',
                                                            selected?.value
                                                        )}
                                                        value={item.type}
                                                        options={optionsType}
                                                    />
                                                    <SelectInput
                                                        id='product'
                                                        label='Product'
                                                        placeholder='Product'
                                                        modeType='multiple'
                                                        onChange={(selected: any) => handleNestedArrayFieldChange(
                                                            'flash_sale_vertical_product',
                                                            'vertical_product',
                                                            index,
                                                            'product',
                                                            selected?.value
                                                        )}
                                                        value={item.product || undefined}
                                                        options={optionsCategory}
                                                    />

                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Two Column Banners"
                            description="Two Column Banners"

                        >
                            <div className='grid  md:grid-cols-3 gap-3'>
                                <CheckboxInput
                                    label='Section Status'
                                    text='Enable features section'
                                    checked={formData.three_column_full_width.section_status}
                                    onChange={(checked) => handleCheckbox('section_status', checked)}
                                />
                                <Button
                                    label='Add Banner'
                                    icon={<PlusOutlined />}
                                    onClick={() => addNestedItem('two_column_banners', 'banners', {
                                        call_to_action_url: '',
                                        open_in_new_window: false,
                                        two_column_banner_image: []
                                    })}
                                />
                                {
                                    formData.two_column_banners.banners.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                                <div className='col-span-full flex gap-3 justify-between mb-4'>
                                                    <h4 className='text-base font-medium'>Banner {index + 1}</h4>
                                                    <div>
                                                        <CloseOutlined className='cursor-pointer' onClick={() => removeNestedItem('two_column_banners', 'banners', index)} />
                                                    </div>
                                                </div>
                                                <div className='grid md:grid-cols-3 gap-2'>
                                                    <Input
                                                        id='title'
                                                        label='Title'
                                                        type='text'
                                                        placeholder='Title'
                                                        onChange={(e) => handleNestedArrayFieldChange(
                                                            'two_column_banners',
                                                            'banners',
                                                            index,
                                                            'call_to_action_url',
                                                            e.target.value
                                                        )}
                                                        value={item.call_to_action_url}
                                                    />
                                                    <CheckboxInput
                                                        label='Open in new window'
                                                        text='Enable open in new window'
                                                        checked={item.open_in_new_window}
                                                        onChange={(checked) => handleNestedArrayFieldChange(
                                                            'two_column_banners',
                                                            'banners',
                                                            index,
                                                            'open_in_new_window',
                                                            checked
                                                        )}
                                                    />
                                                    <FileUploader
                                                        label='Image'
                                                        action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                                        onSuccess={(file) => handleSuccess(file, 'two_column_banner_image', index, 'two_column_banners')}
                                                        onError={handleError}
                                                        isUpload={isLoading.two_column_banner_image}
                                                        fileList={item.two_column_banner_image.map((img: any, index: any) => {
                                                            return {
                                                                uid: `${index}`,
                                                                name: img.name ?? img.url,
                                                                status: 'done',
                                                                url: img.url
                                                            }
                                                        })}
                                                    />
                                                </div>

                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Product Grid"
                            description="Product Grid"

                        >
                            <div className='grid  md:grid-cols-3 gap-3'>
                                <CheckboxInput
                                    label='Section Status'
                                    text='Enable features section'
                                    checked={formData.three_column_full_width.section_status}
                                    onChange={(checked) => handleCheckbox('section_status', checked)}
                                />
                                <Button
                                    label='Add Tab'
                                    icon={<PlusOutlined />}
                                    onClick={() => addNestedItem('product_grid', 'tabs', {
                                        title: '',
                                        type: '',
                                        product: '',
                                        category: ''
                                    })}
                                />
                                {
                                    formData.product_grid.tabs.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                                <div className='col-span-full flex gap-3 justify-between mb-4'>
                                                    <h4 className='text-base font-medium'>Tab {index + 1}</h4>
                                                    <div>
                                                        <CloseOutlined className='cursor-pointer' onClick={() => removeNestedItem('product_grid', 'tabs', index)} />
                                                    </div>
                                                </div>
                                                <div className='grid md:grid-cols-3 gap-2'>
                                                    <Input
                                                        id='title'
                                                        label='Title'
                                                        type='text'
                                                        placeholder='Title'
                                                        onChange={(e) => handleNestedArrayFieldChange(
                                                            'product_grid',
                                                            'tabs',
                                                            index,
                                                            'title',
                                                            e.target.value
                                                        )}
                                                        value={item.title}
                                                    />
                                                    <SelectInput
                                                        id='type'
                                                        label='Type'
                                                        placeholder='Type'
                                                        onChange={(selected: any) => handleNestedArrayFieldChange(
                                                            'product_grid',
                                                            'tabs',
                                                            index,
                                                            'type',
                                                            selected?.value
                                                        )}
                                                        value={item.type}
                                                        options={optionsType}
                                                    />
                                                    {
                                                        index === 0 || index === 5 ? (
                                                            <SelectInput
                                                                id='category'
                                                                label='Category'
                                                                placeholder='Category'
                                                                onChange={(selected: any) => handleNestedArrayFieldChange(
                                                                    'product_grid',
                                                                    'tabs',
                                                                    index,
                                                                    'category',
                                                                    selected?.value
                                                                )}
                                                                value={item.category}
                                                                options={optionsCategory}
                                                            />
                                                        ) : (
                                                            <SelectInput
                                                                id='product'
                                                                label='Product'
                                                                placeholder='Product'
                                                                modeType='multiple'
                                                                onChange={(selected: any) => handleNestedArrayFieldChange(
                                                                    'product_grid',
                                                                    'tabs',
                                                                    index,
                                                                    'product',
                                                                    selected?.value
                                                                )}
                                                                value={item.product || undefined}
                                                                options={optionsCategory}
                                                            />
                                                        )
                                                    }


                                                </div>

                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Three Column Banners"
                            description="Three Column Banners"

                        >
                            <div className='grid  md:grid-cols-3 gap-3'>
                                <CheckboxInput
                                    label='Section Status'
                                    text='Enable features section'
                                    checked={formData.three_column_banner.section_status}
                                    onChange={(checked) => handleCheckbox('three_column_banner', checked)}
                                />
                                <Button
                                    label='Add Banner'
                                    icon={<PlusOutlined />}
                                    onClick={() => addNestedItem('three_column_banner', 'banners', {
                                        call_to_action_url: '',
                                        open_in_new_window: false,
                                        three_column_banner_image: []
                                    })}
                                />
                                {
                                    formData.three_column_banner.banners.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                                <div className='col-span-full flex gap-3 justify-between mb-4'>
                                                    <h4 className='text-base font-medium'>Banner {index + 1}</h4>
                                                    <div>
                                                        <CloseOutlined className='cursor-pointer' onClick={() => removeNestedItem('three_column_banner', 'banners', index)} />
                                                    </div>
                                                </div>
                                                <div className='grid md:grid-cols-3 gap-2'>
                                                    <Input
                                                        id='title'
                                                        label='Title'
                                                        type='text'
                                                        placeholder='Title'
                                                        onChange={(e) => handleNestedArrayFieldChange(
                                                            'three_column_banner',
                                                            'banners',
                                                            index,
                                                            'call_to_action_url',
                                                            e.target.value
                                                        )}
                                                        value={item.call_to_action_url}
                                                    />
                                                    <CheckboxInput
                                                        label='Open in new window'
                                                        text='Enable open in new window'
                                                        checked={item.open_in_new_window}
                                                        onChange={(checked) => handleNestedArrayFieldChange(
                                                            'three_column_banner',
                                                            'banners',
                                                            index,
                                                            'open_in_new_window',
                                                            checked
                                                        )}
                                                    />
                                                    <FileUploader
                                                        label='Image'
                                                        action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                                        onSuccess={(file) => handleSuccess(file, 'three_column_banner_image', index, 'three_column_banner')}
                                                        onError={handleError}
                                                        isUpload={isLoading.three_column_banner_image}
                                                        fileList={item.three_column_banner_image.map((img: any, index: any) => {
                                                            return {
                                                                uid: `${index}`,
                                                                name: img.name ?? img.url,
                                                                status: 'done',
                                                                url: img.url
                                                            }
                                                        })}
                                                    />
                                                </div>

                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Contact Banners"
                            description="Contact Banners"

                        >
                            <div className='grid  md:grid-cols-3 gap-3'>
                                <CheckboxInput
                                    label='Section Status'
                                    text='Enable features section'
                                    checked={formData.contact_banner.section_status}
                                    onChange={(checked) => handleCheckbox('contact_banner', checked)}
                                />
                                <Button
                                    label='Add Banner'
                                    icon={<PlusOutlined />}
                                    onClick={() => addNestedItem('contact_banner', 'banners', {
                                        call_to_action_url: '',
                                        open_in_new_window: false,
                                        contact_banner_image: []
                                    })}
                                />
                                {
                                    formData.contact_banner.banners.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                                <div className='col-span-full flex gap-3 justify-between mb-4'>
                                                    <h4 className='text-base font-medium'>Banner {index + 1}</h4>
                                                    <div>
                                                        <CloseOutlined className='cursor-pointer' onClick={() => removeNestedItem('contact_banner', 'banners', index)} />
                                                    </div>
                                                </div>
                                                <div className='grid md:grid-cols-3 gap-2'>
                                                    <Input
                                                        id='title'
                                                        label='Title'
                                                        type='text'
                                                        placeholder='Title'
                                                        onChange={(e) => handleNestedArrayFieldChange(
                                                            'contact_banner',
                                                            'banners',
                                                            index,
                                                            'call_to_action_url',
                                                            e.target.value
                                                        )}
                                                        value={item.call_to_action_url}
                                                    />
                                                    <CheckboxInput
                                                        label='Open in new window'
                                                        text='Enable open in new window'
                                                        checked={item.open_in_new_window}
                                                        onChange={(checked) => handleNestedArrayFieldChange(
                                                            'contact_banner',
                                                            'banners',
                                                            index,
                                                            'open_in_new_window',
                                                            checked
                                                        )}
                                                    />
                                                    <FileUploader
                                                        label='Image'
                                                        action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                                        onSuccess={(file) => handleSuccess(file, 'contact_banner_image', index, 'contact_banner')}
                                                        onError={handleError}
                                                        isUpload={isLoading.contact_banner_image}
                                                        fileList={item.contact_banner_image.map((img: any, index: any) => {
                                                            return {
                                                                uid: `${index}`,
                                                                name: img.name ?? img.url,
                                                                status: 'done',
                                                                url: img.url
                                                            }
                                                        })}
                                                    />
                                                </div>

                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Product Tabs Two"
                            description="Product Tabs Two"

                        >
                            <div className='grid  md:grid-cols-3 gap-3'>
                                <CheckboxInput
                                    label='Section Status'
                                    text='Enable features section'
                                    checked={formData.product_tabs_two.section_status}
                                    onChange={(checked) => handleCheckbox('section_status', checked)}
                                />
                                <Input
                                    id='section_title'
                                    label='Section Title'
                                    type='text'
                                    placeholder='Section Title'
                                    onChange={handleChange}
                                    value={formData.product_tabs_two.section_title}
                                />
                                <Input
                                    id='title'
                                    label='Title'
                                    type='text'
                                    placeholder='Title'
                                    onChange={handleChange}
                                    value={formData.product_tabs_two.title}
                                />
                                <Button
                                    label='Add Tab'
                                    icon={<PlusOutlined />}
                                    onClick={() => addNestedItem('product_tabs_two', 'tabs', {
                                        title: '',
                                        type: '',
                                        category: ''
                                    })}
                                />
                                {
                                    formData.product_tabs_two.tabs.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                                <div className='col-span-full flex gap-3 justify-between mb-4'>
                                                    <h4 className='text-base font-medium'>Tab {index + 1}</h4>
                                                    <div>
                                                        <CloseOutlined className='cursor-pointer' onClick={() => removeNestedItem('product_tabs_two', 'tabs', index)} />
                                                    </div>
                                                </div>
                                                <div className='grid md:grid-cols-3 gap-2'>
                                                    <Input
                                                        id='title'
                                                        label='Title'
                                                        type='text'
                                                        placeholder='Title'
                                                        onChange={(e) => handleNestedArrayFieldChange(
                                                            'product_tabs_two',
                                                            'tabs',
                                                            index,
                                                            'title',
                                                            e.target.value
                                                        )}
                                                        value={item.title}
                                                    />
                                                    <SelectInput
                                                        id='type'
                                                        label='Type'
                                                        placeholder='Type'
                                                        onChange={(selected: any) => handleNestedArrayFieldChange(
                                                            'product_tabs_two',
                                                            'tabs',
                                                            index,
                                                            'type',
                                                            selected?.value
                                                        )}
                                                        value={item.type}
                                                        options={optionsType}
                                                    />
                                                    <SelectInput
                                                        id='category'
                                                        label='Category'
                                                        placeholder='Category'
                                                        onChange={(selected: any) => handleNestedArrayFieldChange(
                                                            'product_tabs_two',
                                                            'tabs',
                                                            index,
                                                            'category',
                                                            selected?.value
                                                        )}
                                                        value={item.category}
                                                        options={optionsCategory}
                                                    />

                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </FormGroup>
                        <FormGroup
                            title="One Column Banner"
                            description="One Column Banner"

                        >
                            <div className='grid  md:grid-cols-3 gap-3'>
                                <CheckboxInput
                                    label='Section Status'
                                    text='Enable features section'
                                    checked={formData.one_column_banner.section_status}
                                    onChange={(checked) => handleCheckbox('one_column_banner', checked)}
                                />
                                {
                                    formData.one_column_banner.banners.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                                <div className='col-span-full flex gap-3 justify-between mb-4'>
                                                    <h4 className='text-base font-medium'>Banner {index + 1}</h4>
                                                    <div>
                                                        <CloseOutlined className='cursor-pointer' onClick={() => removeNestedItem('one_column_banner', 'banners', index)} />
                                                    </div>
                                                </div>
                                                <div className='grid md:grid-cols-3 gap-2'>
                                                    <Input
                                                        id='title'
                                                        label='Title'
                                                        type='text'
                                                        placeholder='Title'
                                                        onChange={(e) => handleNestedArrayFieldChange(
                                                            'one_column_banner',
                                                            'banners',
                                                            index,
                                                            'call_to_action_url',
                                                            e.target.value
                                                        )}
                                                        value={item.call_to_action_url}
                                                    />
                                                    <CheckboxInput
                                                        label='Open in new window'
                                                        text='Enable open in new window'
                                                        checked={item.open_in_new_window}
                                                        onChange={(checked) => handleNestedArrayFieldChange(
                                                            'one_column_banner',
                                                            'banners',
                                                            index,
                                                            'open_in_new_window',
                                                            checked
                                                        )}
                                                    />
                                                    <FileUploader
                                                        label='Image'
                                                        action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                                        onSuccess={(file) => handleSuccess(file, 'one_column_banner_image', index, 'one_column_banner')}
                                                        onError={handleError}
                                                        isUpload={isLoading.one_column_banner_image}
                                                        fileList={item.one_column_banner_image.map((img: any, index: any) => {
                                                            return {
                                                                uid: `${index}`,
                                                                name: img.name ?? img.url,
                                                                status: 'done',
                                                                url: img.url
                                                            }
                                                        })}
                                                    />
                                                </div>

                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </FormGroup>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label='Create General'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default index;
