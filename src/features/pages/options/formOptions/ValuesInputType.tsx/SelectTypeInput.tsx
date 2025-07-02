import React from 'react'
import Input from "@/components/input"
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import SelectInput from '@/components/select'
import { itemInputType } from '../ValuesForm'

type selectTypeInput = {
    items: itemInputType[];
    updateItem: (index: number, key: keyof itemInputType, value: any) => void
    data?: any
    removeItem: (index: number) => void
    addItem: () => void
    optionsProduct?: any
}

const SelectTypeInput = ({
    items,
    updateItem,
    data,
    removeItem,
    addItem,
    optionsProduct
}: selectTypeInput) => {
    return (
        <div className="space-y-4 col-span-full">
            {
                items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 mb-3 w-full overflow-auto`">
                        <SelectInput
                            id='selectProduct'
                            label='Select Product'
                            onChange={(selectedOptions) =>
                                updateItem(index, 'selectProduct', Array.isArray(selectedOptions)
                                    ? selectedOptions.map((opt: any) => opt.label)
                                    : [])
                            }
                            value={item.selectProduct}
                            options={optionsProduct}
                            placeholder='Select Select Product'
                        />
                        <Input
                            id='value'
                            label='Value'
                            type='text'
                            value={data ? data.text : item.value}
                            onChange={(e) => updateItem(index, 'value', e.target.value)}
                        />
                        <Input
                            id='price'
                            label='Price'
                            type='text'
                            value={data ? data.text : item.price}
                            onChange={(e) => updateItem(index, 'price', e.target.value)}
                        />

                        <Input
                            id='price1'
                            label='Price 1'
                            type='text'
                            value={data ? data.text : item.price1}
                            onChange={(e) => updateItem(index, 'price1', e.target.value)}
                        />
                        <Input
                            id='price2'
                            label='Price 2'
                            type='text'
                            value={data ? data.text : item.price2}
                            onChange={(e) => updateItem(index, 'price2', e.target.value)}
                        />
                        <Input
                            id='price3'
                            label='Price 3'
                            type='text'
                            value={data ? data.text : item.price3}
                            onChange={(e) => updateItem(index, 'price3', e.target.value)}
                        />
                        <Input
                            id='price4'
                            label='Price 4'
                            type='text'
                            value={data ? data.text : item.price4}
                            onChange={(e) => updateItem(index, 'price4', e.target.value)}
                        />
                        <Input
                            id='price5'
                            label='Price 5'
                            type='text'
                            value={data ? data.text : item.price5}
                            onChange={(e) => updateItem(index, 'price5', e.target.value)}
                        />
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

export default SelectTypeInput
