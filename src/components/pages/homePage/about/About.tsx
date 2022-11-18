import Image from 'next/image';
import styles from './about.module.scss';

export const About = () => {
    return (
        <main className={styles.about} >
            <div className={styles.bg}>
                <div className={styles.wrapper}>
                    <Image src='/assets/about.png' alt='real campestre' layout='fill' objectFit='cover' />
                </div>
            </div>
            <h1>Los mejores terrenos</h1>
            <p>
                Construye la casa de tus sueños en la zona con <strong>mayor plusvalía</strong> de la ciudad.
            </p>
            <button type='button' className={styles.button} >
                Más información
            </button>
        </main>
    )
}
