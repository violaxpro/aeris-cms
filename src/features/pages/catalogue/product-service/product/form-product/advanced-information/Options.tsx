import React, { useState } from 'react';
import FormGroup from '@/components/form-group';
import Button from '@/components/button'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SelectInput from '@/components/select';
import Input from "@/components/input"
import CheckboxInput from '@/components/checkbox';
import ButtonIcon from '@/components/button/ButtonIcon';
import { TrashIcon, TrashIconRed } from '@public/icon';
import { Divider } from 'antd';

type ListItem = {
    name: string;
    type: string;
    optRequired: boolean;
    values: string[];
};

const OptionsInformation = ({ className }: { className?: string }) => {
    const [items, setItems] = useState<ListItem[]>([
        { name: '', type: '', optRequired: false, values: [] }
    ]);

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
        const updated = [{ name: '', type: '', optRequired: false, values: [], }, ...items];
        handleChange(updated);
    };

    const addGlobalOption = (index: number) => {
        const updated = [...items];
        const current = updated[index].values || [];
        updated[index].values = [...current, '']; // tambahkan satu opsi kosong
        setItems(updated);
    };

    const removeGlobalOption = (index: number, gIdx: number) => {
        const updated = [...items];
        updated[index].values.splice(gIdx, 1);
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

    const optionsType = [
        {
            label: 'Text',
            options: [
                { label: 'Field', value: 'field' },
                { label: 'Textarea', value: 'textarea' },
            ],
        },
        {
            label: 'Select',
            options: [
                { label: 'Dropdown', value: 'dropdown' },
                { label: 'Checkbox', value: 'checkbox' },
                { label: 'Custom Checkbox', value: 'custom_checkbox' },
                { label: 'Radio Button', value: 'radio_button' },
                { label: 'Custom Radio Button', value: 'custom_radio_button' },
                { label: 'Multiple Select', value: 'multiple_select' },
            ],
        },
        {
            label: 'Date',
            options: [
                { label: 'Date', value: 'date' },
                { label: 'Date & Time', value: 'date_time' },
                { label: 'Time', value: 'time' },
            ],
        },
    ];

    return (
        <div>
            <FormGroup title="Options" description="Options information about the product">
                <div className="space-y-4 col-span-full">
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-col gap-3 mb-6 w-full pb-4">
                            {/* Baris 1: Name dan Option Type */}
                            <div className="grid grid-cols-[1fr_1fr_120px_50px] gap-4">
                                <SelectInput
                                    id='name'
                                    label='Option Name'
                                    placeholder="Select Option Name"
                                    value={item.name}
                                    onChange={(selectedOptions) =>
                                        updateItem(index, 'name', selectedOptions)
                                    }
                                />
                                <SelectInput
                                    id={`optionType-${index}`}
                                    label="Option Type"
                                    placeholder="Select Option Type"
                                    // onChange={(selectedOptions) =>
                                    //     updateItem(index, 'type', Array.isArray(selectedOptions)
                                    //         ? selectedOptions.map((opt: any) => opt)
                                    //         : []
                                    //     )
                                    // }
                                    onChange={(selectedOptions) =>
                                        updateItem(index, 'type', selectedOptions)
                                    }
                                    value={item.type}
                                    options={optionsType}
                                />
                                <div className='flex items-center justify-center pt-5'>
                                    <Button
                                        label=' Add Values'
                                        icon={<PlusOutlined />}
                                        onClick={() => addGlobalOption(index)}
                                        style={{ padding: '1.2rem 1rem' }}
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

                            {/* Baris 2: Required, Add Global Option, Delete */}
                            <div className="flex items-center gap-4">
                                <CheckboxInput
                                    text="Required"
                                    checked={item.optRequired}
                                    onChange={(checked: boolean) => updateItem(index, 'optRequired', checked)}
                                />
                            </div>
                            {/* Baris 3 dst: Global Option dropdown */}
                            < div className="flex flex-col w-full" >
                                {
                                    item.values?.map((optValue, gIdx) => (
                                        <div key={gIdx}>
                                            <div className="flex gap-2">
                                                {/* <SelectInput
                                                    id='globalOption'
                                                    label={`Product Name ${gIdx + 1}`}
                                                    placeholder="Select Product Name"
                                                    onChange={(selectedOption) => {
                                                        const updated = [...items];
                                                        (updated[index] as any).globalOption[gIdx] = selectedOption;
                                                        handleChange(updated);
                                                    }}
                                                    value={optValue}
                                                    options={options}
                                                    className='w-full'
                                                /> */}

                                                <Input
                                                    id='values'
                                                    label='Values'
                                                    type='text'
                                                    value={optValue}
                                                    onChange={(e: any) => {
                                                        const updated = [...items];
                                                        updated[index].values[gIdx] = e.target.value;
                                                        handleChange(updated);
                                                    }}
                                                    divClassName='w-full'
                                                />
                                                <div className="pt-5">
                                                    <ButtonIcon
                                                        color='danger'
                                                        variant='filled'
                                                        size="small"
                                                        icon={TrashIconRed}
                                                        width={15}
                                                        height={15}
                                                        className='!h-10 !w-15'
                                                        onClick={() => removeGlobalOption(index, gIdx)}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                    ))
                                }
                            </div>
                        </div>
                    ))
                    }

                    <Divider />
                    <div className="flex justify-end mt-4">
                        <Button
                            label=' Add  Options'
                            icon={<PlusOutlined />}
                            onClick={addItem}
                        />

                    </div>
                </div >
            </FormGroup >
        </div >
    );
};

export default OptionsInformation;
