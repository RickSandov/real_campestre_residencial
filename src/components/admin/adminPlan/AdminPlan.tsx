import { PlanSvg } from 'components/icons/PlanSvg'
import { lotType, ILot } from 'interfaces';
import { api } from 'lib';
import React, { useContext, useEffect, useState } from 'react'
import { AdminPlanLot } from './AdminPlanLot';
import { AdminInfoCard } from './AdminInfoCard';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { motion } from 'framer-motion';
import { fadeIn } from 'utils/motion';
import styles from './adminPlan.module.scss'
import { AdminContext } from 'contexts/admin';

export const AdminPlan = () => {

    // const [lots, setLots] = useState<ILot[]>([]);
    const { getLots, lots } = useContext(AdminContext);
    const [ref] = useAutoAnimate<HTMLDivElement>();

    useEffect(() => {
        if (!lots.length) {
            getLots();
        }
    }, []);

    return (
        <section
            id='plano'
            className={styles.plan} >
            <motion.div
                ref={ref}
                className={styles.graphic}
                variants={fadeIn('right', 'spring', .2, 1.5)}
                initial='hidden'
                whileInView='show'
                viewport={{
                    once: true,
                    amount: .2
                }}
            >
                <PlanSvg>
                    {
                        lots.map(lot => (
                            <AdminPlanLot key={lot._id} lot={lot} />
                        ))
                    }
                </PlanSvg>
                {/* {
                    !selectedLot && (
                        <div className={styles.selectLot} >
                            <p>Selecciona un terreno para ver su información</p>
                        </div>
                    )
                } */}
                <ul className={styles.types}>
                    {
                        Object.values(lotType).map((text, index) => {
                            const type = index === 0 ? 'a' : index === 1 ? 'b' : 'c'
                            return (
                                <li key={text} className={styles[type]} >
                                    <span></span>
                                    {text}
                                </li>
                            )
                        })
                    }
                    <li className={styles.sold} >
                        <span></span>
                        Vendido
                    </li>
                </ul>
            </motion.div>
        </section>
    )
}
