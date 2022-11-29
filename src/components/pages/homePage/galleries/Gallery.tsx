import { GalleryContext } from 'contexts'
import { IGalleryS } from 'interfaces'
import Image from 'next/image'
import React, { useContext } from 'react'
import { SwiperSlide } from 'swiper/react'
import styles from './galleries.module.scss'

export const Gallery = ({ gallery }: { gallery: IGalleryS }) => {
    const split = gallery.name.includes('.');
    const { name, images } = gallery;
    const { setActiveGallery } = useContext(GalleryContext);
    return (
        <SwiperSlide className={styles.slide} onClick={() => setActiveGallery(gallery)} >
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
}
