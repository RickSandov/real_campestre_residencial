import styles from './adminPlan.module.scss'
import { useContext } from 'react';
import { HomeLotsContext } from 'contexts';
import { EStatus, ETypes } from 'interfaces';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { getLotTypeKeyByValue } from 'helpers';
import { motion } from 'framer-motion';
import { fadeIn } from 'utils/motion';

const Item = ({ title, text, className }: { title: string; text: string; className?: string; }) => {
    return (
        <p className={className} >{title}:<strong>{text}</strong></p>
    )
}

export const InfoCard = () => {
    const { selectedLot } = useContext(HomeLotsContext);
    const [ref] = useAutoAnimate<HTMLDivElement>();

    return (
        <motion.section
            id='info-plano'
            ref={ref}
            className={styles.card}
            variants={fadeIn('left', 'spring', .2, 1.5)}
            initial='hidden'
            whileInView='show'
            viewport={{
                once: true,
                amount: .2
            }}
        >
            {
                !selectedLot ? (
                    <h4>Selecciona un terreno para ver su información</h4>
                ) : (() => {
                    const { area, num, type, status, price, section } = selectedLot;
                    const sold = status !== EStatus.available;
                    const Info = () => (
                        <>
                            <h4 className={sold ? styles.sold : styles.infoTitle} >
                                {sold ? 'Terreno vendido' : 'Resumen del Terreno'}
                            </h4>
                            <Item
                                title='Manzana'
                                text={section}
                            />
                            <Item
                                title='Lote número'
                                text={String(num)}
                            />
                            <Item
                                title='Tipo de Terreno'
                                text={String(type)}
                                className={styles[getLotTypeKeyByValue(type)]}
                            />
                            <Item
                                title='Área'
                                text={String(area) + 'm²'}
                            />
                            {
                                !sold && (
                                    <>
                                        {
                                            type !== ETypes.c && (
                                                <Item
                                                    title='Precio'
                                                    text={'$' + price.toFixed(2).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                />
                                            )
                                        }
                                        <a href='#contacto' className={styles.contact} >
                                            Contáctanos
                                        </a>
                                    </>
                                )
                            }
                        </>
                    )
                    return <Info />
                })()
            }
        </motion.section>
    )
}
