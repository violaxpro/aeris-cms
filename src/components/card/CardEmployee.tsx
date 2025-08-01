import React from 'react'
import Card from 'antd/es/card/Card'
import Image from 'next/image'
import { MoreVerticalIcon } from '@public/icon'
import Avatar from '@/components/avatar'
import AvatarImage from "public/social-avatar.webp"
import Rate from '@/components/rate'
import { Divider } from 'antd'

type CardEmployeeType = {
    name: string
    role: string
    avatar?: any
    score: number
}
const CardEmployee = ({
    name,
    role,
    avatar = AvatarImage,
    score
}: CardEmployeeType) => {
    return (
        <Card>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-end'>
                    <Image
                        src={MoreVerticalIcon}
                        alt='more-icon'
                    />
                </div>
                <div className='flex gap-3'>
                    <Avatar url={avatar} size='default' style={{ backgroundColor: '#87d068' }} />
                    <div className='flex flex-col'>
                        <label className='text-lg'>{name}</label>
                        <label>{role}</label>
                    </div>
                </div>
                <hr style={{ borderColor: '#E5E7EB' }} />
                <Rate value={score} />
            </div>
        </Card>
    )
}

export default CardEmployee
