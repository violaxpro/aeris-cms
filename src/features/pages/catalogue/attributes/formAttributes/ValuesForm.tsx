import React, { useState, useEffect } from 'react'
import Input from "@/components/input"
import FormGroup from '@/components/form-group'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Button, Divider } from 'antd'
import { ChildFormProps } from '@/plugins/types/form-type'
import ButtonIcon from '@/components/button/ButtonIcon';
import { TrashIcon, TrashIconRed } from '@public/icon';

type formProps = {
    data?: any
}

type itemInputType = {
    value: string[]
};
const ValuesForm = ({ dataById, onChange }: ChildFormProps) => {
    const [items, setItems] = useState<itemInputType[]>([
        { value: [] }
    ])

    const handleChange = (updateItem: itemInputType[]) => {
        setItems(updateItem)
        onChange(updateItem)
    };

    const addItem = () => {
        const updated = [{ value: [] }, ...items]
        handleChange(updated)
    }

    const updateItem = (index: number, key: keyof itemInputType, value: any) => {
        // const updated = [...items];
        // (updated[index] as any)[key] = value;
        setItems(prev => {
            const updated = [...prev];
            if (typeof updated[index] === 'string') {
                (updated[index] as any) = value; // untuk string langsung ganti
            } else {
                (updated[index] as any)[key] = value;
            }
            handleChange(updated);
            return updated;
        });
    };

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        handleChange(updated);
    };

    useEffect(() => {
        if (dataById.length > 0 && items.length === 0) {
            const parseData = JSON.parse(dataById)
            setItems(parseData);
        }
    }, [dataById]);

    return (
        <div className='flex flex-col gap-2'>
            <FormGroup
                title="Values"
                description='Values information about the attribute.'
            >
                <div className="space-y-4 col-span-full">
                    {
                        items.map((item, index) => {
                            return <div key={index} className="flex  items-center gap-2 mb-3 w-full">
                                <div className="w-full">
                                    <Input
                                        id='name'
                                        label='Value'
                                        type='text'
                                        value={item.value || item}
                                        onChange={(e) => updateItem(index, 'value', e.target.value)}
                                    />
                                </div>
                                <div className="pt-5">
                                    {
                                        items.length <= 1 ? <ButtonIcon
                                            icon={TrashIcon}
                                            width={20}
                                            height={20}
                                            className='btn-trash-item !h-10 !w-15'
                                        /> : <ButtonIcon
                                            color='danger'
                                            variant='filled'
                                            size="small"
                                            icon={TrashIconRed}
                                            width={15}
                                            height={15}
                                            className='!h-10 !w-15'
                                            onClick={() => removeItem(index)}
                                        />
                                    }
                                </div>
                            </div>
                        })
                    }
                    <Divider />
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
        </div>
    )
}

export default ValuesForm
