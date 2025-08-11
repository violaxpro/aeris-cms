import React, { useState, useEffect } from 'react';
import FormGroup from '@/components/form-group';
import Button from '@/components/button'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Input from "@/components/input"
import SelectInput from '@/components/select';
import { ChildFormProps } from '@/plugins/types/form-type';
import ButtonIcon from '@/components/button/ButtonIcon';
import { TrashIcon, TrashIconRed } from '@public/icon';
import { getSupplier } from '@/services/supplier-list-service';
import { Divider } from 'antd';

type ListItem = {
    supplierName: string;
    buyPrice: string;
};

const SupplierInformation = ({ onChange, dataById }: ChildFormProps) => {
    const [items, setItems] = useState<ListItem[]>([
        { supplierName: '', buyPrice: '' }
    ]);
    const [optionSupplier, setOptionSupplier] = useState([])

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
        const updated = [{ supplierName: '', buyPrice: '' }, ...items]; // ← tambahkan ke awal
        handleChange(updated);
    };

    const removeItem = (index: number) => {
        //  if (items.length <= 1) return; 
        const updated = items.filter((_, i) => i !== index);
        handleChange(updated);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getSupplier()

                const suppliers = res.data.map((sup: any) => ({
                    label: sup.name,
                    value: sup.id
                }))
                setOptionSupplier(suppliers)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()

    }, [])

    return (
        <div>
            <FormGroup title="Supplier" description="Supplier information">
                <div className="space-y-4 col-span-full">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 mb-3 w-full">
                            <div className="w-full">
                                <SelectInput
                                    id='supplierName'
                                    label='Supplier Name'
                                    placeholder="Select Supplier"
                                    onChange={(selectedOption) =>
                                        updateItem(index, 'supplierName', selectedOption)
                                    }
                                    value={item.supplierName}
                                    options={optionSupplier}
                                />
                            </div>

                            <div className="w-full">
                                <Input
                                    id='buyPrice'
                                    label='Buy Price'
                                    type='text'
                                    value={item.buyPrice}
                                    onChange={(e) => updateItem(index, 'buyPrice', e.target.value)}
                                    style={{ width: '100%', borderColor: '#E5E7EB' }}
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
                    <div className="flex justify-end mt-4">
                        <Button
                            label='Add Supplier'
                            icon={<PlusOutlined />}
                            onClick={addItem}
                        />
                    </div>

                </div>

            </FormGroup>

        </div>
    );
};

export default SupplierInformation;
