import React from 'react';
import { Modal } from 'antd';
import Button from "@/components/button"

type ModalProps = {
    title?: string
    open: boolean
    handleSubmit?: () => void
    handleCancel?: () => void
    isBtnSave?: boolean
    handleOk?: () => void,
    children: React.ReactNode
}

const index = ({
    title,
    open = false,
    handleSubmit,
    handleCancel,
    handleOk,
    isBtnSave = false,
    children
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
                            isBtnSave == true &&
                            <Button
                                label='Save'
                                onClick={handleSubmit}
                                btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                            />
                        }
                        <CancelBtn />
                    </>
                )}

            >
                {children}
            </Modal>
        </>
    );
};

export default index;