import React, { useState } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd';
import Link from 'next/link';

type buttonProps = {
    btnClassname?: string
    icon?: any
    label?: string
    link?: string
    type?: ButtonProps['type'];
    onClick?: () => void
    shape?: any
    style?: any
    position?: 'start' | 'end'
}
const index = ({ btnClassname, icon, label, link, type, onClick, shape, style, position = 'start' }: buttonProps) => {
    // hover:!bg-inherit hover:!text-inherit hover:!border-inherit
    const button = (
        <Button
            className={`${btnClassname}`}
            type={type}
            onClick={onClick}
            shape={shape}
            style={style}
            iconPosition={position}
        >
            {icon ?? icon}
            {label && <span>
                {label}
            </span>
            }

        </Button>
    )
    return button
}

export default index
