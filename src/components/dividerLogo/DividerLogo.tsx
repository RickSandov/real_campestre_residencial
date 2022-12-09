import { LogoHandwrited } from 'components';
import styles from './dividerLogo.module.scss';
import { motion } from 'framer-motion';
import { fadeIn } from 'utils/motion';

export const DividerLogo = () => {
    return (
        <div className={styles.divider}>
            <motion.div
                variants={fadeIn('right', 'spring', .2, 1)}
                initial='hidden'
                whileInView='show'
                viewport={{
                    once: true,
                    amount: .2
                }}
            >
                <LogoHandwrited fill='#B0C774' />
            </motion.div >
        </div>
    )
}
