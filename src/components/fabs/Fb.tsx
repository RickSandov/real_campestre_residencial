import { FacebookIcon } from 'components/icons'
import Link from 'next/link'
import styles from './index.module.scss'
import { motion } from 'framer-motion';
import { fabsVariants, fadeIn } from 'utils/motion';

export const FbFab = () => {
    return (
        <motion.div
            variants={fabsVariants(1.7)}
            initial='hidden'
            whileInView='show'
            viewport={{
                once: true
            }}
            className={`${styles.fab} ${styles.fb}`}
        >
            <a
                href="https://www.facebook.com/RealCampestreResidencial"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FacebookIcon />
            </a>
        </motion.div>
    )
}
