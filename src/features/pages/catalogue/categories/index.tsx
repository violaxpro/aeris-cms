'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { DirectoryTreeProps } from '@/plugins/types/treeTypes';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout'
import { Input, Tree, TreeProps, Checkbox } from 'antd';
import SearchTable from '@/components/search/SearchTable';
import Button from "@/components/button"
import { PlusCircleOutlined } from '@ant-design/icons';
import { buildTree, flattenTree } from '@/plugins/utils/tree';
import FormCategory from './formCategory/FormCategory';
import { RenderMenu } from './formCategory/RenderMenu';
import { TreeNode } from '@/plugins/types/treeTypes';
import { getCategories } from '@/services/category-service';
import { useAtom } from 'jotai';
import { categoryDataFetch } from '@/store/CategoriesAtom';
import { deleteCategory, updateCategory, getCategorybyId } from '@/services/category-service';
import { useNotificationAntd } from '@/components/toast';
import { useRouter } from 'next/navigation';

const { Search } = Input
// const { DirectoryTree } = Tree;

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

const subCatArray1 = {
    key: 32,
    text: "Anak Door Control",
    title: "Anak Door Control",
    children: [],
    categoriesData: {
        "id": 32,
        "name": "Anak Door Control",
        "show_in_page": true,
        "show_in_search": true,
        "enabled": true,
        "url_logo": "http://url.logo",
        "url_banner": "http://url.banner",
        "slug": "door-control",
        "meta_title": "meta title",
        "meta_description": "meta description<",
        "page_description": "<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(4, 81, 165);\">page description</span></p>",
        "created_at": "2025-07-16T02:36:55.984Z",
        "updated_at": "2025-07-16T02:36:55.984Z",
        "children": []
    }
}

const breadcrumb = [
    { title: 'Catalogue' },
    { title: 'Categories' }
];

const CategoriesPage = ({ categories }: { categories?: any }) => {
    const [search, setSearch] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [addForm, setAddForm] = useState(false)
    const [selectedParent, setSelectedParent] = useState<any>(null);
    const [parentId, setParentId] = useState<string | number | null>()
    const [categoryData, setCategoryData] = useState([])
    // const [categoryData, setCategoryData] = useState<any[]>(categories);
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);
    const [formMode, setFormMode] = useState('')

    // const treeData = buildTree(dummyTreeData)
    const handleCreateSubcategory = (node: TreeNode) => {
        console.log('Create subcategory for:', node);
        setSelectedParent(null)
        setParentId(node.key || node.id);
        setFormMode("add");
        setAddForm(true);
    };

    const handleEditCategory = (node: TreeNode) => {
        console.log('Edit category:', node);
        setParentId(null);
        // setSelectedParent(node);
        setFormMode("edit");
        setAddForm(true);
    };

    // const handleDeleteCategory = async (node: TreeNode) => {
    //     try {
    //         const res = await deleteCategory(node.key)
    //         if (res.success == true) {
    //             notifySuccess(res.message)
    //             setCategoryData(prev => prev.filter(item => item.id !== node.key))
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // };

    const mapTreeData = (data: any[]): TreeNode[] => {
        return data.map((item) => {
            const key = item.key || item.id;
            const childrenData = item?.categoriesData?.children
                ? mapTreeData(item?.categoriesData?.children)
                : item?.children
                    ? mapTreeData(item?.children)
                    : []

            console.log(childrenData)

            if (!searchValue) {
                childrenData.push({
                    key: `add-${item.id || item.key}`,
                    title: (
                        <div>
                            <span
                                className="text-blue-500 hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log(item)
                                    handleCreateSubcategory(item);
                                }}
                            >
                                + Add Subcategory
                            </span>
                        </div>

                    ),
                    isLeaf: true,
                    selectable: false,
                });
            }


            return {
                key: item.key || item.id,
                title: (
                    <div
                        onMouseEnter={() => setHoveredKey(key)}
                        onMouseLeave={() => setHoveredKey(null)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Kiri: Checkbox + Title */}
                        {/* <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            {hoveredKey === key && (
                                <Checkbox
                                    checked={checkedKeys.includes(key)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setCheckedKeys((prev) =>
                                            checked ? [...prev, key] : prev.filter((k) => k !== key)
                                        );
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}
                            <span>{item.title || item.name}</span>
                        </div> */}
                        <span>{item.title || item.name}</span>

                        {/* Kanan: Menu button (misal 3 titik) */}
                        {/* <RenderMenu
                            node={item}
                            onCreateSubcategory={handleCreateSubcategory}
                            onEditCategory={handleEditCategory}
                            onDeleteCategory={handleDeleteCategory}
                        /> */}
                    </div>
                ),

                // text : item.title || item.name,
                children: childrenData,
                isLeaf: false,
                categoriesData: item.categoriesData || item,
            };
        });
    };

    console.log(hoveredKey)


    const treeData = useMemo(() => {
        const built = buildTree(categoryData);
        return mapTreeData(built);
    }, [categoryData, hoveredKey]);

    console.log(treeData, categoryData)

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

    const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info: any) => {
        // console.log('onSelect', info);
        // setSelectedKeys(selectedKeysValue);

        const selectedNode = info.node as TreeNode;
        const dataCategory = info.node.categoriesData
        const isValidNode =
            selectedNode.selectable !== false &&
            !selectedNode.key.toString().startsWith('add') &&
            !selectedNode.key.toString().startsWith('subchild') &&
            !selectedNode.key.toString().startsWith('dummy-child');

        console.log(isValidNode)
        if (isValidNode) {
            console.log('masuk', isValidNode)

            setSelectedKeys([selectedNode.key]); // Hanya satu key aktif
            handleEditCategory(dataCategory);
            setSelectedParent(dataCategory);
        } else {
            // Clear selection kalau yang diklik bukan node yang valid
            setSelectedKeys([]);
            setSelectedParent(null);
            setAddForm(false);
        }
    };

    console.log(selectedKeys, selectedParent)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        setAutoExpandParent(true);
    }

    const onExpand: DirectoryTreeProps['onExpand'] = (newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys)
        setAutoExpandParent(false)
    };

    const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue as React.Key[]);
    };

    const handleAdd = () => {
        setFormMode("add");
        setSelectedParent(null);
        setParentId(null);
        setAddForm(true);
    }

    useEffect(() => {
        if (categories) {
            setCategoryData(categories);
        }
        const loadCategories = async () => {
            try {
                const res = await getCategories();
                if (res?.data) {
                    setCategoryData(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };

        loadCategories(); // fetch saat pertama kali halaman load
    }, []);


    // const handleDrop: TreeProps['onDrop'] = async (info) => {
    //     const dragKey = info.dragNode.key as number;
    //     const dropKey = info.node.key as number;

    //     try {
    //         // Ambil data kategori asli dari server
    //         const categoryFromServer = await getCategorybyId(dragKey);
    //         if (!categoryFromServer) return;

    //         // Ubah parent_id saja
    //         const updatedPayload = {
    //             ...categoryFromServer,
    //             parent_id: dropKey,
    //         };

    //         // Kirim update ke backend
    //         await updateCategory(dragKey, updatedPayload);

    //         // Refresh data tree
    //         const updated = await getCategories();
    //         setCategoryData(updated);
    //     } catch (err) {
    //         console.error("Failed to update category:", err);
    //     }
    // };



    // console.log('data woi', filteredTreeData)

    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">Categories</h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mb-0">
                <div className='bg-[#fff] min-h-[360px] p-6'>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <div>
                            <div className='flex gap-2 items-center'>
                                <SearchTable
                                    value={search}
                                    onChange={onChange}
                                    onSearch={() => console.log('Searching for:', search)}
                                />
                                <Button
                                    label='Add New Top Category'
                                    icon={<PlusCircleOutlined />}
                                    onClick={handleAdd}
                                />
                            </div>

                            <div className='mt-2'>
                                <Tree
                                    multiple
                                    draggable
                                    checkable
                                    onCheck={onCheck}
                                    checkedKeys={checkedKeys}
                                    onSelect={onSelect}
                                    selectedKeys={selectedKeys}
                                    onExpand={onExpand}
                                    treeData={filteredTreeData}
                                    expandedKeys={expandedKeys}
                                    autoExpandParent={autoExpandParent}
                                    className="custom-hover-tree"
                                // onDrop={handleDrop}
                                />
                            </div>

                        </div>
                        <div>
                            {
                                addForm == true && <FormCategory
                                    key={formMode + "-" + (selectedParent?.id ?? parentId ?? "new")}
                                    parentId={parentId ?? null}
                                    data={formMode === "edit" ? selectedParent : undefined}
                                    mode={formMode}
                                    onSaved={async () => {
                                        const refreshed = await getCategories()
                                        if (refreshed.data) {
                                            setCategoryData(refreshed.data)
                                        }
                                        setAddForm(false)
                                    }}
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