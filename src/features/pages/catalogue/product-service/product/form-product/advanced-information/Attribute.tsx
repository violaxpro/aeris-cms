import React, { useState } from 'react';
import FormGroup from '@/components/form-group';
import Button from '@/components/button'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SelectInput from '@/components/select';
import Input from '@/components/input';
import ButtonIcon from '@/components/button/ButtonIcon';
import { TrashIcon, TrashIconRed } from '@public/icon';
import { Divider } from 'antd';

type ListItem = {
    name: string;
    price: string
    value: string[];
};

const AttributeInformation = ({ className }: { className?: string }) => {
    const [items, setItems] = useState<ListItem[]>([
        { name: '', price: '', value: [] }
    ]);

    const handleChange = (updatedItems: ListItem[]) => {
        setItems(updatedItems);
        console.log('Updated List:', updatedItems);
    };

    const updateItem = (index: number, key: keyof ListItem, value: any) => {
        const updated = [...items];
        updated[index][key] = value;
        handleChange(updated);
    };

    const addItem = () => {
        const updated = [{ name: '', price: '', value: [] }, ...items];
        handleChange(updated);
    };

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        handleChange(updated);
    };

    const options = [
        { value: '1', label: 'Product A' },
        { value: '2', label: 'Product B' },
        { value: '3', label: 'Product C' },
    ];

    return (
        <div>
            <FormGroup title="Attribute" description="Attribute information about the product.">
                <div className="space-y-4 col-span-full">
                    {items.map((item, index) => (
                        <>
                            <div className='flex gap-3 items-center'>
                                <div key={index} className="grid md:grid-cols-2 items-center gap-2 mb-3 w-full">
                                    <div className="w-full">
                                        <SelectInput
                                            id={`attribute-${index}`}
                                            label="Attribute"
                                            placeholder="Select Attribute"
                                            onChange={(selectedOption) =>
                                                updateItem(index, 'name', selectedOption)
                                            }
                                            value={item.name}
                                            options={options}
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <Input
                                            id={`price-${index}`}
                                            label="Price"
                                            type='text'
                                            placeholder="Input Price"
                                            onChange={(e: any) => updateItem(index, 'price', e.target.value)}
                                            value={item.price}
                                        />
                                    </div>
                                    <div className='col-span-full'>
                                        <SelectInput
                                            id={`categories-${index}`}
                                            label="Categories"
                                            placeholder="Select Categories(s)"
                                            modeType="multiple"
                                            onChange={(selectedOptions) =>
                                                updateItem(index, 'value', Array.isArray(selectedOptions)
                                                    ? selectedOptions.map((opt: any) => opt)
                                                    : [])
                                            }
                                            value={item.value}
                                            options={options}
                                        />
                                    </div>
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
                        </>
                    ))}
                    <Divider />
                    <div className="flex justify-end mt-4">
                        <Button
                            label='Add Attribute'
                            icon={<PlusOutlined />}
                            onClick={addItem}
                        />
                    </div>
                </div>
            </FormGroup>
        </div>
    );
};

export default AttributeInformation;
