import React, { useState } from 'react';
import FormGroup from '@/components/form';
import { Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Input from "@/components/input"

type ListItem = {
    name: string;
    value: string;
};

const SupplierInformation = ({ className }: { className?: string }) => {
    const [items, setItems] = useState<ListItem[]>([]);

    const handleChange = (updatedItems: ListItem[]) => {
        setItems(updatedItems);
        console.log('Updated List:', updatedItems);
    };

    const updateItem = (index: number, key: keyof ListItem, value: string) => {
        const updated = [...items];
        updated[index][key] = value;
        handleChange(updated);
    };

    const addItem = () => {
        const updated = [{ name: '', value: '' }, ...items]; // ← tambahkan ke awal
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
                                    value={item.name}
                                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                                    style={{ width: '100%', borderColor: '#E5E7EB' }}
                                />
                            </div>

                            <div className="w-full">
                                <Input
                                    id='bestPrice'
                                    label='Best Price'
                                    type='text'
                                    value={item.value}
                                    onChange={(e) => updateItem(index, 'value', e.target.value)}
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
