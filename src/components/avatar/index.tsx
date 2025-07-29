import React from 'react';
import { Avatar, AvatarProps } from 'antd';
import Image from 'next/image';

const size = { xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }

type AvatarType = {
    url: any
} & AvatarProps
const index = ({
    url,
    ...props
}: AvatarType) => (
    <Avatar
        size={size}
        src={
            <Image
                src={url}
                alt='employee-photo'
            />}
        {...props}
    />
);

export default index;