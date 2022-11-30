import { WaIcon } from 'components/icons'
import Link from 'next/link'
import styles from './index.module.scss'

export const WaFab = () => {
    return (
        <div
            className={`${styles.fab} ${styles.wa}`}
        >
            <a
                href="https://wa.me/+526182590909"
                target="_blank"
                rel="noreferrer"
            >
                <WaIcon />
            </a>
        </div>
    )
}
