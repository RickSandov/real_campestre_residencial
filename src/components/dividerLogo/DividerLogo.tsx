import { LogoHandwrited } from 'components';
import styles from './dividerLogo.module.scss';

export const DividerLogo = () => {
    return (
        <div className={styles.divider}>
            <LogoHandwrited fill='#B0C774' />
        </div >
    )
}
