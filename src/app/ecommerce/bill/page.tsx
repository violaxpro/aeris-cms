import React from 'react'
import BillList from '@/features/pages/suppliers/billed'
import { getBill } from '@/services/billed-attribute';
import { billedDummy } from '@/plugins/types/suppliers-type';

export default async function BillPage() {
    let billed = []
    try {
        const res = await getBill()
        billed = res ? res.data : billedDummy
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <BillList billData={billed} />
        </div>
    )
}

