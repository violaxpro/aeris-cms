import React, { useState } from 'react';
import FormGroup from '@/components/form-group';
import Button from '@/components/button'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SelectInput from '@/components/select';
import { ChildFormProps } from '@/plugins/types/form-type';
import { useAtom } from 'jotai';
import { productSetAtom } from '@/store/DropdownItemStore';
import ButtonIcon from '@/components/button/ButtonIcon';
import { TrashIcon, TrashIconRed } from '@public/icon';
import { Divider } from 'antd';

type ListItem = {
    productName: string[];
    value: string;
};

const KitPriceInformation = ({ dataById, onChange }: ChildFormProps) => {
    const [optionsProduct] = useAtom(productSetAtom)
    const [items, setItems] = useState<ListItem[]>([
        { productName: [], value: '' }
    ]);

    const handleChange = (updatedItems: ListItem[]) => {
        setItems(updatedItems);
        onChange?.(updatedItems)
    };

    const updateItem = (index: number, key: keyof ListItem, value: any) => {
        // const updated = [...items];
        // updated[index][key] = value;
        // handleChange(updated);
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

    const addItem = () => {
        const updated = [{ productName: [], value: '' }, ...items];
        handleChange(updated);
    };

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        handleChange(updated);
    };

    return (
        <div>
            <FormGroup title="Kit Price" description="Kit Price information">
                <div className="space-y-4 col-span-full">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 mb-3 w-full">
                            <div className="w-full">
                                <SelectInput
                                    id={`productName-${index}`}
                                    label="Product Name"
                                    placeholder="Select Product(s)"
                                    onChange={(selectedOptions) =>
                                        updateItem(index, 'productName', selectedOptions)
                                    }
                                    value={item.productName}
                                    options={optionsProduct}
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
                    ))}
                    <Divider />

                    <div className="flex justify-end">
                        <Button
                            label='Add Kit Price Product'
                            icon={<PlusOutlined />}
                            onClick={addItem}
                        />
                    </div>
                </div>
            </FormGroup>

        </div>
    );
};

export default KitPriceInformation;
