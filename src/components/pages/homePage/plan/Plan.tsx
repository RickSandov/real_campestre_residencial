import { PlanSvg } from 'components/icons/PlanSvg'
import { ETypes, ILot } from 'interfaces';
import { api } from 'lib';
import React, { useEffect, useState } from 'react'
import { PlanLot } from './PlanLot';

import styles from './plan.module.scss'
import { InfoCard } from './InfoCard';

export const Plan = () => {

    const [lots, setLots] = useState<ILot[]>([]);

    useEffect(() => {
        if (!lots.length) {
            try {
                api.get<{ lots: ILot[] }>('lots').then(res => {
                    setLots(res.data.lots)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }, []);

    return (
        <section id='plano' className={styles.plan} >
            <div className={styles.graphic}>
                <PlanSvg>
                    {
                        lots.map(lot => (
                            <PlanLot key={lot._id} lot={lot} />
                        ))
                    }
                </PlanSvg>
                <ul className={styles.types}>
                    {
                        Object.values(ETypes).map((text, index) => {
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
            </div>
            <InfoCard />
        </section>
    )
}
