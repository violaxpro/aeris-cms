import React from 'react'
import PriceLevelPage from "@/features/pages/catalogue/price-level"
import { getPriceLevel } from '@/services/price-level-service';
import { getCategories } from '@/services/category-service';
import { getBrands } from '@/services/brands-service';

export default async function PriceLevelUrl() {
  let priceLevels = [];
  try {
    const resPriceLevel = await getPriceLevel();
    if (resPriceLevel?.data?.length > 0) {
      const categoriesId = resPriceLevel.data.map((item: any) => item.categoriesId)
      const categoriesIdArray = Array.from(new Set(categoriesId))
      const resCategories = await Promise.all(
        categoriesIdArray.map((id: any) =>
          getCategories(id)
        )
      );
      const categories = resCategories.map((res: any) => {
        return res.data
      });

      const brandsId = resPriceLevel.data.map((item: any) => item.brandId)
      const brandsidArray = Array.from(new Set(brandsId))

      const resBrands = await Promise.all(
        brandsidArray.map((id: any) => getBrands(id))
      )

      const brands = resBrands ? resBrands.map((res: any) => res ? res.data : null) : null

      priceLevels = resPriceLevel.data.map((price: any) => {
        const matchedCategory = categories.flat().find(cat =>
          cat.id === price.categoryId
        );
        const matchedBrand = brands ? brands.find((brand) =>
          brand?.id === price.brandId
        ) : null
        return {
          ...price,
          category: matchedCategory || null,
          brand: matchedBrand || null
        };
      })
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }


  return (
    <div>
      <PriceLevelPage priceData={priceLevels} />
    </div>
  )

}


