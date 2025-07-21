import React from 'react';
import { Modal } from 'antd';
import Button from "@/components/button"

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
    handleDelete
}: ModalProps) => {

    return (
        <>
            <Modal
                title={
                    <div>
                        <div className='text-lg font-semibold text-[#103654]'>{title}</div>
                        <div className='text-sm text-gray-300 font-normal'>{subtitle}</div>
                    </div>
                }
                closable={true}
                open={open}
                centered
                onCancel={handleCancel}
                footer={(_, { CancelBtn }) => (
                    <>
                        <div className="flex justify-center gap-2">
                            {
                                isBtnReset == true && <Button
                                    label='Reset'
                                    onClick={handleDelete}
                                    btnClassname='!bg-white'
                                    style={{ color: 'black !important' }}
                                />
                            }
                            {
                                isBtnSave == true ?
                                    <Button
                                        label={labelButton ? labelButton : 'Save'}
                                        onClick={handleSubmit}
                                    /> :
                                    <Button
                                        label='Yes'
                                        onClick={handleYes}
                                    />
                            }
                            {
                                isBtnPopover == true &&
                                <Button
                                    label='No'
                                    onClick={handleNo}
                                    btnClassname="!bg-red-500 !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-red-500 hover:!border-red-500"
                                />

                                // : <CancelBtn />
                            }
                        </div>
                    </>
                )}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}

            >
                {children}
            </Modal>
        </>
    );
};

export default index;