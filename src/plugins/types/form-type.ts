type Mode = 'create' | 'edit'
export type FormProps = {
    mode: Mode;
    initialValues?: any;
    slug?: string | number
}

export type ChildFormProps = {
    formDataCreate? : any
    onChange: (params: any) => void
    dataById: any
    parentId?: string | number | null
}
