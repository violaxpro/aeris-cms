type Mode = 'create' | 'edit'
export interface ProductFormProps {
    mode: Mode;
    initialValues?: any;
}