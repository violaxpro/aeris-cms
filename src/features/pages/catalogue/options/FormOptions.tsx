'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"
import FormGroup from '@/components/form-group'
import SelectInput from '@/components/select'
import Button from '@/components/button'
import ButtonIcon from '@/components/button/ButtonIcon'
import { Alert } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { TrashIconRed } from '@public/icon'
import { routes } from '@/config/routes'
import { Content } from 'antd/es/layout/layout'
import Breadcrumb from '@/components/breadcrumb'
import { FormProps } from '@/plugins/types/form-type'
import { addOptions, updateOptions } from '@/services/options-service'
import { useAtom, useSetAtom } from 'jotai';
import { notificationAtom } from '@/store/NotificationAtom';
import { productSetAtom } from '@/store/DropdownItemStore'

type ItemInputType = {
    price: number
    price_type: string
    selectProduct: string
    value: string
    price1: number
    price2: number
    price3: number
    price4: number
    price5: number
}

const FormOptions = ({ mode = 'create', initialValues, slug }: FormProps) => {
    const router = useRouter()
    const [selectedType, setSelectedType] = useState<string | null>(initialValues?.type || null)
    const setNotification = useSetAtom(notificationAtom)
    const [optionProducts] = useAtom(productSetAtom)

    const [formData, setFormData] = useState({
        name: initialValues ? initialValues.name : '',
        type: initialValues ? initialValues.type : '',
        is_required: initialValues ? initialValues.required : false,
        values: initialValues ? initialValues.values : [{
            price: '',
            price_type: '',
            selectProduct: '',
            value: '',
            price1: '',
            price2: '',
            price3: '',
            price4: '',
            price5: '',
        }] as any[]
    })
    const [formErrors, setFormErrors] = useState({
        name: '',
        type: '',
        is_required: false
    })

    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Options', url: routes.eCommerce.options },
        { title: mode === 'create' ? 'Create' : 'Edit' },
    ];

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleChangeSelect = (id: string, value: string | string[]) => {
        handleChange(id, value)

        let selectedGroupLabel = ''
        for (const group of optionsType) {
            if (group.options.some(option => option.value === value)) {
                selectedGroupLabel = group.label
                break
            }
        }
        setSelectedType(selectedGroupLabel)
    }


    const handleValuesChange = (updated: ItemInputType[]) => {
        setFormData((prev) => ({
            ...prev,
            values: updated
        }))
    }

    const addValue = () => {
        const newItem: ItemInputType = {
            price: 0,
            price_type: '',
            selectProduct: '',
            value: '',
            price1: 0,
            price2: 0,
            price3: 0,
            price4: 0,
            price5: 0
        }
        handleValuesChange([newItem, ...formData.values])
    }

    const updateValue = (index: number, key: keyof ItemInputType, value: any) => {
        const updated = [...formData.values]
        updated[index] = { ...updated[index], [key]: value }
        handleValuesChange(updated)
    }

    const removeValue = (index: number) => {
        const updated = formData.values.filter((_: any, i: number) => i !== index)
        handleValuesChange(updated)
    }

    const optionsType = [
        {
            label: 'Text',
            options: [
                { label: 'Field', value: 'FIELD' },
                { label: 'Textarea', value: 'TEXTAREA' },
            ],
        },
        {
            label: 'Select',
            options: [
                { label: 'Dropdown', value: 'DROPDOWN' },
                { label: 'Checkbox', value: 'CHECKBOX' },
                { label: 'Custom Checkbox', value: 'CUSTOM-CHECKBOX' },
                { label: 'Radio Button', value: 'RADIO-BUTTON' },
                { label: 'Custom Radio Button', value: 'CUSTOM-RADIO-BUTTON' },
                { label: 'Multiple Select', value: 'MULTIPLE-SELECT' },
            ],
        },
        {
            label: 'Date',
            options: [
                { label: 'Date', value: 'DATE' },
                { label: 'Date & Time', value: 'DATE-TIME' },
                { label: 'Time', value: 'TIME' },
            ],
        },
    ]

    const optionsPriceType = [
        { value: 'fixed', label: 'Fixed' },
        { value: 'percent', label: 'Percent' },
    ]

    // submit
    const handleSubmit = async () => {
        try {
            let errors: any = {}
            if (!formData.name) {
                errors.name = 'Name is required'
            }
            if (!formData.type) {
                errors.type = 'Type is required'
            }


            setFormErrors(errors)

            if (Object.keys(errors).length > 0) {
                return;
            }

            const data = {
                name: formData.name,
                type: formData.type,
                required: formData.is_required,
                values: formData.values,
            }

            let response;
            if (mode == 'edit' && slug) {
                response = await updateOptions(slug, data)
            } else {
                response = await addOptions(data)
            }

            if (response.success == true) {
                setNotification(response.message);
                router.push(routes.eCommerce.options)
            }
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        if (initialValues?.type) {
            let selectedGroupLabel = ''
            for (const group of optionsType) {
                if (group.options.some(option => option.value === initialValues.type)) {
                    selectedGroupLabel = group.label
                    break
                }
            }
            setSelectedType(selectedGroupLabel)
        }
    }, [initialValues])


    return (
        <>
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Option' : 'Edit Option'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mb-0">
                <div className='bg-[#fff] min-h-[360px] p-6'>

                    <div className='flex flex-col gap-10'>
                        {/* General Info */}
                        <FormGroup
                            title="General Information"
                            description="General information about the attribute"
                            childClassName="grid md:grid-cols-3 gap-4"
                        >
                            <Input
                                id='name'
                                label='Name'
                                type='text'
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder='Lens Size '
                                errorMessage={formErrors.name}
                            />

                            <SelectInput
                                id="type"
                                label="Type"
                                placeholder="Field"
                                value={formData.type}
                                onChange={(val) => handleChangeSelect("type", val)}
                                options={optionsType}
                                error={formErrors.type}

                            />

                            <Checkbox
                                label='Required'
                                text='This option is required'
                                onChange={(checked) => handleChange("is_required", checked)}
                                checked={formData.is_required}
                            />
                        </FormGroup>

                        {/* Values */}
                        <FormGroup
                            title="Values"
                            description="Values information about the attribute."
                        >
                            {selectedType == null ? (
                                <Alert message="Please select an option type." type="info" showIcon style={{ color: '#307BC3' }} />
                            ) : (
                                <>
                                    {formData.values.map((item: any, index: number) => (
                                        <div key={index} className="flex gap-2 mb-3 w-full">
                                            {selectedType === 'Select' ? (
                                                <div className='grid md:grid-cols-[2fr_repeat(7,1fr)] gap-3'>
                                                    <SelectInput
                                                        id='selectProduct'
                                                        label='Select Product'
                                                        value={item.selectProduct || undefined}
                                                        onChange={(selected) =>
                                                            updateValue(index, 'selectProduct', selected)
                                                        }
                                                        options={optionProducts}
                                                        placeholder="Plug Pack 16VAC 1.5A"
                                                    />
                                                    <Input
                                                        id='value'
                                                        label='Value'
                                                        type='text'
                                                        value={item.value || undefined}
                                                        onChange={(e) => updateValue(index, 'value', e.target.value)}
                                                        placeholder='6MP'
                                                    />
                                                    <Input
                                                        id='price'
                                                        label='Price'
                                                        type='text'
                                                        value={item.price || undefined}
                                                        onChange={(e) => updateValue(index, 'price', e.target.value)}
                                                        placeholder='0'
                                                    />
                                                    {[1, 2, 3, 4, 5].map((n) => (
                                                        <Input
                                                            key={n}
                                                            id={`price${n}`}
                                                            label={`Price ${n}`}
                                                            type='text'
                                                            value={item[`price${n}` as keyof ItemInputType] as string || undefined}
                                                            onChange={(e) => updateValue(index, `price${n}` as keyof ItemInputType, e.target.value)}
                                                            placeholder='0'
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className='grid md:grid-cols-2 gap-3 w-full'>
                                                    <Input
                                                        id='price'
                                                        label='Price'
                                                        type='text'
                                                        value={item.price || undefined}
                                                        onChange={(e) => updateValue(index, 'price', e.target.value)}
                                                        placeholder='0'
                                                    />
                                                    <SelectInput
                                                        id='price_type'
                                                        label='Price Type'
                                                        value={item.price_type || undefined}
                                                        onChange={(selected) =>
                                                            updateValue(index, 'price_type', selected)
                                                        }
                                                        options={optionsPriceType}
                                                        placeholder="Fixed"
                                                    />
                                                </div>
                                            )}
                                            <div className="pt-5">
                                                <ButtonIcon
                                                    color="danger"
                                                    variant="filled"
                                                    size="small"
                                                    icon={TrashIconRed}
                                                    width={15}
                                                    height={15}
                                                    className="!h-10 !w-15"
                                                    onClick={() => removeValue(index)}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    {/* tombol add */}
                                    <div className="flex justify-end mt-4">
                                        <Button
                                            onClick={addValue}
                                            icon={<PlusOutlined />}
                                            label="Add Value"
                                        />
                                    </div>
                                </>
                            )}
                        </FormGroup>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode === 'create' ? 'Create Option' : 'Edit Option'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormOptions;
