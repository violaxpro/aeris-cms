// import { Divider } from "antd";
import Divider from '@/components/divider'
import Button from '@/components/button'

interface FormGroupProps {
    title: React.ReactNode;
    className?: string;
    description?: string;
    children?: React.ReactNode;
    column?: number
    childClassName?: string
}

export default function FormGroup({
    title,
    className,
    description,
    children,
    column,
    childClassName
}: FormGroupProps) {
    return (
        <div className={`${className} flex flex-col gap-6`}>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <h4 className="text-2xl font-semibold">{title}</h4>
                    {description && <p>{description}</p>}
                </div>
                <Divider />
            </div>
            {children && (
                <div className={childClassName}>
                    {children}
                </div>
            )}
        </div>
    );
}
