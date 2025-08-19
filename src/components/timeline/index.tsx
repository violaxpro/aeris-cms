import React from 'react'
import { Timeline, Typography } from 'antd';
import ButtonIcon from '../button/ButtonIcon';
import Image from 'next/image'
import {
    PinMapBlackIcon,
    PinMapGrayIcon,
    DeviceMobileIcon,
    DeviceMobileGreyIcon,
    CommentIcon,
    CommentGreyIcon,
    GalleryIcon,
} from '@public/icon'
import Button from '@/components/button'

const { Paragraph } = Typography;

type TimelineType = {
    data: any
    getIcon?: any
    getLabel?: any
    availableImage?: boolean
    onOpenPhoto?: any
}
const index = ({
    data,
    getIcon,
    getLabel,
    availableImage = false,
    onOpenPhoto
}: TimelineType) => {
    return (
        <div className='max-h-[60vh] overflow-auto p-4'>
            <Timeline >
                {data?.map((step: any, idx: any) => {
                    const isDisabled = !step.device && !step.location && !step.time;
                    return (
                        <Timeline.Item
                            key={idx}
                            dot={
                                <ButtonIcon
                                    icon={getIcon(step.type)}
                                    shape='circle'
                                    variant='filled'
                                    color={isDisabled ? 'default' : 'blue'}
                                    width={15}
                                    height={15}
                                />}
                        >
                            <div className='flex flex-col'>
                                <div className='flex justify-between items-center -mt-2'>
                                    <label className={`text-lg font-semibold ${isDisabled ? 'text-[#787878]' : ''}`}>
                                        {getLabel ? getLabel(step?.type) : step.title}
                                    </label>
                                    {availableImage &&
                                        <div className='flex gap-2 items-center'>
                                            {
                                                (step.type == 'checkin' || step.type == 'checkout') && !isDisabled
                                                && <ButtonIcon
                                                    icon={GalleryIcon}
                                                    width={18}
                                                    height={18}
                                                    shape='circle'
                                                    variant='solid'
                                                    className='!bg-[var(--default-color)]'
                                                    onClick={() => onOpenPhoto(step)}
                                                />
                                            }
                                            <Button
                                                label={step.time || '00:00:00'}
                                                shape='round'
                                                variant='filled'
                                                btnClassname={`!border-none 
                                            ${isDisabled
                                                        ? '!bg-[#F4F4F4] !text-[#787878]'
                                                        : '!bg-[#3666AA1A] !text-[#3666AA]'}`
                                                }
                                            />
                                        </div>
                                    }
                                </div>

                                <Paragraph>
                                    <div className='flex gap-2'>
                                        <Image
                                            src={isDisabled ? DeviceMobileGreyIcon : DeviceMobileIcon}
                                            alt='device-icon'
                                        />
                                        <span className={`${isDisabled ? 'text-[#787878]' : ''}`}>
                                            {step.device || 'Employee Device'}
                                        </span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image
                                            src={isDisabled ? PinMapGrayIcon : PinMapBlackIcon}
                                            alt='pin-map-icon'
                                        />
                                        <span className={`${isDisabled ? 'text-[#787878]' : ''}`}>
                                            {step.location || 'Employee Location'}
                                        </span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image
                                            src={isDisabled ? CommentGreyIcon : CommentIcon}
                                            alt='comment-icon'
                                        />
                                        <span className={`${isDisabled ? 'text-[#787878]' : ''}`}>
                                            {step.comment || 'No Comment'}
                                        </span>
                                    </div>
                                </Paragraph>
                            </div>

                        </Timeline.Item>
                    )
                })}
            </Timeline>
        </div>
    )
}

export default index
