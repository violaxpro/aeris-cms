'use client'
import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb"
import Input from '@/components/input'
import Button from '@/components/button'
import CheckboxInput from '@/components/checkbox'
import SelectInput from '@/components/select'
import FormGroup from '@/components/form-group'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import Tabs, { Tab } from '@/components/tab'
import { Content } from 'antd/es/layout/layout'
import { routes } from '@/config/routes'
import { FormProps } from '@/plugins/types/form-type';
import ButtonIcon from '@/components/button/ButtonIcon'
import Image from 'next/image'
import { CancelGreyIcon } from '@public/icon'

const FormSlider: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const [formData, setFormData] = useState({
        name: '',
        speed: '',
        fade: false,
        autoplay_speed: '',
        dots: false,
        arrows: false,
        image_slide: [
            {
                caption1: '',
                caption2: '',
                call_to_action_text: '',
                call_to_action_url: '',
                direction: '',
                open_in_new_window: false,
                caption_option: '',
                delay: '',
                effect: ''
            }
        ]
        ,
    })
    const [activeTab, setActiveTab] = useState<string>('general');

    const tabs: Tab[] = [
        { key: 'general', label: 'General' },
        { key: 'option', label: 'Options' },
    ];

    const addImageSlide = () => {
        setFormData(prev => ({
            ...prev,
            image_slide: [
                ...prev.image_slide,
                {
                    caption1: '',
                    caption2: '',
                    call_to_action_text: '',
                    call_to_action_url: '',
                    direction: '',
                    open_in_new_window: false,
                    caption_option: '',
                    delay: '',
                    effect: ''
                }
            ]
        }));
    };

    const removeImageSlide = (index: number) => {
        setFormData(prev => ({
            ...prev,
            image_slide: prev.image_slide.filter((_, i) => i !== index)
        }));
    };

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSlideChange = (index: number, key: string, value: any) => {
        const updatedSlides: any = [...formData.image_slide];
        updatedSlides[index][key] = value;

        setFormData(prev => ({
            ...prev,
            image_slide: updatedSlides
        }));
    };


    const handleCheckbox = (key: string, val: boolean) => {
        const updated = { ...formData, [key]: val };
        setFormData(updated)
    };
    const handleSubmit = () => {
        console.log('Submit...')
    }

    const breadcrumb = [
        {
            title: 'Management',
        },
        {
            title: 'Appearance'
        },
        {
            title: 'Slider', url: routes.eCommerce.slider
        },
        {
            title: mode == 'create' ? 'Create' : 'Edit'
        },
    ]

    const optionsDirections = [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' }
    ]
    const optionsCaptions = [
        { label: 'Caption 1', value: 'Caption 1' },
        { label: 'Caption 2', value: 'Caption 2' },
        { label: 'Call To Action', value: 'Call To Action' }
    ]
    const optionsEffect = [
        { label: 'Fade In Up', value: 'fadeInUp' },
        { label: 'Fade In Down', value: 'fadeInDown' },
        { label: 'Fade In Left', value: 'fadeInLeft' },
        { label: 'Fade In Right', value: 'fadeInRight' },
        { label: 'Light Speed In', value: 'lightSpeedIn' },
        { label: 'Slide In Up', value: 'slideInUp' },
        { label: 'Slide In Down', value: 'slideInDown' },
        { label: 'Slide In Left', value: 'slideInLeft' },
        { label: 'Slide In Right', value: 'slideInRight' },
        { label: 'Zoom In', value: 'zoomIn' },
        { label: 'Zoom Out', value: 'zoomOut' },
    ]

    return (
        <>
            <div className="mt-6 mx-6 mb-0">
                <h1 className='text-2xl font-bold'>
                    {mode == 'create' ? 'Create Slider' : 'Edit Slider'}
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>
            <Content className="mb-0">
                <div className='bg-[#fff] min-h-[360px] p-6 flex flex-col gap-2'>
                    <div className='flex flex-col md:gap-10 gap-6'>
                        <FormGroup title="Slider Setting" description='Slider Setting' childClassName='grid md:grid-cols-3 gap-3'>
                            <div className='col-span-full grid md:grid-cols-2 gap-3'>
                                <Input
                                    id='name'
                                    label='Name'
                                    type='text'
                                    placeholder='Name'
                                    onChange={handleChange}
                                    value={formData.name}
                                />
                                <Input
                                    id='autoplay_speed'
                                    label='Auto Play Speed'
                                    type='text'
                                    placeholder='Auto Play Speed'
                                    onChange={handleChange}
                                    value={formData.autoplay_speed}
                                />
                            </div>
                            <CheckboxInput
                                label='Fade'
                                text='Fade slides instead of sliding'
                                checked={formData.fade}
                                onChange={(checked) => handleCheckbox('fade', checked)}
                            />
                            <CheckboxInput
                                label='Dots'
                                text='Show slider dots'
                                checked={formData.fade}
                                onChange={(checked) => handleCheckbox('dots', checked)}
                            />
                            <CheckboxInput
                                label='Arrows'
                                text='Show Prev/Next arrows'
                                checked={formData.fade}
                                onChange={(checked) => handleCheckbox('arrows', checked)}
                            />

                        </FormGroup>
                        <FormGroup title="Image Slide Setting" description='Image Slide Setting'>
                            <div className='space-y-4 col-span-full'>
                                {formData.image_slide.map((slide, index) => {
                                    return (
                                        <div key={index} className='col-span-full border p-4 rounded-md' style={{ borderColor: '#E5E7EB' }}>
                                            <div className='col-span-full grid md:grid-cols-[11fr_50px] gap-3 mb-4 items-center'>
                                                {/* <h4 className='text-base font-medium'>Image Slide</h4> */}
                                                <div>
                                                    <Tabs
                                                        className='!mx-1 !mt-1 !px-1 !py-1'
                                                        tabs={tabs}
                                                        activeTab={activeTab}
                                                        setActiveTab={setActiveTab}
                                                        borderClass='w-full'
                                                    />
                                                </div>
                                                <div>
                                                    <ButtonIcon
                                                        icon={CancelGreyIcon}
                                                        shape='circle'
                                                        variant='filled'
                                                        color='default'
                                                        onClick={() => removeImageSlide(index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid md:grid-cols-2 gap-2'>
                                                {
                                                    activeTab == 'general' && (
                                                        <div className='col-span-full grid md:grid-cols-3 gap-3'>
                                                            <Input
                                                                id='caption1'
                                                                label='Caption 1'
                                                                type='text'
                                                                placeholder='Caption 1'
                                                                onChange={(e) => handleSlideChange(index, 'caption1', e.target.value)}
                                                                value={slide.caption1}
                                                                className='mb-1'
                                                            />
                                                            <Input
                                                                id='caption2'
                                                                label='Caption 2'
                                                                type='text'
                                                                placeholder='Caption 2'
                                                                onChange={(e) => handleSlideChange(index, 'caption2', e.target.value)}
                                                                value={slide.caption2}
                                                                className='mb-1'

                                                            />
                                                            <SelectInput
                                                                id='direction'
                                                                label='Direction'
                                                                value={slide.direction}
                                                                onChange={(val) => handleSlideChange(index, 'direction', val)}
                                                                options={optionsDirections}
                                                                className='mb-1'
                                                            />
                                                            <Input
                                                                id='call_to_action_text'
                                                                label='Call To Action Text'
                                                                type='text'
                                                                placeholder='Call To Action Text'
                                                                onChange={(e) => handleSlideChange(index, 'call_to_action_text', e.target.value)}
                                                                value={slide.call_to_action_text}
                                                                className='mb-1'
                                                            />
                                                            <Input
                                                                id='call_to_action_url'
                                                                label='Call To Action Text'
                                                                type='text'
                                                                placeholder='Call To Action URL'
                                                                value={slide.call_to_action_url}
                                                                onChange={(e) => handleSlideChange(index, 'call_to_action_url', e.target.value)}
                                                                className='mb-1'
                                                            />
                                                            <CheckboxInput
                                                                id='open_in_new_window'
                                                                label='Open'
                                                                text='Open in new window'
                                                                checked={slide.open_in_new_window}
                                                                onChange={(checked) => handleSlideChange(index, 'open_in_new_window', checked)}
                                                            />
                                                        </div>
                                                    )
                                                }

                                                {
                                                    activeTab == 'option' && (
                                                        <div className='col-span-full grid md:grid-cols-3 gap-3'>
                                                            <SelectInput
                                                                id='caption_option'
                                                                label='Caption'
                                                                onChange={(val) => handleSlideChange(index, 'caption_option', val)}
                                                                value={slide.caption_option}
                                                                options={optionsCaptions}
                                                                className='mb-1'
                                                            />

                                                            <Input
                                                                id='delay'
                                                                label='Delay'
                                                                type='text'
                                                                placeholder='Delay'
                                                                value={slide.delay}
                                                                onChange={(e) => handleSlideChange(index, 'delay', e.target.value)}
                                                                className='mb-1'

                                                            />
                                                            <SelectInput
                                                                id='effect'
                                                                label='Effect'
                                                                onChange={(val) => handleSlideChange(index, 'effect', val)}
                                                                value={slide.effect}
                                                                options={optionsEffect}
                                                                className='mb-1'
                                                            />
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    )
                                })}

                                <div className="flex justify-end mt-4">
                                    <Button
                                        label='Add Image Slide'
                                        icon={<PlusOutlined />}
                                        onClick={addImageSlide}
                                    />
                                </div>
                            </div>
                        </FormGroup>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode == 'create' ? 'Create Slider' : 'Edit Slider'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>

        </>
    )
}

export default FormSlider
