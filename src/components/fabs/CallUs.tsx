import { CallIcon } from 'components/icons'
import Link from 'next/link'
import styles from './index.module.scss'
import { motion } from 'framer-motion';
import { fabsVariants } from 'utils/motion';

export const CallFab = () => {
    return (
        <motion.div
            variants={fabsVariants(1.6)}
            initial='hidden'
            whileInView='show'
            viewport={{
                once: true
            }}
            className={`${styles.fab} ${styles.call}`}
        >
            <a
                href="tel:6182590909"
                target="_blank"
                rel="noopener noreferrer"
            >
                <CallIcon />
            </a>
        </motion.div>
    )
}
