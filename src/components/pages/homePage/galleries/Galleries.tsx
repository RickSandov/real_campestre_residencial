// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import styles from './galleries.module.scss';
import Image from "next/image";
import { useContext } from "react";
import { GalleryContext } from "contexts";
import { IGalleryS } from "interfaces";
import { motion } from 'framer-motion';
import { fadeIn } from "utils/motion";

export interface Gallery {
    name: string;
    images: string[];
}

const galleries: Gallery[] = [
    {
        name: 'pista',
        images: [
            '/assets/pista.png',
            '/assets/pista1.jpeg',
            '/assets/pista2.jpeg',
            '/assets/pista3.jpeg',
        ]
    },
    {
        name: 'mini.golf',
        images: [
            '/assets/mini_golf.png',
            '/assets/golf1.jpeg',
            '/assets/golf2.jpeg',
            '/assets/golf3.jpeg',
            '/assets/golf4.jpeg',
        ]
    },
    {
        name: 'acceso',
        images: [
            '/assets/fachada.jpeg',
            '/assets/fachada1.jpeg',
            '/assets/fachada2.jpeg',
        ]
    },
    {
        name: 'área.común',
        images: [
            '/assets/comun.png'
        ]
    },

];

export const Galleries = () => {
    const { setActiveGallery } = useContext(GalleryContext);

    const onClick = (gallery: IGalleryS) => {
        setActiveGallery(gallery);
    }

    return (
        <section className={styles.container} >
            <motion.h2
                variants={fadeIn('right', 'spring', .2, 1)}
                initial='hidden'
                whileInView='show'
                viewport={{
                    once: true,
                    amount: .2
                }}
            >
                Galerías
            </motion.h2>
            <motion.div
                variants={fadeIn('up', 'spring', .5, 1.5)}
                initial='hidden'
                whileInView='show'
                viewport={{
                    once: true,
                    amount: .2
                }}
            >
                <Swiper
                    // slidesPerView={3}
                    // spaceBetween={0}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className={styles.galleries}
                >
                    {
                        galleries.map((g) => {
                            const { name, images } = g;
                            const split = name.includes('.');

                            return (
                                <SwiperSlide key={name} className={styles.slide} onClick={() => onClick(g)} >
                                    <h4>
                                        {
                                            split ? name.split('.').map(span => (
                                                <span key={span} >{span}</span>
                                            )) : name
                                        }
                                    </h4>
                                    <div className={styles.image}>
                                        <Image alt={name} src={images[0]} layout='fill' objectFit="cover" />
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </motion.div>
        </section >
    )
}