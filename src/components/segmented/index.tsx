import React, { useState } from 'react';
import { Segmented } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

type SegmentedProps = {
    size?: SizeType
    shape?: "default" | "round" | undefined
    options: any[]
    value?: string | number;
    onChange?: (value: string | number) => void
}
const index = ({
    size = 'middle',
    shape = 'round',
    options,
    value,
    onChange
}: SegmentedProps) => {
    return (
        <Segmented
            size={size}
            shape={shape}
            options={options}
            value={value}
            onChange={onChange}
            className='!px-2 !py-1 custom-segmented-border'
        />
    );
};

export default index;