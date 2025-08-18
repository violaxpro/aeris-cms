'use client';

import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { FileUploadIcon } from '@public/icon';
import type { UploadFile, UploadProps } from 'antd';
import Image from 'next/image';
import { Upload, message, Spin } from 'antd';

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
    isUpload?: boolean
    fileList?: UploadFile<any>[]
    required?: boolean
    iconClassName?: string
    style?: any

};

const FileUploader: React.FC<FileUploaderProps> = ({
    action,
    multiple = false,
    onSuccess,
    onError,
    className = '',
    label,
    error = false,
    errorMessage,
    isUpload = false,
    fileList,
    required,
    iconClassName = 'flex-col',
    style
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
        fileList
    };

    return (
        <>
            <div className='flex flex-col w-full'>
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <Spin spinning={isUpload}>
                    <Dragger {...props} className={className} style={style}>
                        <div className={` flex ${iconClassName} items-center justify-center w-full h-full gap-2`}>
                            <Image src={FileUploadIcon} alt="Upload Icon" width={20} height={20} />
                            <p className="text-sm !text-[#A19F9F] flex gap-1">Drag and drop file here or <p className='text-blue-600'> choose file</p></p>
                        </div>
                    </Dragger>
                </Spin>
                {errorMessage && (
                    <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                )}
            </div>


        </>

    );
};

export default FileUploader;
