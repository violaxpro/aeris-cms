export type LayoutProps = {
    children: React.ReactNode;
};

export type BreadcrumbItemsProps = {
    label: string;
    url?: string;
}

export type BreadcrumbProps = {
    items: BreadcrumbItemsProps[]
}