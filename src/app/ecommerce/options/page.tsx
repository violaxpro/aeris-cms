import React from 'react'
import OptionsList from '@/features/pages/catalogue/options'
import { getOptions } from '@/services/options-service'

export default async function OptionsPage() {
    let options = { data: [], page: 1, perPage: 10, count: 0 }
    try {
        options = await getOptions({ page: 1, perPage: 10 })
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <OptionsList optionsData={options} />

        </div>
    )
}


