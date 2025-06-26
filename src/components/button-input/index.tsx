'use client';

import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

type ListItem = {
    name: string;
    value: string;
};

type FieldType = 'input' | 'select';

type DynamicInputListProps = {
    label?: string;
    minItems?: number;
    btnLabel: string;
    fieldType?: FieldType;
    selectOptions?: { label: string; value: string }[];
    onChange?: (values: ListItem[]) => void;
};

const DynamicInputList: React.FC<DynamicInputListProps> = ({
    label = 'Item',
    minItems = 0,
    btnLabel,
    fieldType = 'input',
    selectOptions = [],
    onChange,
}) => {
    const [items, setItems] = useState<ListItem[]>([]);

    const updateItem = (index: number, key: keyof ListItem, value: string) => {
        const updated = [...items];
        updated[index][key] = value;
        setItems(updated);
        onChange?.(updated);
    };

    const addItem = () => {
        const updated = [...items, { name: '', value: '' }];
        setItems(updated);
        onChange?.(updated);
    };

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
        onChange?.(updated);
    };

    return (
        <div className="space-y-4 col-span-full">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2 w-full">
                    {fieldType === 'select' ? (
                        <Select
                            allowClear
                            labelInValue
                            value={item.name ? { label: item.name, value: item.name } : undefined}
                            onChange={(selected) => updateItem(index, 'name', selected?.label ?? '')}
                            style={{ width: '100%' }}
                            placeholder={`${label} ${index + 1}`}
                            className="rounded-md text-sm"
                        >
                            {selectOptions.map((opt) => (
                                <Option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </Option>
                            ))}
                        </Select>
                    ) : (
                        <Input
                            value={item.name}
                            placeholder={`${label} ${index + 1}`}
                            onChange={(e) => updateItem(index, 'name', e.target.value)}
                            style={{ width: '100%', borderColor: '#E5E7EB' }}
                            className="rounded-md text-sm"
                        />
                    )}

                    <Input
                        value={item.value}
                        placeholder={`${label} Value ${index + 1}`}
                        onChange={(e) => updateItem(index, 'value', e.target.value)}
                        style={{ width: '100%', borderColor: '#E5E7EB' }}
                        className="rounded-md text-sm"
                    />

                    {items.length > minItems && (
                        <MinusCircleOutlined
                            onClick={() => removeItem(index)}
                            style={{ color: 'red' }}
                        />
                    )}
                </div>
            ))}

            <div className="flex justify-end">
                <Button type="dashed" onClick={addItem} icon={<PlusOutlined />}>
                    {btnLabel}
                </Button>
            </div>
        </div>
    );
};

export default DynamicInputList;
