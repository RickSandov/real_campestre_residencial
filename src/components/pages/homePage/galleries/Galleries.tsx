// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import styles from './galleries.module.scss';
import Image from "next/image";

export interface Gallery {
    name: string;
    images: string[];
}

const galleries: Gallery[] = [
    {
        name: 'pista',
        images: [
            '/assets/pista.png'
        ]
    },
    {
        name: 'área.común',
        images: [
            '/assets/comun.png'
        ]
    },
    {
        name: 'mini.golf',
        images: [
            '/assets/mini_golf.png'
        ]
    },
];

export const Galleries = () => {
    return (
        <section className={styles.container} >
            <h2>
                Galerías
            </h2>
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
                    galleries.map(({ name, images }) => {
                        const split = name.includes('.');
                        return (
                            <SwiperSlide key={name} className={styles.slide} >
                                <h4>
                                    {
                                        split ? name.split('.').map(span => (
                                            <span key={span} >{span}</span>
                                        )) : name
                                    }
                                </h4>
                                <div className={styles.image}>
                                    <Image src={images[0]} layout='fill' objectFit="cover" />
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </section>
    )
}
