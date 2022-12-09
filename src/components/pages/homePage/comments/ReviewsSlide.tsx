import { motion } from "framer-motion"
import { Data } from "./GoogleComments";
import Review from './Review';

import styles from './index.module.scss';
import { fadeIn } from "utils/motion";

const variants = {
    animated: {

    }
}



export default function ReviewsSlider({ reviews, rating, totalRatings }: Data) {

    return (
        <motion.div
            className={styles["reviews-box"]}
            variants={fadeIn('up', 'spring', .3, 1.5)}
            initial='hidden'
            whileInView='show'
            viewport={{
                once: true,
                amount: .2
            }}
        >
            <motion.div
                className={styles['reviews-slider']}>
                {
                    reviews && reviews.map(review => (
                        <Review
                            key={review.author_url}
                            review={review} />
                    ))
                }
            </motion.div>

            <div className={styles["reviews-bottom"]}>
                <span>
                    <strong>Google</strong> rating: <u>{rating} de 5</u>, basado en <a href="https://goo.gl/maps/nEbeRpDbVTDDwk4Y8" target="_blank" rel="noreferrer" ><strong>{totalRatings} valoraciones</strong></a>
                </span>
            </div>

        </motion.div>

    )
}
