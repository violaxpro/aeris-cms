'use client';
import React from 'react';
import { Flex, Spin } from 'antd';

type SpinnerProps = {
    /** Ukuran spinner: small | default | large */
    size?: 'small' | 'default' | 'large';
    /** Posisi alignment */
    align?: 'start' | 'center' | 'end';
    /** Gap kiri-kanan spinner */
    gap?: number;
    /** Apakah spinner full width */
    fullWidth?: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({
    size = 'default',
    align = 'center',
    gap = 8,
    fullWidth = true,
}) => {
    return (
        <Flex
            align={align}
            gap={gap}
            style={{ width: fullWidth ? '100%' : 'auto' }}
            justify={align}
        >
            <Spin size={size} />
        </Flex>
    );
};

export default Spinner;
