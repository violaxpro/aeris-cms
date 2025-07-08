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
    isBtnPopover
}: ModalProps) => {

    return (
        <>
            <Modal
                title={title}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={open}
                onCancel={handleCancel}
                footer={(_, { CancelBtn }) => (
                    <>
                        {
                            isBtnSave == true ?
                                <Button
                                    label={labelButton ? labelButton : 'Save'}
                                    onClick={handleSubmit}
                                    btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                                /> :
                                <Button
                                    label='Yes'
                                    onClick={handleYes}
                                    btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                                />
                        }
                        {
                            isBtnPopover == true ?
                                <Button
                                    label='No'
                                    onClick={handleNo}
                                    btnClassname="!bg-red-500 !text-white hover:!bg-white hover:!text-red-500 hover:!border-red-500"
                                />

                                : <CancelBtn />
                        }

                    </>
                )}

            >
                {children}
            </Modal>
        </>
    );
};

export default index;