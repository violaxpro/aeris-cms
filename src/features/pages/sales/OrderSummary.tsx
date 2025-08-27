import React from 'react';
import { formatCurrency } from '@/plugins/utils/utils';

type OrderSummaryProps = {
    profitHidden?: boolean;
    onReveal?: () => void;
    profit?: number;
    subtotal: number;
    shippingFee: number;
    discount: number;
    taxAmount: number;
    taxType?: string
};


const OrderSummary: React.FC<OrderSummaryProps> = ({
    profitHidden = true,
    onReveal,
    profit = 0,
    subtotal,
    shippingFee,
    discount,
    taxAmount,
    taxType
}) => {
    // const gst = subtotal * (gstRate / 100);
    const totalTax = Number(taxAmount)
    let total = 0
    if (taxType == 'TAX-EXCLUSIVE') {
        total = Number(subtotal) + Number(shippingFee) + totalTax - Number(discount);
    } else if (taxType == 'TAX-INCLUSIVE' || taxType == 'NO-TAX' || taxType == '') {
        total = Number(subtotal) + Number(shippingFee) - Number(discount);
    }

    return (
        <div className="text-sm text-black max-w-xs">
            <div className="flex justify-between mb-1">
                <span>Profit</span>
                {profitHidden ? (
                    <button onClick={onReveal} className="text-[#3666AA] font-medium cursor-pointer">
                        Reveal
                    </button>
                ) : (
                    <span onClick={onReveal} className='cursor-pointer'>{formatCurrency(profit)}</span>
                )}
            </div>

            <div className="flex justify-between mb-1">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between mb-1">
                <span>Shipping Fee</span>
                <span>{formatCurrency(shippingFee)}</span>
            </div>

            <div className="flex justify-between mb-1">
                <span>Discount</span>
                <span>{formatCurrency(discount)}</span>
            </div>

            {
                (taxType == 'TAX-EXCLUSIVE' || taxType == 'TAX-INCLUSIVE')
                && <div className="flex justify-between mb-1">
                    <span>{taxType == 'TAX-EXCLUSIVE' ? 'Total GST or Income' : 'Include GST or Income'}</span>
                    <span>{formatCurrency(totalTax)}</span>
                </div>
            }

            <hr className="my-2 border-gray-300" />

            <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
            </div>
        </div>
    );
};

export default OrderSummary;
