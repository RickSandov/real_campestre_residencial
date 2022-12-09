import { TopTitle } from 'components/topTitle';
import { ContactForm } from './ContactForm';
import styles from './visitUs.module.scss';
import { motion } from 'framer-motion';
import { fadeIn } from 'utils/motion';

export const VisitUs = () => {
    return (
        <motion.section
            id='visitanos'
            className={styles.container}
            variants={fadeIn('left', 'spring', .2, 1.5)}
            initial='hidden'
            whileInView='show'
            viewport={{
                once: true,
            }}
        >
            <TopTitle alignment='center' span='visítanos' title='conoce tu nuevo fraccionamiento' />
            <motion.div
                className={styles.map}
                variants={fadeIn('up', 'spring', .8, 1.5)}
                initial='hidden'
                whileInView='show'
                viewport={{
                    once: true,
                    amount: .2
                }}
            >
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58317.22533782508!2d-104.68638490112227!3d24.001900123161327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bb934d0a50865%3A0xd2e22a1f6972129e!2sFraccionamiento%20Real%20Campestre%20Residencial!5e0!3m2!1ses-419!2smx!4v1668724681493!5m2!1ses-419!2smx"
                    // width="800"
                    // height="600"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" />
            </motion.div>
            <ContactForm />
        </motion.section>
    )
}
