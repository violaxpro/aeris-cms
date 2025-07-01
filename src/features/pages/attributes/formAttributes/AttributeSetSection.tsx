import React, { useState } from 'react'
import SelectInput from '@/components/select'
import Button from "@/components/button"

const AttributeSetSection = () => {
    const [selectAttributeSet, setSelectedAttribute] = useState<any>(null)
    const optionAttributeSet = [
        { label: 'Attribtes Set A', value: 'Attribtes Set A' },
        { label: 'Attribtes Set B', value: 'Attribtes Set B' }
    ]
    return (
        <div>
            <div className='flex items-end gap-2'>
                <SelectInput
                    id='attributeSet'
                    label="Attribute Set"
                    placeholder="Attribute Set"
                    value={selectAttributeSet?.value}
                    onChange={(selected) => {
                        setSelectedAttribute({
                            ...selectAttributeSet,
                            action: selected,
                        })
                    }}
                    options={optionAttributeSet}
                    className='w-full flex-1'
                    allowClear
                />
                <Button label='Add' btnClassname='flex items-center' />
            </div>

        </div>
    )
}

export default AttributeSetSection
