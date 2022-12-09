

import { WaFab } from './Wa'
import styles from './index.module.scss'
import { CallFab } from './CallUs'
import { FbFab } from './Fb'
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from 'utils/motion';

export const FabIcons = () => {
    return (
        <motion.div
            variants={staggerContainer(.5, .2)}
            initial='hidden'
            whileInView='show'
            // viewport={{
            //     once: false
            // }}
            className={styles.container}>
            <FbFab />
            <CallFab />
            <WaFab />
        </motion.div>
    )
}

