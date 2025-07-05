import React, { useState } from 'react';
import FormGroup from '@/components/form';
import { Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Input from "@/components/input"
import { ChildFormProps } from '@/plugins/types/form-type';

type ListItem = {
    supplierName: string;
    bestPrice: string;
};

const SupplierInformation = ({ onChange, dataById }: ChildFormProps) => {
    const [items, setItems] = useState<ListItem[]>([]);

    const handleChange = (updatedItems: ListItem[]) => {
        setItems(updatedItems);
        onChange?.(updatedItems)
    };

    const updateItem = (index: number, key: keyof ListItem, value: string) => {
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
        const updated = [{ supplierName: '', bestPrice: '' }, ...items]; // ← tambahkan ke awal
        handleChange(updated);
    };

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        handleChange(updated);
    };

    return (
        <div>
            <FormGroup title="Supplier" description="Supplier information">
                <div className="space-y-4 col-span-full">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 mb-3 w-full">
                            <div className="w-full">
                                <Input
                                    id='supplierName'
                                    label='Supplier Name'
                                    type='text'
                                    value={item.supplierName}
                                    onChange={(e) => updateItem(index, 'supplierName', e.target.value)}
                                    style={{ width: '100%', borderColor: '#E5E7EB' }}
                                />
                            </div>

                            <div className="w-full">
                                <Input
                                    id='bestPrice'
                                    label='Best Price'
                                    type='text'
                                    value={item.bestPrice}
                                    onChange={(e) => updateItem(index, 'bestPrice', e.target.value)}
                                    style={{ width: '100%', borderColor: '#E5E7EB' }}
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
                            Add Supplier
                        </Button>
                    </div>

                </div>

            </FormGroup>

            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />
        </div>
    );
};

export default SupplierInformation;
