'use client';

import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Upload, message } from 'antd';

const { Dragger } = Upload;

type FileUploaderProps = {
    action?: string; // URL tujuan upload
    multiple?: boolean;
    onSuccess?: (file: UploadFile<any>) => void;
    onError?: (file: UploadFile<any>) => void;
    className?: string;
    label: string
    error?: boolean
    errorMessage?: string

};

const FileUploader: React.FC<FileUploaderProps> = ({
    action,
    multiple = false,
    onSuccess,
    onError,
    className = '',
    label,
    error = false,
    errorMessage
}) => {
    const props: UploadProps = {
        name: 'file',
        multiple,
        // action,
        // onChange(info) {
        //     const { status } = info.file;
        //     if (status !== 'uploading') {
        //         console.log('Uploading:', info.file, info.fileList);
        //     }
        //     if (status === 'done') {
        //         message.success(`${info.file.name} uploaded successfully.`);
        //         onSuccess?.(info.file);
        //     } else if (status === 'error') {
        //         message.error(`${info.file.name} upload failed.`);
        //         onError?.(info.file);
        //     }
        // },
        beforeUpload(file) {
            // intercept file ➜ jangan upload otomatis
            console.log('File intercepted:', file);

            // Panggil callback untuk simpan file ke parent / state
            onSuccess?.(file as UploadFile<any>);

            // returning false = prevent auto-upload
            return false;
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            <div className='flex flex-col w-full gap-2'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
                <Dragger {...props} className={className}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
                {errorMessage && (
                    <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                )}
            </div>


        </>

    );
};

export default FileUploader;
