'use client'
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
const index = ({ btnClassname = '!w-auto !bg-[var(--default-color)] !text-white', icon, label, link, type, onClick, shape, style, position = 'start' }: buttonProps) => {
    // hover:!bg-inherit hover:!text-inherit hover:!border-inherit
    const button = (
        <Button
            className={`${btnClassname}  hover:!border-inherit`}
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
    return link ? (
        <Link href={link}>
            {button}
        </Link>
    ) : (button)
}

export default index
