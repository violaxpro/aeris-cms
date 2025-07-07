import React from 'react'
import BrandsPage from "@/features/pages/catalogue/brands"
import { getBrands } from '@/services/brands-service'

export default async function BrandUrl() {
    let brands = []
    try {
        const res = await getBrands()
        brands = res.data
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <BrandsPage brandsData={brands} />
        </div>
    )
}

