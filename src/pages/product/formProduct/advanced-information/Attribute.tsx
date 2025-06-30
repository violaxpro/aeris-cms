import React, { useState } from 'react';
import FormGroup from '@/components/form';
import { Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SelectInput from '@/components/select';

type ListItem = {
    name: string[];
    value: string[];
};

const AttributeInformation = ({ className }: { className?: string }) => {
    const [items, setItems] = useState<ListItem[]>([]);

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
        const updated = [{ name: [], value: [] }, ...items];
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
                        <div key={index} className="flex items-center gap-2 mb-3 w-full">
                            <div className="w-full">
                                <SelectInput
                                    id={`attribute-${index}`}
                                    label="Attribute"
                                    placeholder="Select Attribute"
                                    onChange={(selectedOptions) =>
                                        updateItem(index, 'name', Array.isArray(selectedOptions)
                                            ? selectedOptions.map((opt: any) => opt.label)
                                            : [])
                                    }
                                    options={options}
                                />
                            </div>
                            <div className='w-full'>
                                <SelectInput
                                    id={`categories-${index}`}
                                    label="Categories"
                                    placeholder="Select Categories(s)"
                                    modeType="multiple"
                                    onChange={(selectedOptions) =>
                                        updateItem(index, 'value', Array.isArray(selectedOptions)
                                            ? selectedOptions.map((opt: any) => opt.label)
                                            : [])
                                    }
                                    options={options}
                                />
                            </div>

                            <div className="pt-6">
                                <MinusCircleOutlined
                                    onClick={() => removeItem(index)}
                                    style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <Button
                            type="dashed"
                            onClick={addItem}
                            icon={<PlusOutlined />}
                            style={{ marginTop: 12 }}
                        >
                            Add Attribute
                        </Button>
                    </div>
                </div>
            </FormGroup>

            <hr
                style={{
                    borderColor: '#E5E7EB',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                }}
            />
        </div>
    );
};

export default AttributeInformation;
