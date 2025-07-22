'use client';

import React from 'react';
import { Select } from 'antd';

type ShowPageSizeProps = {
    pageSize: number;
    onChange: (val: number) => void;
};

const pageSizeOptions = ['10', '20', '50', '100'];

const ShowPageSize: React.FC<ShowPageSizeProps> = ({
    pageSize,
    onChange,
}) => {
    return (
        <div className='flex items-center gap-2'>
            <Select
                size='middle'
                value={pageSize.toString()}
                className='w-auto !h-10'
                options={pageSizeOptions.map((val) => ({
                    label: `Show ${val}`,
                    value: val,
                }))}
                onChange={(val) => onChange(Number(val))}
            />
        </div>
    );
};

export default ShowPageSize;
