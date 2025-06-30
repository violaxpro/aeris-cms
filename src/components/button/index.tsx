import React from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd';

type buttonProps = {
    btnClassname?: string
    icon?: any
    label: string
    link?: string
    type?: ButtonProps['type'];
    onClick?: () => void
}
const index = ({ btnClassname, icon, label, link, type, onClick }: buttonProps) => {
    const button = (
        <Button
            className={btnClassname}
            {...(type ? { type } : {})}
            {...(onClick ? { onClick } : {})}

        >
            {icon ?? icon}
            <span>
                {label}
            </span>
        </Button>
    )
    return link ? (
        <a href={link}>
            {button}
        </a>
    ) : (button)
}

export default index
