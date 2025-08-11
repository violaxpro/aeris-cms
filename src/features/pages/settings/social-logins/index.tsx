'use client'
import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb"
import Input from '@/components/input'
import Button from '@/components/button'
import CheckboxInput from '@/components/checkbox'
import FormGroup from '@/components/form-group'
import { Content } from 'antd/es/layout/layout'
import { Divider } from 'antd'
import CustomSwitch from '@/components/switch/CustomSwitch';
import { PowerIcon, LampIcon } from '@public/icon'

const index = () => {
    const [formData, setFormData] = useState({
        facebook_status: false,
        app_id: '',
        app_secret: '',
        google_status: false,
        client_id: '',
        client_secret: '',
        facebook_mode: false,
        google_mode: false
    })

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = () => {
        console.log('Submit...')
    }

    const breadcrumb = [
        {
            title: 'Settings',
        },
        {
            title: 'Social Logins',
        },
    ]

    return (
        <>
            <div className="mt-6 mx-6 mb-0">
                <h1 className='text-2xl font-bold'>
                    Social Logins
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }} className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between mt-4 items-center'>
                            <div>
                                <h4 className="text-2xl font-semibold">Facebook</h4>
                                <p className="mt-2">Facebook Settings</p>
                            </div>
                            <CustomSwitch
                                labelOn="On  Mode"
                                labelOff="Off Mode"
                                iconOn={LampIcon}
                                iconOff={PowerIcon}
                                onToggle={(state) => setFormData((prev: any) => ({
                                    ...prev,
                                    facebook_mode: state
                                }))}
                                size='md'
                            />
                        </div>
                        <hr className='border-[#E5E7EB]' />
                        <div className={`col-span-12 md:col-span-8 grid grid-cols-2 gap-4`}>
                            <Input
                                id='app_id'
                                label='App ID'
                                type='text'
                                placeholder='App ID'
                                onChange={handleChange}
                                value={formData.app_id}
                            />
                            <Input
                                id='app_secret'
                                label='App Secret'
                                type='text'
                                placeholder='App Secret'
                                onChange={handleChange}
                                value={formData.app_secret}
                            />
                            <CheckboxInput
                                label='Status'
                                text='Status'
                                onChange={(e: any) => setFormData({
                                    ...formData,
                                    facebook_status: e
                                })}
                                checked={formData.facebook_status}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between mt-4 items-center'>
                            <div>
                                <h4 className="text-2xl font-semibold">Google</h4>
                                <p className="mt-2">Google Login</p>
                            </div>
                            <CustomSwitch
                                labelOn="On  Mode"
                                labelOff="Off Mode"
                                iconOn={LampIcon}
                                iconOff={PowerIcon}
                                onToggle={(state) => setFormData((prev: any) => ({
                                    ...prev,
                                    google_mode: state
                                }))}
                                size='md'
                            />
                        </div>
                        <hr className='border-[#E5E7EB]' />
                        <div className={`col-span-12 md:col-span-8 grid grid-cols-2 gap-4`}>
                            <Input
                                id='client_id'
                                label='Client ID'
                                type='text'
                                placeholder='Client ID'
                                onChange={handleChange}
                                value={formData.client_id}
                            />
                            <Input
                                id='client_secret'
                                label='Client Secret'
                                type='text'
                                placeholder='Client Secret'
                                onChange={handleChange}
                                value={formData.client_secret}
                            />
                            <CheckboxInput
                                label='Status'
                                text='Status'
                                onChange={(e: any) => setFormData({
                                    ...formData,
                                    google_status: e
                                })}
                                checked={formData.google_status}
                            />
                        </div>

                    </div>
                    <div className="mt-6 flex justify-end">
                        <Button
                            label='Save Social Logins'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>

        </>
    )
}

export default index
