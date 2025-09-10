type Mode = 'create' | 'edit' | 'detail'
export type FormProps = {
    mode: Mode;
    initialValues?: any;
    slug?: any
    dataTable?: any;
}

export type ChildFormProps = {
    formDataCreate?: any
    onChange: (params: any) => void
    dataById: any
    parentId?: string | number | null
    errors?: any
}
