
import { useEffect, useState } from 'react';
import ReviewsSlider from './ReviewsSlide';

export interface ReviewType {
    author_name: string,
    author_url: string,
    language: string,
    profile_photo_url: string,
    rating: number,
    relative_time_description: string,
    text: string,
    time: number
}

export interface Data {
    reviews: ReviewType[],
    rating: string,
    totalRatings: string
}


export const GoogleComments = () => {

    const [data, setData] = useState<Data>({
        reviews: [],
        rating: "",
        totalRatings: ""
    });

    useEffect(() => {

        const getReviews = async () => {
            const res = await fetch('./api/reviews');
            const data = await res.json();

            setData(data);
        }

        getReviews();
    }, [])


    return (
        <>
            <section
                id="reviews"
            >
                <ReviewsSlider reviews={data.reviews} rating={data.rating} totalRatings={data.totalRatings} />
            </section>
        </>
    )
}
