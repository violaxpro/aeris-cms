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
import { PlusOutlined, MinusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { PlusOutlineIcon, CancelGreyIcon } from '@public/icon';
import dayjs from 'dayjs'
import ButtonIcon from '@/components/button/ButtonIcon';

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [isLoading, setIsLoading] = useState({
        logo: false,
        favicon: false,
        mail_logo: false,
        payment_method_image: false,
        background_image: false,
        product_banner: false
    })
    const [formData, setFormData] = useState({
        welcome_text: initialValues ? initialValues.welcome_text : '',
        middle_top_text: initialValues ? initialValues.middle_top_text : '',
        theme_color: initialValues ? initialValues.theme_color : '',
        mail_theme_color: initialValues ? initialValues.mail_theme_color : '',
        slider: initialValues ? initialValues.slider : '',
        term_conditions_page: initialValues ? initialValues.term_conditions_page : '',
        address: initialValues ? initialValues.address : '',
        logo: initialValues ? initialValues.logo : [],
        favicon: initialValues ? initialValues.favicon : [],
        mail_logo: initialValues ? initialValues.logo : [],
        navbar_text: initialValues ? initialValues.navbar_text : '',
        primary_menu: initialValues ? initialValues.primary_menu : '',
        primary_category_menu: initialValues ? initialValues.primary_category_menu : '',
        popular_categories: initialValues ? initialValues.popular_categories : '',
        category_menu: initialValues ? initialValues.category_menu : '',
        footer_menu_one_title: initialValues ? initialValues.footer_menu_one_title : '',
        footer_menu_one: initialValues ? initialValues.footer_menu_one : '',
        footer_menu_two_title: initialValues ? initialValues.footer_menu_two_title : '',
        footer_menu_two: initialValues ? initialValues.footer_menu_two : '',
        footer_tags: initialValues ? initialValues.footer_tags : '',
        footer_copyright_text: initialValues ? initialValues.footer_copyright_text : '',
        payment_method_image: initialValues ? initialValues.payment_method_image : [],
        background_image: initialValues ? initialValues.background_image : [],
        section_status: initialValues ? initialValues.section_status : false,
        features: [
            {
                title: initialValues ? initialValues.title : '',
                sub_title: initialValues ? initialValues.sub_title : '',
                icon: initialValues ? initialValues.icon : ''
            }
        ],
        call_to_action_url: initialValues ? initialValues.call_to_action_url : '',
        open_in_new_windows: initialValues ? initialValues.open_in_new_windows : false,
        product_page_banner_image: initialValues ? initialValues.product_page_banner_image : [],
        facebook_link: initialValues ? initialValues.facebook_link : '',
        twitter_link: initialValues ? initialValues.twitter_link : '',
        instagram_link: initialValues ? initialValues.instagram_link : '',
        youtube_link: initialValues ? initialValues.youtube_link : '',
    });

    const handleDateChange = (field: 'bills_default_due_date' | 'sales_invoice_default_due_date' | 'expire_due_date', value: any, dateString: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: dateString,
        }));
    };

    const optionsSecurityType = [
        { label: "SSL", value: 'ssl' },
        { label: "TLS", value: 'tls' },
        { label: "STARTTLS", value: 'starttls' },
        { label: "No Security", value: 'nosecurity' }
    ]

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


    const handleSuccess = async (file: any, field: string) => {
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

                setFormData((prev) => ({
                    ...prev,
                    [field]: images
                }));
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
            features: [
                ...prev.features,
                {
                    title: '',
                    sub_title: '',
                    icon: ''
                }
            ]
        }));
    };

    const removeItem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
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
        { label: 'Category', value: 'Category' },
        { label: 'Customer Service', value: 'Customer Service' },
        { label: 'Technical Document', value: 'Technical Document' },
        { label: 'Software Download', value: 'Software Download' },
        { label: 'Knowledge Base', value: 'Knowledge Base' },
        { label: 'Category 2', value: 'Category 2' },
    ]

    console.log(formData)

    return (
        <>
            {contextHolder}
            <Content className="mb-0">
                <div className='bg-[#fff] min-h-[360px] p-6'>
                    <div className='flex flex-col gap-8'>
                        <FormGroup
                            title="Default Setting"
                            description="Default Setting"
                        >
                            <div className='grid md:grid-cols-2 gap-3'>
                                <Input
                                    id='welcome_text'
                                    label='Welcome Text'
                                    type='text'
                                    placeholder='Welcome Text'
                                    onChange={handleChange}
                                    value={formData.welcome_text}
                                />
                                <Input
                                    id='middle_top_text'
                                    label='Middle Top Text'
                                    type='text'
                                    placeholder='Middle Top Text'
                                    onChange={handleChange}
                                    value={formData.middle_top_text}
                                />
                                <div className='col-span-full grid md:grid-cols-4 gap-3'>
                                    <SelectInput
                                        id='theme_color'
                                        label='Theme Color'
                                        onChange={(val) => handleChangeSelect('theme_color', val)}
                                        value={formData.theme_color}
                                        options={optionsColor}
                                        className='mb-1'
                                    />
                                    <SelectInput
                                        id='mail_theme_color'
                                        label='Mail Theme Color'
                                        onChange={(val) => handleChangeSelect('mail_theme_color', val)}
                                        value={formData.mail_theme_color}
                                        options={optionsColor}
                                        className='mb-1'
                                    />
                                    <SelectInput
                                        id='slider'
                                        label='Slider'
                                        onChange={(val) => handleChangeSelect('slider', val)}
                                        value={formData.slider}
                                        options={optionsSlider}
                                        className='mb-1'
                                    />
                                    <SelectInput
                                        id='term_conditions_page'
                                        label='Terms & Conditions Page'
                                        onChange={(val) => handleChangeSelect('term_conditions_page', val)}
                                        value={formData.term_conditions_page}
                                        options={optionsTermConditions}
                                        className='mb-1'
                                    />
                                </div>
                                <div className='col-span-full'>
                                    <TextArea
                                        label='Address'
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                        </FormGroup>
                        <FormGroup
                            title="Logo"
                            description="Logo"
                        >
                            <div className='grid  md:grid-cols-3 gap-3'>
                                <FileUploader
                                    label='Logo'
                                    action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                    onSuccess={(file) => handleSuccess(file, 'logo')}
                                    onError={handleError}
                                    isUpload={isLoading.logo}
                                    fileList={formData.logo?.map((img: any, index: any) => {
                                        return {
                                            uid: `${index}`,
                                            name: img.name ?? img.url,
                                            status: 'done',
                                            url: img.url
                                        }
                                    })}
                                />
                                <FileUploader
                                    label='Logo Favicon'
                                    action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                    onSuccess={(file) => handleSuccess(file, 'favicon')}
                                    onError={handleError}
                                    isUpload={isLoading.favicon}
                                    fileList={formData.favicon?.map((img: any, index: any) => {
                                        return {
                                            uid: `${index}`,
                                            name: img.name ?? img.url,
                                            status: 'done',
                                            url: img.url
                                        }
                                    })}
                                />
                                <FileUploader
                                    label='Mail Logo'
                                    action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                    onSuccess={(file) => handleSuccess(file, 'mail_logo')}
                                    onError={handleError}
                                    isUpload={isLoading.mail_logo}
                                    fileList={formData.mail_logo?.map((img: any, index: any) => {
                                        return {
                                            uid: `${index}`,
                                            name: img.name ?? img.url,
                                            status: 'done',
                                            url: img.url
                                        }
                                    })}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Menus"
                            description="Menus"
                        >
                            <div className='grid md:grid-cols-2 gap-3'>
                                <Input
                                    id='navbar_text'
                                    label='Navbar Text'
                                    type='text'
                                    placeholder='Navbar Text'
                                    onChange={handleChange}
                                    value={formData.navbar_text}
                                    className='mb-1'
                                />
                                <SelectInput
                                    id='primary_menu'
                                    label='Primary Menu'
                                    onChange={(val) => handleChangeSelect('primary_menu', val)}
                                    value={formData.primary_menu}
                                    options={optionsCategory}
                                />
                                <div className='col-span-full grid md:grid-cols-3 gap-3'>
                                    <SelectInput
                                        id='primary_category_menu'
                                        label='Primary Category Meny'
                                        onChange={(val) => handleChangeSelect('primary_category_menu', val)}
                                        value={formData.primary_category_menu}
                                        options={optionsCategory}
                                        className='mb-1'
                                    />
                                    <SelectInput
                                        id='popular_categories'
                                        label='Popular Categories'
                                        onChange={(val) => handleChangeSelect('popular_categories', val)}
                                        value={formData.popular_categories}
                                        options={optionsCategory}
                                        className='mb-1'
                                    />
                                    <SelectInput
                                        id='category_menu'
                                        label='Category Menu'
                                        onChange={(val) => handleChangeSelect('category_menu', val)}
                                        value={formData.category_menu}
                                        options={optionsCategory}
                                        className='mb-1'
                                    />
                                </div>
                                <div className='col-span-full grid md:grid-cols-4 gap-3'>
                                    <Input
                                        id='footer_menu_one_title'
                                        label='Footer Menu One Title'
                                        type='text'
                                        placeholder='Footer Menu One Title'
                                        onChange={handleChange}
                                        value={formData.footer_menu_one_title}
                                        className='mb-1'

                                    />
                                    <SelectInput
                                        id='footer_menu_one'
                                        label='Footer Menu One'
                                        onChange={(val) => handleChangeSelect('footer_menu_one', val)}
                                        value={formData.footer_menu_one}
                                        options={optionsCategory}
                                        className='mb-1'
                                    />
                                    <Input
                                        id='footer_menu_two_title'
                                        label='Footer Menu Two Title'
                                        type='text'
                                        placeholder='Footer Menu Two Title'
                                        onChange={handleChange}
                                        value={formData.footer_menu_two_title}
                                        className='mb-1'
                                    />
                                    <SelectInput
                                        id='footer_menu_two'
                                        label='Footer Menu Two'
                                        onChange={(val) => handleChangeSelect('footer_menu_two', val)}
                                        value={formData.footer_menu_two}
                                        options={optionsCategory}
                                        className='mb-1'
                                    />
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Footer"
                            description="Footer"
                        >
                            <div className='grid md:grid-cols-2 gap-3'>
                                <SelectInput
                                    id='footer_tags'
                                    label='Footer Tags'
                                    modeType='multiple'
                                    onChange={(val) => handleChangeSelect('footer_tags', val)}
                                    value={formData.footer_tags || undefined}
                                    options={optionsCategory}
                                />
                                <div className='row-span-2'>
                                    <FileUploader
                                        label='Accept Payment Method Image'
                                        action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                        onSuccess={(file) => handleSuccess(file, 'payment_method_image')}
                                        onError={handleError}
                                        isUpload={isLoading.payment_method_image}
                                        fileList={formData.payment_method_image?.map((img: any, index: any) => {
                                            return {
                                                uid: `${index}`,
                                                name: img.name ?? img.url,
                                                status: 'done',
                                                url: img.url
                                            }
                                        })}
                                    />
                                </div>
                                <Input
                                    id='footer_copyright_text'
                                    label='Footer Copyright Text'
                                    type='text'
                                    placeholder='Footer Copyright Text'
                                    onChange={handleChange}
                                    value={formData.footer_copyright_text}
                                    className='mb-1'
                                />
                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Newsletter"
                            description="Newsletter"
                        >
                            <FileUploader
                                label='Background Image'
                                action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                onSuccess={(file) => handleSuccess(file, 'background_imge')}
                                onError={handleError}
                                isUpload={isLoading.background_image}
                                fileList={formData.background_image?.map((img: any, index: any) => {
                                    return {
                                        uid: `${index}`,
                                        name: img.name ?? img.url,
                                        status: 'done',
                                        url: img.url
                                    }
                                })}
                            />
                        </FormGroup>
                        <FormGroup
                            title="Section Status"
                            description="Section Status"
                            childClassName='flex flex-col gap-2'
                        >
                            <CheckboxInput
                                label='Section Status'
                                text='Enable features section'
                                checked={formData.section_status}
                                onChange={(checked) => handleCheckbox('section_status', checked)}
                            />
                            <div className='space-y-4 col-span-full'>
                                {
                                    formData.features.map((feat, index: number) => {
                                        return (
                                            <div key={index} className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                                <div className='col-span-full flex gap-3 justify-between mb-4'>
                                                    <h4 className='text-base font-medium'>Feature {index + 1}</h4>
                                                    <div>
                                                        <ButtonIcon
                                                            icon={CancelGreyIcon}
                                                            shape='circle'
                                                            variant='filled'
                                                            color='default'
                                                            onClick={() => removeItem(index)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='grid md:grid-cols-3 gap-2'>
                                                    <Input
                                                        id='title'
                                                        label='Title'
                                                        type='text'
                                                        placeholder='Title'
                                                        onChange={(e) => handleArrayFieldChange('features', index, 'title', e.target.value)}
                                                        value={feat.title}
                                                    />
                                                    <Input
                                                        id='sub_title'
                                                        label='Sub Title'
                                                        type='text'
                                                        placeholder='Sub Title'
                                                        onChange={(e) => handleArrayFieldChange('features', index, 'sub_title', e.target.value)}
                                                        value={feat.sub_title}
                                                    />
                                                    <Input
                                                        id='icon'
                                                        label='Icon'
                                                        type='text'
                                                        placeholder='Icon'
                                                        onChange={(e) => handleArrayFieldChange('features', index, 'icon', e.target.value)}
                                                        value={feat.icon}
                                                    />
                                                </div>

                                            </div>
                                        )
                                    })
                                }

                                <div className="flex justify-end mt-4">
                                    <Button
                                        label='Add Feature'
                                        icon={<Image
                                            src={PlusOutlineIcon}
                                            alt='plus-icon'
                                            width={15}
                                        />}
                                        onClick={addItem}
                                    />
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Product Page"
                            description="Product Page"
                        >
                            <div className='col-span-full'>
                                <div className='grid md:grid-cols-2 gap-3'>
                                    <FileUploader
                                        label='Product Page Banner Image'
                                        action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                        onSuccess={(file) => handleSuccess(file, 'product_page_banner_image')}
                                        onError={handleError}
                                        isUpload={isLoading.product_banner}
                                        fileList={formData.product_page_banner_image?.map((img: any, index: any) => {
                                            return {
                                                uid: `${index}`,
                                                name: img.name ?? img.url,
                                                status: 'done',
                                                url: img.url
                                            }
                                        })}
                                    />
                                    <div className='flex flex-col gap-2'>
                                        <Input
                                            id='call_to_action_url'
                                            label='Call to Action URL'
                                            type='text'
                                            placeholder='Call to Action URL'
                                            onChange={handleChange}
                                            value={formData.call_to_action_url}
                                        />
                                        <CheckboxInput
                                            label='Open in new window'
                                            text='Enable open in new window'
                                            checked={formData.open_in_new_windows}
                                            onChange={(checked) => handleCheckbox('open_in_new_windows', checked)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup
                            title="Social Links"
                            description="Social Links"
                            className='mt-4'
                        >
                            <div className='grid md:grid-cols-2 gap-3'>
                                <Input
                                    id='facebook_link'
                                    label='Facebook Link'
                                    type='text'
                                    placeholder='Facebook Link'
                                    onChange={handleChange}
                                    value={formData.facebook_link}
                                />
                                <Input
                                    id='instagram_link'
                                    label='Instagram Link'
                                    type='text'
                                    placeholder='Instagram Link'
                                    onChange={handleChange}
                                    value={formData.instagram_link}
                                />
                                <Input
                                    id='twitter_link'
                                    label='Twitter Link'
                                    type='text'
                                    placeholder='Twitter Link'
                                    onChange={handleChange}
                                    value={formData.twitter_link}
                                />
                                <Input
                                    id='youtube_link'
                                    label='Youtube Link'
                                    type='text'
                                    placeholder='Youtube Link'
                                    onChange={handleChange}
                                    value={formData.youtube_link}
                                />
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
