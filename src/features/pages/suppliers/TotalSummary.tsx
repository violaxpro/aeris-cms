import React from 'react';
import { formatCurrency } from '@/plugins/utils/utils';

type TotalSummaryProps = {
    profitHidden?: boolean;
    onReveal?: () => void;
    profit?: number;
    subtotal: number;
    shippingFee: number;
    discount: number;
    gstRate: number;
};


const TotalSummary: React.FC<TotalSummaryProps> = ({
    profitHidden = true,
    onReveal,
    profit = 456.97,
    subtotal,
    shippingFee,
    discount,
    gstRate,
}) => {
    const gst = subtotal * (gstRate / 100);
    const total = subtotal + shippingFee + gst - discount;

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

            <div className="flex justify-between mb-1">
                {/* <span>Tax ({(gstRate * 100).toFixed(0)}%)</span> */}
                <span>Tax ({gstRate}%)</span>
                <span>{formatCurrency(gst)}</span>
            </div>

            <hr className="my-2 border-gray-300" />

            <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
            </div>
        </div>
    );
};

export default TotalSummary;
