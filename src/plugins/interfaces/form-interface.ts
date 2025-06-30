type Mode = 'create' | 'edit'
export interface FormProps {
    mode: Mode;
    initialValues?: any;
}