type Mode = 'create' | 'edit'
export interface FormProps {
    mode: Mode;
    initialValues?: any;
    slug?: string | number
}

export interface ChildFormProps {
    onChange: (params: any) => void
    dataChild: any
}