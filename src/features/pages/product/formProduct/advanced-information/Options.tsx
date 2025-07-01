import React, { useState } from 'react';
import FormGroup from '@/components/form';
import { Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SelectInput from '@/components/select';
import Input from "@/components/input"
import CheckboxInput from '@/components/checkbox';

type ListItem = {
    name: string;
    type: string[];
    optRequired: boolean;
    globalOption: string[];
};

const OptionsInformation = ({ className }: { className?: string }) => {
    const [items, setItems] = useState<ListItem[]>([]);

    const handleChange = (updatedItems: ListItem[]) => {
        setItems(updatedItems);
        console.log('Updated List:', updatedItems);
    };

    const updateItem = (index: number, key: keyof ListItem, value: any) => {
        const updated = [...items];
        (updated[index] as any)[key] = value;
        handleChange(updated);
    };

    const addItem = () => {
        const updated = [{ name: '', type: [], optRequired: false, globalOption: [], }, ...items];
        handleChange(updated);
    };

    const addGlobalOption = (index: number) => {
        const updated = [...items];
        const current = updated[index].globalOption || [];
        updated[index].globalOption = [...current, '']; // tambahkan satu opsi kosong
        setItems(updated);
    };

    const removeGlobalOption = (index: number, gIdx: number) => {
        const updated = [...items];
        updated[index].globalOption.splice(gIdx, 1);
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
            <FormGroup title="Options" description="Options information about the product">
                <div className="space-y-4 col-span-full">
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-col gap-3 mb-6 w-full border-b pb-4">
                            {/* Baris 1: Name dan Option Type */}
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    id='name'
                                    label='Name'
                                    type='text'
                                    value={item.name}
                                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                                />
                                <SelectInput
                                    id={`optionType-${index}`}
                                    label="Option Type"
                                    placeholder="Select Option Type"
                                    modeType="multiple"
                                    onChange={(selectedOptions) =>
                                        updateItem(index, 'type', Array.isArray(selectedOptions)
                                            ? selectedOptions.map((opt: any) => opt.label)
                                            : []
                                        )
                                    }
                                    value={item.type}
                                    options={options}
                                />
                            </div>

                            {/* Baris 2: Required, Add Global Option, Delete */}
                            <div className="flex items-center gap-4">
                                <CheckboxInput
                                    text="Required"
                                    checked={item.optRequired}
                                    onChange={(checked: boolean) => updateItem(index, 'optRequired', checked)}
                                />
                                <Button
                                    type="dashed"
                                    onClick={() => addGlobalOption(index)}
                                    icon={<PlusOutlined />}
                                >
                                    Add Global Options
                                </Button>
                                <MinusCircleOutlined
                                    onClick={() => removeItem(index)}
                                    style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}
                                />
                            </div>

                            {/* Baris 3 dst: Global Option dropdown */}
                            <div className="flex flex-col w-full">
                                {item.globalOption?.map((optValue, gIdx) => (
                                    <div>
                                        <div key={gIdx} className="flex gap-2">
                                            <SelectInput
                                                id={`globalOption-${index}-${gIdx}`}
                                                label={`Product Name ${gIdx + 1}`}
                                                placeholder="Select Product Name"
                                                onChange={(selectedOptions) =>
                                                    updateItem(index, 'globalOption', Array.isArray(selectedOptions)
                                                        ? selectedOptions.map((opt: any) => opt.label)
                                                        : []
                                                    )
                                                }
                                                value={optValue}
                                                options={options}
                                                className='w-full'
                                            />
                                            <div className='pt-6'>
                                                <MinusCircleOutlined
                                                    onClick={() => removeGlobalOption(index, gIdx)}
                                                    style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}
                                                />
                                            </div>

                                        </div>

                                    </div>

                                ))}
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
                            Add Options
                        </Button>
                    </div>
                </div>
            </FormGroup >

            <hr
                style={{
                    borderColor: '#E5E7EB',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                }}
            />
        </div >
    );
};

export default OptionsInformation;
