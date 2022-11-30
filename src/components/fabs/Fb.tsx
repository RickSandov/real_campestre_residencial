import { FacebookIcon } from 'components/icons'
import Link from 'next/link'
import styles from './index.module.scss'

export const FbFab = () => {
    return (
        <div
            className={`${styles.fab} ${styles.fb}`}
        >
            <a
                href="https://www.facebook.com/RealCampestreResidencial"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FacebookIcon />
            </a>
        </div>
    )
}
