import { useContext } from 'react';
import { lotType, statusType } from 'interfaces';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { getLotTypeKeyByValue } from 'helpers';
import { motion } from 'framer-motion';
import { fadeIn } from 'utils/motion';
import { AdminContext } from 'contexts/admin';
import styles from './adminPlan.module.scss'

const Item = ({ title, text, className }: { title: string; text: string; className?: string; }) => {
    return (
        <p className={className} >{title}:<strong>{text}</strong></p>
    )
}

export const AdminInfoCard = ({ setEditLot }: { setEditLot: (value: boolean) => void }) => {
    const { selectedLot } = useContext(AdminContext);

    return (
        <motion.section
            id='info-plano'
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
                    // const sold = status !== statusType.available;
                    const statusMessage =
                        status === statusType.available ? 'Resumen del Terreno'
                            : status === statusType.reserved ? 'Terreno reservado'
                                : status === statusType.sold ? 'Terreno vendido' : 'Terreno pagado'


                    const Info = () => (
                        <>
                            <h4 className={status === statusType.sold ? styles.sold : styles.infoTitle} >
                                {statusMessage}
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

                            <Item
                                title='Precio'
                                text={'$' + price.toFixed(2).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            />

                            <Item
                                title='Estatus'
                                text={status}
                            />

                            <button className={styles.edit} onClick={() => setEditLot(true)} >
                                Actualizar información
                            </button>
                        </>
                    )
                    return <Info />
                })()
            }
        </motion.section>
    )
}
