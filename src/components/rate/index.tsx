import React from 'react';
import { Rate } from 'antd';

type RateProps = {
    className?: string
    value: number
}

const index = ({
    className,
    value
}: RateProps) => {
    return (
        <Rate
            allowHalf
            defaultValue={value}
            disabled
            className={`${className}`}
        />
    )
};

export default index;