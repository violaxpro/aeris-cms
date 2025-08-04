import React from 'react'
import Card from 'antd/es/card/Card'
import Image from 'next/image'
import { MoreVerticalIcon } from '@public/icon'
import Avatar from '@/components/avatar'
import AvatarImage from "public/social-avatar.webp"
import Rate from '@/components/rate'

type CardTopPerformanceReportType = {
    name: string
    role: string
    avatar?: any
    score: number
}
const CardTopPerformanceReport = ({
    name,
    role,
    avatar = AvatarImage,
    score
}: CardTopPerformanceReportType) => {
    return (
        <Card>
            <div className='flex gap-4 items-center'>
                <div className='flex gap-3 items-center'>
                    <Avatar url={avatar} size='default' style={{ backgroundColor: '#87d068' }} />
                    <div className='flex flex-col'>
                        <label className='text-lg'>{name}</label>
                        <label>{role}</label>
                    </div>
                </div>
                <Rate value={score} />
            </div>
        </Card>
    )
}

export default CardTopPerformanceReport
