import { WaIcon } from 'components/icons'
import Link from 'next/link'
import styles from './index.module.scss'
import { motion } from 'framer-motion';
import { fabsVariants } from 'utils/motion';

export const WaFab = () => {
    return (
        <motion.div
            className={`${styles.fab} ${styles.wa}`}
            variants={fabsVariants(1.7)}
            initial='hidden'
            whileInView='show'
            viewport={{
                once: true
            }}
        >
            <a
                href="https://wa.me/+526182590909"
                target="_blank"
                rel="noreferrer"
            >
                <WaIcon />
            </a>
        </motion.div>
    )
}
