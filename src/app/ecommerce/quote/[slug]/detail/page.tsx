import React from 'react'
import DetailQuote from '@/features/pages/sales/quote/DetailQuote'
import { Params } from '@/plugins/types'
import { quoteDummyData } from '@/plugins/types/sales-type';

export default async function DetailQuotePage(props: { params: Params }) {
    const params = await props.params;
    const slug = params.slug;
    console.log('ini slu', params, slug)
    let data
    try {

        const dataByid = quoteDummyData.find((item) => {
            return item.quote_number === slug
            // if (item.id) {
            //     console.log('masuk')
            //     return item.id === Number(slug)
            // } if (item.quote_number) {
            //     console.log('ini else', item.quote_number === slug)
            //     return item.quote_number === slug
            // }
        })
        data = dataByid
    } catch (error) {

    }

    return (
        <div>
            <DetailQuote slug={slug} data={data} />
        </div>
    )
}


