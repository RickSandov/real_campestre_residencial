

import { WaFab } from './Wa'
import styles from './index.module.scss'
import { CallFab } from './CallUs'
import { FbFab } from './Fb'

export const FabIcons = () => {
    return (
        <div className={styles.container}>
            <FbFab />
            <CallFab />
            <WaFab />
        </div>
    )
}

