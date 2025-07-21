'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form';
import Input from "@/components/input"
import Textarea from '@/components/textarea'
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import { useNotificationAntd } from '@/components/toast';

const FormSerialNumber: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();

    const [formData, setFormData] = useState({
        po_number: initialValues ? initialValues.po_number : '',
        supplier: initialValues ? initialValues.supplier : '',
        sku: initialValues ? initialValues.sku : '',
        serialNumber: initialValues ? initialValues.serial_number : '',
        mac_address: initialValues ? initialValues.mac_address : '',
        notes: initialValues ? initialValues.notes : '',
        receiver: initialValues ? initialValues.receiver : '',
        status: initialValues ? initialValues.status : '',
    });

    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Purchases', url: routes.eCommerce.purchases },
        { title: 'Create Serial Number' },
    ];

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

    const handleSubmit = async () => {
        try {
            const submitData = {
                po_number: formData.po_number,
                supplier: formData.supplier,
                sku: formData.sku,
                serial_number: Number(formData.serialNumber),
                mac_address: formData.mac_address,
                notes: Number(formData.notes),
                receiver: Number(formData.receiver),
                status: Number(formData.status)
            }

            let response;
            // response = await updatePriceLevel(slug, submitData)

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

    const options = [
        { label: 'WAITING', value: 'WAITING' },
        { label: 'RECEIVE', value: 'RECEIVE' }
    ]

    console.log(formData)

    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">Create Serial Number</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    {/* Tab Content */}
                    <div>
                        <FormGroup
                            title="Serial Number"
                            description="Serial Number information"
                        >
                            <Input
                                id='po_number'
                                label='PO Number'
                                type='text'
                                placeholder='Input PO Number'
                                onChange={handleChange}
                                value={formData.po_number}
                            />
                            <Input
                                id='supplier'
                                label='Supplier'
                                type='text'
                                placeholder='Input Supplier'
                                onChange={handleChange}
                                value={formData.supplier}
                            />
                            <Input
                                id='sku'
                                label='Product Sku'
                                type='text'
                                placeholder='Input Product Sku'
                                onChange={handleChange}
                                value={formData.sku}
                            />
                            <Input
                                id='serialNumber'
                                label='Serial Number'
                                type='text'
                                placeholder='Input Serial Number'
                                onChange={handleChange}
                                value={formData.serialNumber}
                            />
                            <Input
                                id='mac_address'
                                label='Mac Address'
                                type='text'
                                placeholder='Input Mac Address'
                                onChange={handleChange}
                                value={formData.mac_address}
                            />
                            <div>
                                <Textarea
                                    id='notes'
                                    label='Notes'
                                    value={formData.notes}
                                    onChange={handleChange}
                                />
                            </div>
                            <Input
                                id='receiver'
                                label='Receiver'
                                type='text'
                                placeholder='Input Receiver'
                                onChange={handleChange}
                                value={formData.receiver}
                            />
                            <SelectInput
                                id='status'
                                label="Status"
                                placeholder="Select Status"
                                value={formData.status}
                                onChange={(e) => handleChangeSelect('status', e)}
                                options={options}
                            />
                        </FormGroup>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label='Create Serial Number'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormSerialNumber;
