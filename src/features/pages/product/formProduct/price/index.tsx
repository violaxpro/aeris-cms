import React, { useState } from 'react'
import PriceInformation from './PriceInformation'
import SupplierInformation from './SupplierInformation'
import KitPriceInformation from './KitPriceInformation'
import AdditionalShippingCost from './AdditionalShippingCost'
import { ChildFormProps } from '@/plugins/types/form-type'

const ProductPrice = ({
    onChange,
    dataById,
    formDataCreate
}: ChildFormProps) => {
    const handleChangePriceInformation = (updatedPrice: any) => {
        const data = {
            ...formDataCreate.tab_price,
            ...updatedPrice
        };
        onChange?.(data);
    };


    const handleChangeSupplierInformation = (updatedSupplier: any) => {
        const data = {
            ...formDataCreate,
            supplier_information: updatedSupplier
        }
        onChange?.(data);
    }

    const handleChangeKitPriceInformation = (updatedKitPrice: any) => {
        const data = {
            ...formDataCreate,
            kit_price_information: updatedKitPrice
        }
        onChange?.(data);

    }

    const handleChangeAdditionalShipping = (updatedAdditionalShipping: any) => {
        const data = {
            ...formDataCreate,
            additional_shipping: updatedAdditionalShipping
        }
        onChange?.(data);
    }

    return (
        <div>
            <PriceInformation
                onChange={handleChangePriceInformation}
                dataById={dataById}
                formDataCreate={formDataCreate}
            />
            <SupplierInformation
                onChange={handleChangeSupplierInformation}
                dataById={dataById}
            />
            <KitPriceInformation
                onChange={handleChangeKitPriceInformation}
                dataById={dataById}
            />
            <AdditionalShippingCost
                onChange={handleChangeAdditionalShipping}
                dataById={dataById}
            />

        </div>
    )
}

export default ProductPrice
