import React from 'react'
import QuoteList from '@/features/pages/sales/quote'
import { quoteDummyData } from '@/plugins/types/sales-type'

export default async function QuotePage() {

    let data = []
    return (
        <div>
            <QuoteList quoteData={quoteDummyData} />
        </div>
    )
}

