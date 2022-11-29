import { useContext, useState } from 'react';
import { GalleryContext } from 'contexts/';
import { DownIcon } from 'components/icons';
import { Swiper as S } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Thumbs, Pagination } from 'swiper';

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

import styles from './index.module.scss';

export const GalleryFullScreen = () => {

    const { toggleIsFullScreen, activeGallery } = useContext(GalleryContext);

    return (
        <div className={styles.bg}>
            <button className={styles.close} onClick={toggleIsFullScreen} type='button'>&times;</button>
            <Swiper

                slidesPerView={1}
                breakpoints={{
                    768: {
                        // navigation: false
                    }
                }}
                navigation={true}
                modules={[Navigation,]}
                className={styles.gallery}
            >
                {
                    activeGallery?.images.map((image) => {
                        return (
                            <SwiperSlide key={image} className={styles.gallery} >

                                <img src={image} alt={activeGallery.name} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div >
    )
}
