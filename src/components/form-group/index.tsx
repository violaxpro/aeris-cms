import { Divider } from "antd";
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
        <div className={className}>
            <div>
                <h4 className="text-2xl font-semibold">{title}</h4>
                {description && <p className="mt-2">{description}</p>}
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
