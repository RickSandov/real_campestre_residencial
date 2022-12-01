import { Flower, LogoHandwrited } from 'components/icons';
import Image from 'next/image';
import styles from './services.module.scss';

interface Service {
    src: string;
    title: string;
    text: string;
}

const services: Service[] = [
    {
        src: '/assets/golf.png',
        title: 'mini golf',
        text: 'Área de mini golf para toda la familia'
    },
    {
        src: '/assets/electric-meter.png',
        title: 'servicios subtarráneos',
        text: 'Todos nuestros servicios cuentan con instalación subterránea'
    },
    {
        src: '/assets/shield.png',
        title: 'Seguridad',
        text: 'Acceso controlado 24/7. Servicio de seguridad privada'
    },
    {
        src: '/assets/playground.png',
        title: 'Áreas infantiles',
        text: 'Contamos con juegos, áreas infantiles y canchas de usos múltiples'
    },
    {
        src: '/assets/park.png',
        title: 'Amenidades',
        text: 'Áreas verdes y pista para correr'
    },
    {
        src: '/assets/road.png',
        title: 'Pavimeto Nuevo',
        text: 'Acceso recién pavimentado'
    },

]

export const Services = () => {
    return (
        <section className={styles.container} >
            <div className={styles.bg}>
                <Flower fill='#E7EBEA' />
            </div>
            <h2>
                Conoce
                <LogoHandwrited />
            </h2>
            <div className={styles.services}>
                {
                    services.map(({ src, title, text }) => (
                        <article className={styles.service} key={src} >
                            <div className={styles.image}>
                                <Image src={src} alt={title} layout='fill' objectFit='cover' title={title} />
                            </div>
                            <hr />
                            <h3>{title}</h3>
                            <p>
                                {text.split('.').map(span => (
                                    <span key={span}>
                                        {span}
                                    </span>
                                ))}
                            </p>
                        </article>
                    ))
                }
            </div>
        </section>
    )
}
