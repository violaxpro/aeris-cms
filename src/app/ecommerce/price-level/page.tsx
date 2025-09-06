import React from 'react'
import PriceLevelPage from "@/features/pages/catalogue/price-level"
import { getPriceLevel } from '@/services/price-level-service';

export default async function PriceLevelUrl() {
  let priceLevels = { data: [], page: 1, perPage: 10, count: 0 };
  try {
    priceLevels = await getPriceLevel({ page: 1, perPage: 10 });
  } catch (error) {
    console.error('Fetch error:', error);
  }


  return (
    <div>
      <PriceLevelPage priceData={priceLevels} />
    </div>
  )

}


