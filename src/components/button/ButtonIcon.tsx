import React from 'react'
import { Button, ButtonProps } from 'antd'
import Image from 'next/image'

type ButtonActionProps = {
    icon?: any
    onClick?: () => void
    width?: number
    height?: number
    className?: string
} & ButtonProps
const ButtonAction = ({
    icon,
    onClick,
    width = 10,
    height = 10,
    className,
    ...props
}: ButtonActionProps) => {
    return (
        <Button
            onClick={onClick}
            icon={
                icon && (
                    <Image
                        src={icon}
                        alt="icon"
                        width={width}
                        height={width}
                    />
                )
            }
            className={className}
            {...props}
        />
    )
}

export default ButtonAction
