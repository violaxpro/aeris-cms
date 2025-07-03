// DashboardLayout.tsx
'use client';
import React, { useEffect } from 'react';
import Sidebar from './sidebar';
import HeaderLayout from './header';
import Layout from 'antd/es/layout/layout';
import { Content, Footer } from 'antd/es/layout/layout';
import { getBrands } from '@/services/brands-service'
import { getCategories } from '@/services/category-service'
import { useAtom } from 'jotai'
import { brandsAtom, categoriesAtom } from '@/store/DropdownItemStore'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [optionBrands, setOptionBrands] = useAtom(brandsAtom)
    const [optionCategories, setOptionCategories] = useAtom(categoriesAtom)
    useEffect(() => {
        const fetchData = async () => {
            const brands = await getBrands()
            const categories = await getCategories()
            const brandOptions = brands.data.map((brand: any) => ({
                label: brand.name,
                value: brand.id
            }))

            const categoryOptions = categories.data.map((category: any) => ({
                label: category.name,
                value: category.id
            }))
            setOptionBrands(brandOptions)
            setOptionCategories(categoryOptions)
        }

        fetchData()
    }, [setOptionBrands, setOptionCategories])
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
                <HeaderLayout />
                {children}
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}
