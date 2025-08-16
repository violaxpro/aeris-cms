'use client'
import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb"
import Input from '@/components/input'
import Button from '@/components/button'
import CheckboxInput from '@/components/checkbox'
import FormGroup from '@/components/form-group'
import { Content } from 'antd/es/layout/layout'
import CustomSwitch from '@/components/switch/CustomSwitch';
import { PowerIcon, LampIcon } from '@public/icon'
import Divider from '@/components/divider'

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
            <div className="mt-6 mx-6 mb-0">
                <h1 className='text-2xl font-bold'>
                    Shipping Methods
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
                                <h4 className="text-2xl font-semibold">Free Shipping</h4>
                                <p className="mt-2">Free Shipping</p>
                            </div>
                            <CustomSwitch
                                labelOn="On  Mode"
                                labelOff="Off Mode"
                                iconOn={LampIcon}
                                iconOff={PowerIcon}
                                onToggle={(state) => setFormData((prev: any) => ({
                                    ...prev,
                                    free_shipping_status: state
                                }))}
                                size='md'
                            />
                        </div>
                        <Divider />
                        <div className={`col-span-12 md:col-span-8 grid grid-cols-2 gap-4`}>
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
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between mt-4 items-center'>
                            <div>
                                <h4 className="text-2xl font-semibold">Local Pickup</h4>
                                <p className="mt-2">Local Pickup</p>
                            </div>
                            <CustomSwitch
                                labelOn="On  Mode"
                                labelOff="Off Mode"
                                iconOn={LampIcon}
                                iconOff={PowerIcon}
                                onToggle={(state) => setFormData((prev: any) => ({
                                    ...prev,
                                    local_pickup_status: state
                                }))}
                                size='md'
                            />
                        </div>
                        <Divider />
                        <div className={`col-span-12 md:col-span-8 grid grid-cols-2 gap-4`}>
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
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between mt-4 items-center'>
                            <div>
                                <h4 className="text-2xl font-semibold">Flat Rate</h4>
                                <p className="mt-2">Flat Rate</p>
                            </div>
                            <CustomSwitch
                                labelOn="On  Mode"
                                labelOff="Off Mode"
                                iconOn={LampIcon}
                                iconOff={PowerIcon}
                                onToggle={(state) => setFormData((prev: any) => ({
                                    ...prev,
                                    flat_rate_status: state
                                }))}
                                size='md'
                            />
                        </div>
                        <Divider />
                        <div className={`col-span-12 md:col-span-8 grid grid-cols-2 gap-4`}>
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
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            label='Save Shipping Methods'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>

        </>
    )
}

export default index
