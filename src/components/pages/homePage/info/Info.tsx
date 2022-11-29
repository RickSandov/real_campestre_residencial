import { TopTitle } from 'components';
import Image from 'next/image';
import styles from './info.module.scss';

export const Info = () => {
    return (
        <section className={styles.container} >
            <div className={styles.info}>
                <TopTitle span='conoce el' title='desarrollo habitacional' />
                <ul>
                    <li>
                        <p>
                            <strong>7.381</strong> ha de superficie
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>4.391</strong> ha de espacio residencial
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>2.382</strong> ha de área de vialidad
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>0.607</strong> ha de superficie de área de donación
                        </p>
                    </li>
                </ul>
            </div>
            <aside>
                <div className={styles.image}>
                    <Image src='/assets/project.png' alt='proyecto' layout='fill' objectFit='cover' title='desarrollo habitacional' />
                </div>
            </aside>
        </section>
    )
}
