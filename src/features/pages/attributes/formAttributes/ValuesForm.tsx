import React, { useState } from 'react'
import Input from "@/components/input"
import FormGroup from '@/components/form'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'

type formProps = {
    data?: any
}

type itemInputType = {
    value: string[]
};
const ValuesForm = ({ data }: formProps) => {
    const [value, setValue] = useState()
    const [items, setItems] = useState<itemInputType[]>([])

    const handleChange = (updateItem: itemInputType[]) => {
        setItems(updateItem)
    };

    const addItem = () => {
        const updated = [{ value: [] }, ...items]
        handleChange(updated)
    }

    const updateItem = (index: number, key: keyof itemInputType, value: any) => {
        const updated = [...items];
        (updated[index] as any)[key] = value;
        handleChange(updated);
    };

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        handleChange(updated);
    };
    return (
        <div className='flex flex-col gap-2'>
            <FormGroup
                title="Values"
                description='Values information about the attribute.'
            >
                <div className="space-y-4 col-span-full">
                    {
                        items.map((item, index) => (
                            <div key={index} className="flex  items-center gap-2 mb-3 w-full">
                                <div className="w-full">
                                    <Input
                                        id='name'
                                        label='Value'
                                        type='text'
                                        value={data ? data.text : item.value}
                                        onChange={(e) => updateItem(index, 'value', e.target.value)}
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
                            Add Values
                        </Button>
                    </div>
                </div>



            </FormGroup>

            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />

        </div>
    )
}

export default ValuesForm
