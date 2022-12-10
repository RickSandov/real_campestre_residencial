
import { Flower } from 'components/icons';
import styles from './hero.module.scss';
import { DownIcon } from '../../../icons/Down';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn, navVariants, staggerContainer, zoomIn } from 'utils/motion';

export const Hero = () => {
    return (
        <motion.section
            id="inicio"
            className={styles.hero}
            variants={fadeIn('', 'spring', 0, 1)}
            initial='hidden'
            whileInView='show'
            viewport={{
                once: true
            }}
        >
            <motion.div
                className={styles.logo}
            // variants={staggerContainer(.3, .3)}
            // initial='hidden'
            // whileInView='show'
            // viewport={{
            //     once: true
            // }}
            >
                <motion.div
                    className={styles.icon}
                    variants={zoomIn(.2, .65)}
                    initial='hidden'
                    whileInView='show'
                    viewport={{
                        once: false,
                        amount: .25
                    }}
                >
                    <Flower />
                </motion.div>
                <motion.h2
                    variants={fadeIn('up', 'spring', .5, 1)}
                    initial='hidden'
                    whileInView='show'
                    viewport={{
                        once: false,
                        amount: .25
                    }}
                >
                    Real Campestre
                    <motion.span
                        variants={fadeIn('up', 'spring', .6, 1)}
                        initial='hidden'
                        whileInView='show'
                        viewport={{
                            once: false,
                            amount: .25
                        }}
                    >
                        Residencial
                    </motion.span>
                </motion.h2>
            </motion.div>
            <motion.div
                className={styles.bottom}
                variants={fadeIn('left', 'spring', 1, 1)}
                initial='hidden'
                whileInView='show'
                viewport={{
                    once: false
                }}>
                <p><a href="#real">Conoce el proyecto</a></p>
                <a href="#real">
                    <DownIcon />
                </a>
            </motion.div>
        </motion.section>
    )
}
