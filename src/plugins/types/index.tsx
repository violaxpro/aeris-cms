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

export type Params = Promise<{ slug: string }>

export type ImagesType = {
    name: string;
    url: string;
    default: boolean;
    alt_image: string;
};
