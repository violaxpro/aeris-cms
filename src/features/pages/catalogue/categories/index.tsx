'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { DirectoryTreeProps } from '@/plugins/types/treeTypes';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout'
import { Input, Tree, TreeProps, Checkbox } from 'antd';
import Button from "@/components/button"
import { PlusCircleOutlined } from '@ant-design/icons';
import buildTree from '@/plugins/utils/tree';
import FormCategory from './formCategory/FormCategory';
import { RenderMenu } from './formCategory/RenderMenu';
import { TreeNode } from '@/plugins/types/treeTypes';
import { getCategories } from '@/services/category-service';
import { useAtom } from 'jotai';
import { categoryDataFetch } from '@/store/CategoriesAtom';
import { deleteCategory } from '@/services/category-service';
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
    const [searchValue, setSearchValue] = useState('')
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [addForm, setAddForm] = useState(false)
    const [selectedParent, setSelectedParent] = useState<TreeNode | null>(null);
    const [parentId, setParentId] = useState<string | number | null>()
    const [categoryData, setCategoryData] = useAtom(categoryDataFetch)
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);

    // const treeData = buildTree(dummyTreeData)
    const handleCreateSubcategory = (node: TreeNode) => {
        console.log('Create subcategory for:', node);
        setParentId(node.key);
        setAddForm(true);
    };

    const handleEditCategory = (node: TreeNode) => {
        console.log('Edit category:', node);
        setSelectedParent(node);
        setAddForm(true);
    };

    const handleDeleteCategory = async (node: TreeNode) => {
        try {
            const res = await deleteCategory(node.key)
            if (res.success == true) {
                notifySuccess(res.message)
                setCategoryData(prev => prev.filter(item => item.id !== node.key))
            }
        } catch (error) {
            console.error(error)
        }
    };

    const mapTreeData = (data: any[]): TreeNode[] => {
        return data.map((item) => {
            const key = item.key || item.id;
            // Ambil children mentahnya
            // const childrenData = item?.children ? mapTreeData(item.children) : []
            // Recursive dummy map children
            const childrenData: TreeNode[] = [];
            childrenData.push({
                key: `dummy-child-${item.id || item.key}`,
                title: <span>Anak Kategory</span>,
                isLeaf: false,
                selectable: true,
                children: [
                    {
                        key: `subchild-${item.id || item.key}`,
                        title: 'Sub Anak',
                        isLeaf: true,
                        selectable: true,
                    },
                    {
                        key: `add-subchild-${item.id || item.key}`,
                        title: (
                            <span
                                className="text-blue-500 hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCreateSubcategory(item);
                                }}
                            >
                                + Add Subcategory
                            </span>
                        ),
                        isLeaf: true,
                        selectable: false,
                    },
                ],

            })

            if (!searchValue) {
                childrenData.push({
                    key: `add-${item.id || item.key}`,
                    title: (
                        <div>
                            <span
                                className="text-blue-500 hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation();
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

    console.log(treeData)

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


    const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

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
        setAddForm(!addForm)
    }

    useEffect(() => {
        setCategoryData(categories)
    }, [categories])


    // const handleDrop: TreeProps['onDrop'] = (info) => {
    //     console.log(info);
    //     const dropKey = info.node.key;
    //     const dragKey = info.dragNode.key;
    //     const dropPos = info.node.pos.split('-');
    //     const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

    //     const loop = (
    //         data: TreeNode[],
    //         key: React.Key,
    //         callback: (node: TreeNode, i: number, data: TreeNode[]) => void,
    //     ) => {
    //         for (let i = 0; i < data.length; i++) {
    //             if (data[i].key === key) {
    //                 return callback(data[i], i, data);
    //             }
    //             if (data[i].children) {
    //                 loop(data[i].children!, key, callback);
    //             }
    //         }
    //     };
    //     const data = [...categories];

    //     // Find dragObject
    //     let dragObj: TreeNode;
    //     loop(data, dragKey, (item, index, arr) => {
    //         arr.splice(index, 1);
    //         dragObj = item;
    //     });

    //     if (!info.dropToGap) {
    //         // Drop on the content
    //         loop(data, dropKey, (item) => {
    //             item.children = item.children || [];
    //             // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
    //             item.children.unshift(dragObj);
    //         });
    //     } else {
    //         let ar: TreeNode[] = [];
    //         let i: number;
    //         loop(data, dropKey, (_item, index, arr) => {
    //             ar = arr;
    //             i = index;
    //         });
    //         if (dropPosition === -1) {
    //             // Drop on the top of the drop node
    //             ar.splice(i!, 0, dragObj!);
    //         } else {
    //             // Drop on the bottom of the drop node
    //             ar.splice(i! + 1, 0, dragObj!);
    //         }
    //     }
    //     setCategoryData(data);
    // };

    // console.log('data woi', filteredTreeData)

    return (
        <>
            {contextHolder}
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
                                    parentId={parentId ?? null}
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