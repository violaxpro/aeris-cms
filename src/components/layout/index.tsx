// DashboardLayout.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import HeaderLayout from './header';
import Layout from 'antd/es/layout/layout';
import { Grid, Drawer } from 'antd';
import { getBrands } from '@/services/brands-service'
import { getCategories } from '@/services/category-service'
import { getAttributeSet } from '@/services/attribute-set-service';
import { getAttributes } from '@/services/attributes-service';
import { getProduct } from '@/services/products-service';
import { getTaxes } from '@/services/settings-service';
import { getTags } from '@/services/tags-service';
import { getOptions } from '@/services/options-service';
import { useAtom } from 'jotai'
import {
    brandsAtom,
    categoriesAtom,
    attributeSetAtom,
    attributeAtom,
    productSetAtom,
    taxSetAtom,
    tagSetAtom,
    optionSetAtom
} from '@/store/DropdownItemStore'
import Item from 'antd/es/list/Item';
import { mapCategoriesToOptions } from '@/plugins/utils/category';

const { useBreakpoint } = Grid;

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const [optionBrands, setOptionBrands] = useAtom(brandsAtom)
    const [optionCategories, setOptionCategories] = useAtom(categoriesAtom)
    const [optionAttributeSet, setOptionAttributeSet] = useAtom(attributeSetAtom)
    const [optionAttribute, setOptionAttribute] = useAtom(attributeAtom)
    const [optionProduct, setOptionProduct] = useAtom(productSetAtom)
    const [optionTaxes, setOptionTaxes] = useAtom(taxSetAtom)
    const [optionTags, setOptionTags] = useAtom(tagSetAtom)
    const [optionSet, setOptionSet] = useAtom(optionSetAtom)

    useEffect(() => {
        const fetchData = async () => {
            const brands = await getBrands()
            const categories = await getCategories()
            const attributeSet = await getAttributeSet()
            const attributes = await getAttributes()
            const products = await getProduct()
            const taxes = await getTaxes()
            const tags = await getTags()
            const options = await getOptions()

            const brandOptions = brands.data.map((brand: any) => ({
                label: brand.name,
                value: brand.id
            }))

            // const categoryOptions = categories.data.map((category: any) => ({
            //     label: category.name,
            //     value: category.id,
            //     children: category.children
            // }))
            const categoryOptions: any = mapCategoriesToOptions(categories.data)
            console.log(categoryOptions)

            const attributeSetOption = attributeSet.data.map((attr: any) => ({
                label: attr.name,
                value: attr.id
            }))

            const attributeOption = attributes.data.map((attr: any) => ({
                label: attr.name,
                value: attr.id
            }))

            const productOption = products.data.map((product: any) => ({
                label: product.name,
                value: product.id
            }))

            const taxOption = taxes.data.map((tax: any) => ({
                label: tax.name,
                value: tax.id
            }))

            const tagsOption = tags.data.map((tag: any) => ({
                label: tag.name,
                value: tag.id
            }))

            const option = options.data.map((tag: any) => ({
                label: tag.name,
                value: tag.id
            }))
            setOptionBrands(brandOptions)
            setOptionCategories(categoryOptions)
            setOptionAttributeSet(attributeSetOption)
            setOptionAttribute(attributeOption)
            setOptionProduct(productOption)
            setOptionTaxes(taxOption)
            setOptionTags(tagsOption)
            setOptionSet(option)
        }

        fetchData()
    }, [setOptionBrands,
        setOptionCategories,
        setOptionAttributeSet,
        setOptionProduct,
        setOptionTaxes,
        setOptionTags,
        setOptionAttribute,
        setOptionSet
    ])
    //  className="pl-[250px] max-md:pl-0 transition-all duration-300"
    // <Layout>
    //         <HeaderLayout />
    //         <Layout hasSider>
    //             <Sidebar />
    //             <Layout>
    //                 {children}
    //             </Layout>
    //         </Layout>
    //     </Layout>
    return (
        <Layout hasSider>
            {/* {!isMobile && <Sidebar />} */}
            <Sidebar />
            <Layout >
                <HeaderLayout onOpenDrawer={() => setDrawerOpen(true)} />
                {children}
            </Layout>
            {/* {isMobile && (
                <Drawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    placement="left"
                    width={280}
                    bodyStyle={{ padding: 0 }}
                >
                    <Sidebar onClose={() => setDrawerOpen(false)} isMobile />
                </Drawer>
            )} */}
        </Layout>
    );
}
