type Mode = 'create' | 'edit'
export type FormProps = {
    mode: Mode;
    initialValues?: any;
    slug?: string | number
    dataTable? : any;
}

export type ChildFormProps = {
    formDataCreate? : any
    onChange: (params: any) => void
    dataById: any
    parentId?: string | number | null
}
