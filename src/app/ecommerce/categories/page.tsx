import React from 'react'
import CategoriesPage from '@/features/pages/catalogue/categories'
import { getCategories } from '@/services/category-service'

export default async function CategoriesUrl() {
    let categories = []
    try {
        const res = await getCategories()
        categories = res.data
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <CategoriesPage categories={categories} />
        </div>
    )
}

