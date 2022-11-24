import { CallIcon } from 'components/icons'
import Link from 'next/link'
import styles from './index.module.scss'

export const CallFab = () => {
    return (
        <div
            className={`${styles.fab} ${styles.call}`}
        >
            <Link
                href="tel:6182590909"
                target="_blank"
                rel="noopener noreferrer"
            >
                <a><CallIcon /></a>
            </Link>
        </div>
    )
}
