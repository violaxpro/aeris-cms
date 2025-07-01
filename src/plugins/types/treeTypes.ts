import { Tree } from 'antd';
import type { GetProps, TreeDataNode } from 'antd';

export type FlatNode = categoriesType & {
    id: number | string;
    parent: number | string;
    name: string;
    data?: any;
};

export type TreeNode = {
    key: number | string;
    title: string;
    text: string;
    children?: TreeNode[];
    categoriesData?: categoriesType
};

export interface categoriesType {
    id: number;
    // parent_id: number | null;   
    // slug: string;
    // position: number;
    // created_at: string;
    // updated_at: string;
    name: string;
    // files: FileNode[];    // bisa juga type FileNode
    // meta: MetaNode;       // bisa nested object
    meta_description: string
    meta_title: string
    page_decsription: string
    show_in_page: boolean
    show_in_search: boolean
    enabled: boolean
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