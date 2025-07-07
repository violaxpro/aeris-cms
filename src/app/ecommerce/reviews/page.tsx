import React from 'react'
import ReviewList from '@/features/pages/catalogue/reviews'
import { getReviews } from '@/services/review-service'

export default async function ReviewsPageUrl() {
    let reviews = []
    try {
        const res = await getReviews()
        reviews = res.data

    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <ReviewList reviewsData={reviews} />

        </div>
    )
}

