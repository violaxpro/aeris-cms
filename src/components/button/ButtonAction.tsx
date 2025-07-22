import React from 'react'
import { Button, ButtonProps } from 'antd'
import Image from 'next/image'

type ButtonActionProps = {
    icon?: any
    onClick?: () => void
} & ButtonProps
const ButtonAction = ({
    icon,
    onClick,
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
                        width={10}
                        height={10}
                    />
                )
            }
            {...props}
        />
    )
}

export default ButtonAction
