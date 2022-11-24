
import { Flower } from 'components/icons';
import styles from './hero.module.scss';
import { DownIcon } from '../../../icons/Down';
import Head from 'next/head';
import Link from 'next/link';

export const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.logo}>
                <Flower />
                <h2>
                    Real Campestre
                    <span>
                        Residencial
                    </span>
                </h2>
            </div>
            <div className={styles.bottom}>
                <p>Conoce el proyecto</p>
                <DownIcon />
            </div>
        </div>
    )
}
