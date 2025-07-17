
interface FormGroupProps {
    title: React.ReactNode;
    className?: string;
    description?: string;
    children?: React.ReactNode;
    column?: number
    gridRow?: boolean
}

export default function FormGroup({
    title,
    className,
    description,
    children,
    column,
    gridRow = false
}: FormGroupProps) {
    return (
        <div className={`grid ${gridRow == true ? '' : 'grid-cols-12'} gap-4`}>
            <div className="col-span-12 md:col-span-4">
                <h4 className="text-base font-medium">{title}</h4>
                {description && <p className="mt-2">{description}</p>}
            </div>
            {children && (
                <div className={`col-span-12 md:col-span-8 grid ${column ? '' : 'grid-cols-2'} gap-4`}>
                    {children}
                </div>
            )}
        </div>
    );
}
