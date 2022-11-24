
import { Flower, LogoHandwrited, Triangle } from 'components/icons';
import Image from 'next/image';
import styles from './footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer} >
            <div className={styles.triangle}>
                <Triangle />
                <div className={styles.content}>
                    <p>un proyecto de</p>
                    <div className={styles.alfa}>
                        <Image src='/assets/alfa_baluarte.png' layout='fill' />
                    </div>
                </div>
            </div>
            <div className={styles.logo}>
                <Flower />
                <h2>
                    Real Campestre
                    <span>
                        Residencial
                    </span>
                </h2>
            </div>
            <div className={styles.contact}>
                <h3>Contacto</h3>
                <a href="tel:6182590909">Llámanos al <strong>618 259 0909</strong></a>
                <a href="mailto:contacto@realcampestredgo.com">contacto@<strong>realcampestreDGO.com</strong></a>
            </div>
            <div className={styles.bottom}>
                <p>Todos los derechos reservados © 2022</p>
                <LogoHandwrited fill='#B0C774' />
            </div>
        </footer>
    )
}
