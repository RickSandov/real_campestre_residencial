/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { ReviewType } from "./GoogleComments";

import styles from './index.module.scss';
import { fadeIn } from "utils/motion";


export default function Review({ review }: { review: ReviewType }) {

    const {
        relative_time_description,
        author_name,
        profile_photo_url,
        rating,
        text
    } = review;

    const [stars, setStars] = useState<number[]>([]);

    useEffect(() => {
        const tempStars = [];
        for (let i = 0; i < rating; i++) {
            tempStars.push(i + 1);
        }
        setStars(tempStars);
    }, [rating])

    return (
        <motion.div
            className={styles['reviews-slider__review']}
        >
            <div className={styles["reviews-slider__review__header"]}>
                <div className={styles["profile-pic"]}>
                    <Image width={50} height={50} src={profile_photo_url} alt={author_name} />
                </div>

                <div className={styles["profile-info"]}>
                    <p className={styles["profile-info__name"]}>
                        {author_name}
                    </p>
                    <span className={styles["profile-info__date"]}>
                        {relative_time_description}
                    </span>
                </div>

                <div className={styles["google-pic"]}>
                    <Image width={30} height={30} src='/assets/google.webp' alt="Google" />
                </div>
            </div>


            <div className={styles["reviews-slider__review__rating"]}>
                {
                    stars.map(index => (
                        <div key={index} className="star">
                            <Image width={15} height={15} src="/assets/star.webp" alt='*' />
                        </div>
                    ))
                }
            </div>

            <div className={styles["reviews-slider__review__text"]}>
                <p>{text}</p>
            </div>

        </motion.div>
    )
}
