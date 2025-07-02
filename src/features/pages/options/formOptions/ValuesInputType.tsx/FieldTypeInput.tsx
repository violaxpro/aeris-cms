import React from 'react'
import Input from "@/components/input"
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import SelectInput from '@/components/select'
import { itemInputType } from '../ValuesForm'

type fieldTypeInput = {
    items: itemInputType[];
    updateItem: (index: number, key: keyof itemInputType, value: any) => void
    data?: any
    removeItem: (index: number) => void
    addItem: () => void
    options?: any
}

const FieldTypeInput = ({
    items,
    updateItem,
    data,
    removeItem,
    addItem,
    options
}: fieldTypeInput) => {
    return (
        <div className="space-y-4 col-span-full">
            {
                items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 mb-3 w-full">
                        <div className="w-full">
                            <Input
                                id='price'
                                label='Price'
                                type='text'
                                value={data ? data.text : item.price}
                                onChange={(e) => updateItem(index, 'price', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <SelectInput
                                id='priceType'
                                label='Price Type'
                                onChange={(selectedOptions) =>
                                    updateItem(index, 'priceType', Array.isArray(selectedOptions)
                                        ? selectedOptions.map((opt: any) => opt.label)
                                        : [])
                                }
                                value={item.priceType}
                                options={options}
                                placeholder='Select Price Type'
                            />
                        </div>
                        <div className='pt-4'>
                            <MinusCircleOutlined
                                onClick={() => removeItem(index)}
                                style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                ))
            }
            <div className="flex justify-end">
                <Button
                    type="dashed"
                    onClick={addItem}
                    icon={<PlusOutlined />}
                    style={{ marginTop: 12 }}
                >
                    Add New Row
                </Button>
            </div>
        </div>
    )
}

export default FieldTypeInput
