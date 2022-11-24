import { motion } from "framer-motion"
import { Data } from "./GoogleComments";
import Review from './Review';

import styles from './index.module.scss';

const variants = {
    animated: {

    }
}



export default function ReviewsSlider({ reviews, rating, totalRatings }: Data) {

    return (
        <div
            className={styles["reviews-box"]}
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
                    <strong>Google</strong> rating: <u>{rating} de 5</u>, basado en <a href="https://g.page/OdontologiaFamiliar?share" target="_blank" rel="noreferrer" ><strong>{totalRatings} valoraciones</strong></a>
                </span>
            </div>

        </div>

    )
}
