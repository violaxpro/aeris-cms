'use client';

import { useEffect, useState, useId, useMemo } from 'react';
import dynamic from 'next/dynamic';
import cn from '@/plugins/utils/class-names';
import 'react-quill/dist/quill.snow.css';

// SSR-safe import
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
    style?: any
}

export default function QuillEditor({
    value,
    onChange,
    label,
    error,
    className,
    labelClassName,
    errorClassName,
    toolbarPosition = 'top',
    notes,
    style
}: QuillEditorProps) {
    const [mounted, setMounted] = useState(false);
    const editorId = useId();
    const toolbarId = `${editorId}-toolbar`;

    useEffect(() => {
        setMounted(true);
    }, []);

    const quillModules = useMemo(() => ({
        toolbar: {
            container: `#${toolbarId}`, // bind ke ID unik
        },
    }), [toolbarId]);

    const toolbarContent = useMemo(() => (
        <div id={toolbarId} className='w-full'>
            <span className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
            </span>
            <span className="ql-formats">
                <button className="ql-blockquote" />
                <button className="ql-code-block" />
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
            </span>
            <span className="ql-formats">
                <button className="ql-script" value="sub" />
                <button className="ql-script" value="super" />
            </span>
            <span className="ql-formats">
                <button className="ql-indent" value="-1" />
                <button className="ql-indent" value="+1" />
            </span>
            <span className="ql-formats">
                <select className="ql-color" />
                <select className="ql-background" />
            </span>
            <span className="ql-formats">
                <select className="ql-font" />
                <select className="ql-align" />
            </span>
            <span className="ql-formats">
                <button className="ql-clean" />
            </span>
        </div>
    ), [toolbarId]);

    if (!mounted) return null;

    return (
        <div className={cn(className)}>
            {label && (
                <label className={cn('mb-1.5 block', labelClassName)}>{label}</label>
            )}

            {toolbarPosition === 'top' && toolbarContent}

            <ReactQuill
                key={editorId}
                value={value}
                onChange={onChange}
                modules={quillModules}
                className={cn(
                    'react-quill',
                    toolbarPosition === 'bottom' && 'react-quill-toolbar-bottom relative',
                    error && 'rounded-lg border-2 border-red-400'
                )}
                style={style}

            />

            {toolbarPosition === 'bottom' && toolbarContent}

            {notes && <span>{notes}</span>}
            {/* {error && <FieldError size="md" error={error} className={errorClassName} />} */}
        </div>
    );
}
