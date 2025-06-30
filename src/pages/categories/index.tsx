'use client'
import React, { useState, useMemo } from 'react';
import { Tree } from 'antd';
import { DirectoryTreeProps } from '@/plugins/types/treeTypes';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout'
import { Input } from 'antd';
import Button from "@/components/button"
import { PlusCircleOutlined } from '@ant-design/icons';
import buildTree from '@/plugins/utils/tree';
import FormCategory from './formCategory/FormCategory';
import { RenderMenu } from './formCategory/RenderMenu';
import { TreeNode } from '@/plugins/types/treeTypes';

const { Search } = Input
const { DirectoryTree } = Tree;

const dummyTreeData = [
    {
        "id": 13,
        "parent": "#",
        "text": "ALARM",
        "data": {
            "position": 0
        }
    },
    {
        "id": 1,
        "parent": 13,
        "text": "BOSCH 2000/3000 SOLUTIONS",
        "data": {
            "position": 1
        }
    },
    {
        "id": 14,
        "parent": "#",
        "text": "CCTV",
        "data": {
            "position": 251
        }
    },
    {
        "id": 15,
        "parent": 14,
        "text": "DAHUA",
        "data": {
            "position": 252
        }
    },
    {
        "id": 169,
        "parent": 15,
        "text": "DAHUA KITS",
        "data": {
            "position": 253
        }
    },
    {
        "id": 180,
        "parent": 169,
        "text": "5 MP KITS",
        "data": {
            "position": 254
        }
    },

]

const breadcrumb = [
    { label: 'Catalogue' },
    { label: 'Categories' }
];

const CategoriesPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [addForm, setAddForm] = useState(false)
    const [selectedParent, setSelectedParent] = useState<TreeNode | null>(null);

    // const treeData = buildTree(dummyTreeData)
    const handleCreateSubcategory = () => {
        // console.log('Create subcategory for:', node);
        // setSelectedParent(node);
        setAddForm(true);
    };

    const handleEditCategory = (node: TreeNode) => {
        console.log('Edit category:', node);
        setSelectedParent(node);
        setAddForm(true);
    };

    const handleDeleteCategory = (node: TreeNode) => {
        console.log('Delete category:', node);
        // TODO: konfirmasi & hapus di treeData
    };

    const mapTreeData = (data: any[]): TreeNode[] => {
        console.log(data)
        return data.map((item) => ({
            ...item,
            key: item.key,
            title: (
                <RenderMenu
                    node={item}
                    onCreateSubcategory={handleCreateSubcategory}
                    onEditCategory={handleEditCategory}
                    onDeleteCategory={handleDeleteCategory}
                />
            ),
            text: item.text,
            children: item.children ? mapTreeData(item.children) : [],
        }));
    };
    const treeData = useMemo(() => {
        const built = buildTree(dummyTreeData);
        console.log(built)
        return mapTreeData(built);
    }, []);
    console.log('treeData', treeData);

    const searchCategory = (
        categories: TreeNode[],
        search: string,
        expandKeys: React.Key[]): TreeNode[] => {
        if (!categories) return [];
        return categories.map((category) => {
            const dataChildren = category.children
                ? searchCategory(category.children as TreeNode[], search, expandKeys)
                : []
            console.log(category)
            if (category.text?.toString().toLowerCase().includes(search.toLowerCase())) {
                // if (dataChildren.length > 0) expandKeys.push(category.key)
                expandKeys.push(category.key)
                return {
                    ...category,
                    children: category.children
                }
            } else if (dataChildren.length > 0) {
                expandKeys.push(category.key)
                return {
                    ...category,
                    children: dataChildren
                }
            }
            return null
        }).filter(Boolean) as TreeNode[];
    }

    const filter = (data: TreeNode[], search: string) => {
        const newExpandData: React.Key[] = [];
        const filtered = searchCategory(data, search, newExpandData);
        setExpandedKeys(newExpandData);
        setAutoExpandParent(true);
        return filtered;
    }

    const filteredTreeData = useMemo(
        () => searchValue ? filter(treeData, searchValue) : treeData, [searchValue, treeData]
    )

    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
        console.log('Trigger Select', keys, info);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        setAutoExpandParent(true);
    }

    const onExpand: DirectoryTreeProps['onExpand'] = (newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys)
        setAutoExpandParent(false)
    };

    const handleAdd = () => {
        setAddForm(!addForm)
    }

    return (
        <>
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">Categories</h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mt-6 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <div>
                            <div className='flex gap-2'>
                                <Search
                                    placeholder='Search Categories'
                                    onChange={onChange}
                                    allowClear
                                    size="middle"
                                    className="!rounded-md !border !border-[#86A788]"
                                />
                                <Button
                                    label='Add New Top Category'
                                    icon={<PlusCircleOutlined />}
                                    btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                                    onClick={handleAdd}
                                />
                            </div>

                            <div className='mt-2'>
                                <DirectoryTree
                                    multiple
                                    draggable
                                    onSelect={onSelect}
                                    onExpand={onExpand}
                                    treeData={filteredTreeData}
                                    expandedKeys={expandedKeys}
                                    autoExpandParent={autoExpandParent}
                                />
                            </div>

                        </div>
                        <div>
                            {
                                addForm == true && <FormCategory
                                    parentId={selectedParent?.key ?? null}
                                    data={selectedParent ?? null}
                                />
                            }
                        </div>
                    </div>

                </div>
            </Content>

        </>

    );
};


export default CategoriesPage;