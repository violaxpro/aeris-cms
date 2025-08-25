import React from 'react';
import { Modal } from 'antd';
import Button from "@/components/button"
import Image from 'next/image';

type ModalProps = {
    title?: string
    open: boolean
    handleSubmit?: () => void
    handleCancel?: () => void
    handleNo?: () => void
    handleYes?: () => void
    isBtnSave?: boolean
    handleOk?: () => void,
    children: React.ReactNode
    labelButton?: string
    isBtnPopover?: boolean
    subtitle?: string
    isBtnReset?: boolean
    handleDelete?: () => void
    rightButton?: any
    date?: any
    iconLeftTitle?: any
}

const index = ({
    title,
    open = false,
    handleSubmit,
    handleCancel,
    handleNo,
    handleYes,
    handleOk,
    isBtnSave = false,
    children,
    labelButton,
    isBtnPopover,
    subtitle,
    isBtnReset = false,
    handleDelete,
    rightButton,
    date,
    iconLeftTitle
}: ModalProps) => {

    return (
        <>
            <Modal
                title={
                    <div className='flex justify-between items-center my-5  mx-5'>
                        <div className='flex flex-col'>
                            {
                                iconLeftTitle ? <div className='flex items-center gap-1'>
                                    <Image
                                        src={iconLeftTitle}
                                        alt='icon-left'
                                    />
                                    <span className='text-2xl font-semibold'>{title}</span>
                                </div>
                                    :
                                    <span className='text-2xl font-semibold'>{title}</span>
                            }
                            {
                                date && <span className='text-sm font-normal'>{date}</span>
                            }
                            <span className='text-sm text-gray-300 font-normal'>{subtitle}</span>
                        </div>
                        {
                            rightButton && <div className='mr-4'>
                                {rightButton}
                            </div>
                        }
                    </div>
                }
                closable={true}
                open={open}
                centered
                onCancel={handleCancel}
                footer={null}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}

            >
                <div className='my-5 mx-5'>
                    {children}

                    {/* Tambahkan button manual di sini */}
                    <div className="flex justify-center gap-2 mt-6">
                        {isBtnReset && (
                            <Button
                                label="Reset"
                                onClick={handleDelete}
                                btnClassname="!bg-white"
                                style={{ color: 'black !important' }}
                            />
                        )}
                        {isBtnSave && (
                            <Button
                                label={labelButton ? labelButton : 'Save'}
                                onClick={handleSubmit}
                            />
                        )}
                        {/* <Button
                                label="Yes"
                                onClick={handleYes}
                            /> */}
                        {isBtnPopover && (
                            <Button
                                label="No"
                                onClick={handleNo}
                                btnClassname="!bg-red-500 !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-red-500 hover:!border-red-500"
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default index;