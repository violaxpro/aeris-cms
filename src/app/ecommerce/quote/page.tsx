import React from 'react'
import QuoteList from '@/features/pages/sales/quote'
import { quoteDummyData } from '@/plugins/types/sales-type'
import { getQuote } from '@/services/quote-service'

export default async function QuotePage() {

    let data = []
    try {
        const res = await getQuote()
        if (res.data) {
            data = res.data
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <QuoteList quoteData={data} />
        </div>
    )
}

