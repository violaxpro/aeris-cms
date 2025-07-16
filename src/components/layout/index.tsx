// DashboardLayout.tsx
'use client';
import React, { useEffect } from 'react';
import Sidebar from './sidebar';
import HeaderLayout from './header';
import Layout from 'antd/es/layout/layout';
import { Content, Footer } from 'antd/es/layout/layout';
import { getBrands } from '@/services/brands-service'
import { getCategories } from '@/services/category-service'
import { getAttributeSet } from '@/services/attribute-set-service';
import { getProduct } from '@/services/products-service';
import { getTaxes } from '@/services/settings-service';
import { useAtom } from 'jotai'
import { brandsAtom, categoriesAtom, attributeSetAtom, productSetAtom, taxSetAtom } from '@/store/DropdownItemStore'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [optionBrands, setOptionBrands] = useAtom(brandsAtom)
    const [optionCategories, setOptionCategories] = useAtom(categoriesAtom)
    const [optionAttributeSet, setOptionAttributeSet] = useAtom(attributeSetAtom)
    const [optionProduct, setOptionProduct] = useAtom(productSetAtom)
    const [optionTaxes, setOptionTaxes] = useAtom(taxSetAtom)

    useEffect(() => {
        const fetchData = async () => {
            const brands = await getBrands()
            const categories = await getCategories()
            const attributeSet = await getAttributeSet()
            const products = await getProduct()
            const taxes = await getTaxes()

            const brandOptions = brands.data.map((brand: any) => ({
                label: brand.name,
                value: brand.id
            }))

            const categoryOptions = categories.data.map((category: any) => ({
                label: category.name,
                value: category.id
            }))

            const attributeSetOption = attributeSet.data.map((attr: any) => ({
                label: attr.name,
                value: attr.id
            }))

            const productOption = products.data.map((product: any) => ({
                label: product.name,
                value: product.id
            }))

            const taxOption = taxes.data.map((tax: any) => ({
                label: tax.name,
                value: tax.value
            }))
            setOptionBrands(brandOptions)
            setOptionCategories(categoryOptions)
            setOptionAttributeSet(attributeSetOption)
            setOptionProduct(productOption)
            setOptionTaxes(taxOption)
        }

        fetchData()
    }, [setOptionBrands, setOptionCategories, setOptionAttributeSet, setOptionProduct, setOptionTaxes])
    return (
        <Layout style={{
            minHeight: '100vh',
          
        }}>
            <HeaderLayout />
            <Layout>
                <Sidebar />
                <Layout>
                    {children}
                </Layout>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
}
