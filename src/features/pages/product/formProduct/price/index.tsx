import React from 'react'
import PriceInformation from './PriceInformation'
import SupplierInformation from './SupplierInformation'
import KitPriceInformation from './KitPriceInformation'
import AdditionalShippingCost from './AdditionalShippingCost'

const ProductPrice = () => {
    return (
        <div>
            <PriceInformation />
            <SupplierInformation />
            <KitPriceInformation />
            <AdditionalShippingCost />

        </div>
    )
}

export default ProductPrice
