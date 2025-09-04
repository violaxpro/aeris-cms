import React from 'react'
import BrandsPage from "@/features/pages/catalogue/brands"
import { getBrands } from '@/services/brands-service'

export default async function BrandUrl() {
    let brands = { data: [], page: 1, perPage: 10, count: 0 }
    try {
        brands = await getBrands({ page: 1, perPage: 10 })
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <BrandsPage brandsData={brands} />
        </div>
    )
}

