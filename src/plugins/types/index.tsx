export type LayoutProps = {
    children: React.ReactNode;
};

export type BreadcrumbItemsProps = {
    title: string;
    url?: string;
}

export type BreadcrumbProps = {
    items: BreadcrumbItemsProps[]
}