'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import cn from '@/plugins/utils/class-names';
import 'react-quill-new/dist/quill.snow.css';

// Dynamic import ReactQuill agar tidak SSR
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface QuillEditorProps {
    value: string; 
    onChange: (value: string) => void; 
    error?: string;
    label?: React.ReactNode;
    className?: string;
    labelClassName?: string;
    errorClassName?: string;
    toolbarPosition?: 'top' | 'bottom';
    notes?: string;
}

export default function QuillEditor({
    label,
    error,
    className,
    labelClassName,
    errorClassName,
    toolbarPosition = 'top',
    notes,
    ...props
}: QuillEditorProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // ⛔ Blok render di SSR

    const quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
        ],
    };

    return (
        <div className={cn(className)}>
            {label && (
                <label className={cn('mb-1.5 block', labelClassName)}>{label}</label>
            )}

            <ReactQuill
                modules={quillModules}
                className={cn(
                    'react-quill',
                    toolbarPosition === 'bottom' && 'react-quill-toolbar-bottom relative',
                    error && 'rounded-lg border-2 border-red-400'
                )}
                {...props}
            />

            {notes && <span>{notes}</span>}

            {/* 
      {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )}
      */}
        </div>
    );
}
