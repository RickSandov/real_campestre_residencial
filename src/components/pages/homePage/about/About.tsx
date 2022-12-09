import Image from 'next/image';
import styles from './about.module.scss';
import { motion } from 'framer-motion';
import { fadeIn } from 'utils/motion';

export const About = () => {
    return (
        <motion.main
            id='real'
            className={styles.about}
            variants={fadeIn('right', 'spring', 0, 1.5)}
            initial='hidden'
            whileInView='show'
            viewport={{
                once: true,
                amount: .20
            }}
        >
            <div className={styles.bg}>
                <div className={styles.wrapper}>
                    <Image src='/assets/about.png' alt='real campestre' layout='fill' objectFit='cover' />
                </div>
            </div>
            <motion.h1
                variants={fadeIn('up', 'spring', .5, 1.3)}
                initial='hidden'
                whileInView='show'
                viewport={{
                    once: true
                }}
            >Los mejores terrenos</motion.h1>
            <motion.p
                variants={fadeIn('up', 'spring', .6, 1.3)}
                initial='hidden'
                whileInView='show'
                viewport={{
                    once: true
                }}
            >
                Construye la casa de tus sueños en la zona con <strong>mayor plusvalía</strong> de la ciudad.
            </motion.p>
            <motion.a
                href='#plano'
                className={styles.button}
                variants={fadeIn('', 'spring', .7, 1.3)}
                initial='hidden'
                whileInView='show'
                viewport={{
                    once: true
                }}
            >
                Más información
            </motion.a>
        </motion.main>
    )
}
