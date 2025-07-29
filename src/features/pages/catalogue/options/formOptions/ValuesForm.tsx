import React, { useState, useEffect } from 'react'
import FormGroup from '@/components/form-group'
import SelectTypeInput from './ValuesInputType.tsx/SelectTypeInput'
import FieldTypeInput from './ValuesInputType.tsx/FieldTypeInput'
import { Alert } from 'antd'

type formProps = {
    data?: any
    type?: string | null
}

export type itemInputType = {
    price: string[]
    priceType: string[]
    selectProduct: string[]
    value: string[]
    price1: string[]
    price2: string[]
    price3: string[]
    price4: string[]
    price5: string[]
};
const ValuesForm = ({ data, type }: formProps) => {
    const [items, setItems] = useState<itemInputType[]>([])
    console.log(type)

    const handleChange = (updateItem: itemInputType[]) => {
        setItems(updateItem)
    };

    const addItem = () => {
        const updated = [{
            price: [],
            priceType: [],
            selectProduct: [],
            value: [],
            price1: [],
            price2: [],
            price3: [],
            price4: [],
            price5: []
        }, ...items]
        handleChange(updated)
    }

    const updateItem = (index: number, key: keyof itemInputType, value: any) => {
        const updated = [...items];
        (updated[index] as any)[key] = value;
        handleChange(updated);
    };

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        handleChange(updated);
    };

    const options = [
        { value: 'fixed', label: 'Fixed' },
        { value: 'percent', label: 'Percent' },
    ];

    useEffect(() => {
        if (type && items.length === 0) {
            setItems([{
                price: [],
                priceType: [],
                selectProduct: [],
                value: [],
                price1: [],
                price2: [],
                price3: [],
                price4: [],
                price5: []
            }]);
        }
    }, [type]);
    return (
        <div className='flex flex-col gap-2'>
            <FormGroup
                title="Values"
                description='Values information about the attribute.'
            >

                {
                    type == 'Select'
                        ? <>
                            <SelectTypeInput
                                items={items}
                                addItem={addItem}
                                updateItem={updateItem}
                                removeItem={removeItem}
                                optionsProduct={options}
                                data={data}
                            />
                        </>
                        :
                        type == null ?
                            <div>
                                <Alert message="Please select an option type." type="info" showIcon style={{ color: '#307BC3' }} />
                            </div>
                            : <FieldTypeInput
                                items={items}
                                addItem={addItem}
                                updateItem={updateItem}
                                removeItem={removeItem}
                                options={options}
                                data={data}
                            />
                }


            </FormGroup>


        </div>
    )
}

export default ValuesForm
