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
        free_shipping_status: false,
        label_free_shipping: '',
        minimum_ammount: '',
        local_pickup_status: false,
        label_local_pickup: '',
        cost_local_pickup: '',
        flat_rate_status: false,
        label_flat_rate: '',
        cost_flat_rate: ''
    })

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
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
            title: 'Settings',
        },
        {
            title: 'Shipping Methods',
        },
    ]

    return (
        <>
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Shipping Methods
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>
            <Content className="mt-6 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div>
                        <FormGroup title="Free Shipping" description='Free Shipping'>
                            <Input
                                id='label_free_shipping'
                                label='Label'
                                type='text'
                                placeholder='Label'
                                onChange={handleChange}
                                value={formData.label_free_shipping}
                            />
                            <Input
                                id='minimum_ammount'
                                label='Minimum Ammount'
                                type='text'
                                placeholder='Minimum Ammount'
                                onChange={handleChange}
                                value={formData.minimum_ammount}
                            />
                            <CheckboxInput
                                label='Status'
                                text='Status'
                                onChange={(e: any) => setFormData({
                                    ...formData,
                                    free_shipping_status: e
                                })}
                                checked={formData.free_shipping_status}
                            />
                        </FormGroup>
                        <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', margin: '1rem 0' }} />
                        <FormGroup title="Local Pickup" description='Local Pickup'>
                            <Input
                                id='label_local_pickup'
                                label='Label'
                                type='text'
                                placeholder='Label'
                                onChange={handleChange}
                                value={formData.label_local_pickup}
                            />
                            <Input
                                id='cost_local_pickup'
                                label='Cost'
                                type='text'
                                placeholder='Cost'
                                onChange={handleChange}
                                value={formData.cost_local_pickup}
                            />
                            <CheckboxInput
                                label='Status'
                                text='Status'
                                onChange={(e: any) => setFormData({
                                    ...formData,
                                    local_pickup_status: e
                                })}
                                checked={formData.local_pickup_status}
                            />
                        </FormGroup>
                        <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', margin: '1rem 0' }} />
                        <FormGroup title="Flat Rate" description='Flat Rate'>
                            <Input
                                id='label_flat_rate'
                                label='Label'
                                type='text'
                                placeholder='Label'
                                onChange={handleChange}
                                value={formData.label_flat_rate}
                            />
                            <Input
                                id='cost_flat_rate'
                                label='Cost'
                                type='text'
                                placeholder='Cost'
                                onChange={handleChange}
                                value={formData.cost_flat_rate}
                            />
                            <CheckboxInput
                                label='Status'
                                text='Status'
                                onChange={(e: any) => setFormData({
                                    ...formData,
                                    flat_rate_status: e
                                })}
                                checked={formData.flat_rate_status}
                            />
                        </FormGroup>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            label='Create Shipping Methods'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>

        </>
    )
}

export default index
