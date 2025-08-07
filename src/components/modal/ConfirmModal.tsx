import React, { act } from 'react';
import { Modal } from 'antd';
import { Button } from 'antd';

type ConfirmModalProps = {
    open: boolean;
    onCancel: () => void;
    onSave: (id: any) => void;
    text: string
    action?: string
};

const ConfirmModal = ({
    open,
    onCancel,
    onSave,
    text = 'Are you sure you want to checkout?',
    action
}: ConfirmModalProps) => {
    return (
        <Modal
            open={open}
            footer={null}
            closable
            centered
            onCancel={onCancel}
            width={500}
        >
            <div className="text-center p-8">
                <h2 className="text-lg font-semibold mb-2">{text}</h2>
                <p className="text-gray-500 mb-6">This action cannot be undone.</p>

                <div className="flex justify-center gap-4">
                    <Button
                        size="middle"
                        onClick={onCancel}
                        className="min-w-[100px] !text-white !bg-[var(--default-color)] hover:!border-inherit"
                    >
                        Cancel
                    </Button>

                    <Button
                        color='default'
                        variant="outlined"
                        size="middle"
                        onClick={onSave}
                        className="btn-delete min-w-[100px]"
                    >
                        {action}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
