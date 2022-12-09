import { TopTitle } from 'components';
import Image from 'next/image';
import styles from './info.module.scss';
import { motion } from 'framer-motion';
import { fadeIn } from 'utils/motion';

export const Info = () => {
    return (
        <section className={styles.container} >
            <motion.div
                className={styles.info}
                variants={fadeIn('right', 'spring', .2, 1)}
                initial='hidden'
                whileInView='show'
                viewport={{
                    once: true,
                    amount: .2
                }}
            >
                <TopTitle span='conoce el' title='desarrollo habitacional' />
                <ul>
                    <motion.li
                        variants={fadeIn('up', 'spring', .3, .8)}
                        initial='hidden'
                        whileInView='show'
                        viewport={{
                            once: true,
                            amount: .2
                        }}
                    >
                        <p>
                            <strong>7.381</strong> ha de superficie
                        </p>
                    </motion.li>
                    <motion.li
                        variants={fadeIn('up', 'spring', .4, .8)}
                        initial='hidden'
                        whileInView='show'
                        viewport={{
                            once: true,
                            amount: .2
                        }}
                    >
                        <p>
                            <strong>4.391</strong> ha de espacio residencial
                        </p>
                    </motion.li>
                    <motion.li
                        variants={fadeIn('up', 'spring', .5, .8)}
                        initial='hidden'
                        whileInView='show'
                        viewport={{
                            once: true,
                            amount: .2
                        }}
                    >
                        <p>
                            <strong>2.382</strong> ha de área de vialidad
                        </p>
                    </motion.li>
                    <motion.li
                        variants={fadeIn('up', 'spring', .6, .8)}
                        initial='hidden'
                        whileInView='show'
                        viewport={{
                            once: true,
                            amount: .2
                        }}
                    >
                        <p>
                            <strong>0.607</strong> ha de superficie de área de donación
                        </p>
                    </motion.li>
                </ul>
            </motion.div>
            <motion.aside
                variants={fadeIn('left', 'spring', .2, 1)}
                initial='hidden'
                whileInView='show'
                viewport={{
                    once: true,
                    amount: .2
                }}
            >
                <div className={styles.image}>
                    <Image src='/assets/project.png' alt='proyecto' layout='fill' objectFit='cover' title='desarrollo habitacional' />
                </div>
            </motion.aside>
        </section>
    )
}
