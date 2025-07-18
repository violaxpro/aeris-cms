'use client'
import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb"
import Input from '@/components/input'
import Button from '@/components/button'
import CheckboxInput from '@/components/checkbox'
import FormGroup from '@/components/form'
import { Content } from 'antd/es/layout/layout'

const index = () => {
    const [formData, setFormData] = useState({
        facebook_status: false,
        app_id: '',
        app_secret: '',
        google_status: false,
        client_id: '',
        client_secret: ''
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
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Social Logins
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>
            <Content className="mt-6 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div>
                        <FormGroup title="Facebook" description='Facebook Logins'>
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
                        </FormGroup>
                        <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', margin: '1rem 0' }} />
                        <FormGroup title="Google" description='Google Logins'>
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
                        </FormGroup>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            label='Create Social Logins'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>

        </>
    )
}

export default index
