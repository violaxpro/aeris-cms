import React from 'react';
import { Modal } from 'antd';
import { Button } from 'antd';

type DeleteConfirmModalProps = {
    open: boolean;
    onCancel: () => void;
    onDelete: (id: any) => void;
};

const DeleteConfirmModal = ({
    open,
    onCancel,
    onDelete,
}: DeleteConfirmModalProps) => {
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
                <h2 className="text-lg font-semibold mb-2">Are you sure you want to delete this address?</h2>
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
                        onClick={onDelete}
                        className="btn-delete min-w-[100px]"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmModal;
