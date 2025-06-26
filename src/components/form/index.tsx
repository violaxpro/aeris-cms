
interface FormGroupProps {
    title: React.ReactNode;
    className?: string;
    description?: string;
    children?: React.ReactNode;
}

export default function FormGroup({
    title,
    className,
    description,
    children,
}: FormGroupProps) {
    return (
        <div className={`grid grid-cols-12 gap-4`}>
            <div className="col-span-12 md:col-span-4">
                <h4 className="text-base font-medium">{title}</h4>
                {description && <p className="mt-2">{description}</p>}
            </div>
            {children && (
                <div className="col-span-12 md:col-span-8 grid grid-cols-2 gap-4">
                    {children}
                </div>
            )}
        </div>
    );
}
