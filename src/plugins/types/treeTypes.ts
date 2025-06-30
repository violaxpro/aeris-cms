import { Tree } from 'antd';
import type { GetProps, TreeDataNode } from 'antd';

export type FlatNode = {
    id: number | string;
    parent: number | string;
    text: string;
    data?: any;
};

export type TreeNode = {
    key: number | string;
    title: string;
    text: string;
    children?: TreeNode[];
    categoriesData?: categoriesType[]
};

export interface categoriesType {
    id: number;
    parent_id: number | null;   // nullable kalau root
    // slug: string;
    position: number;
    is_searchable: boolean;
    show_on_page: number;
    is_active: boolean;
    // created_at: string;
    // updated_at: string;
    name: string;
    // files: FileNode[];    // bisa juga type FileNode
    meta: MetaNode;       // bisa nested object
    // logo: FileNode | null;
    // banner: FileNode | null;
}

export interface FileNode {
    id: number;
    user_id?: number;
    filename?: string;
    path: string;
    [key: string]: any;
}

export interface MetaNode {
    id: number;
    entity_type: string;
    entity_id: number;
    created_at: string;
    updated_at: string;
    meta_title?: string;
    meta_description?: string;
    description?: string;
    translations?: TranslationNode[];
}

export interface TranslationNode {
    id: number;
    meta_data_id: number;
    locale: string;
    meta_title: string;
    meta_description: string;
    description?: string;
}


export type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

export type formCategoryProps = {
    parentId: string | number | null
    data?: any
}