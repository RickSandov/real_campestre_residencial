

import { WaFab } from './Wa'
import styles from './index.module.scss'
import { CallFab } from './CallUs'

export const FabIcons = () => {
    return (
        <div className={styles.container}>
            <CallFab />
            <WaFab />
        </div>
    )
}

