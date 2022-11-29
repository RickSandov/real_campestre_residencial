import { FacebookIcon } from 'components/icons'
import Link from 'next/link'
import styles from './index.module.scss'

export const FbFab = () => {
    return (
        <div
            className={`${styles.fab} ${styles.fb}`}
        >
            <Link
                href="https://www.facebook.com/RealCampestreResidencial"
                target="_blank"
                rel="noopener noreferrer"
            >
                <a><FacebookIcon /></a>
            </Link>
        </div>
    )
}
