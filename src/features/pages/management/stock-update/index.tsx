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
        leader_system: '',
        alloys: '',
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
            title: 'Management',
        },
        {
            title: 'Stock Update',
        },
    ]

    return (
        <>
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Stock Update
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>
            <Content className="mt-6 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div>
                        <FormGroup title="Stock Update" description='Stock Update'>
                            <div className='col-span-full'>
                                <Input
                                    id='leader_system'
                                    label='Leader System'
                                    type='text'
                                    placeholder='Leader System'
                                    onChange={handleChange}
                                    value={formData.leader_system}
                                />
                            </div>
                            <div className='col-span-full'>
                                <Input
                                    id='alloys'
                                    label='Alloys'
                                    type='text'
                                    placeholder='Alloys'
                                    onChange={handleChange}
                                    value={formData.alloys}
                                />
                            </div>
                        </FormGroup>
                        <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', margin: '1rem 0' }} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            label='Save & Run'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>

        </>
    )
}

export default index
