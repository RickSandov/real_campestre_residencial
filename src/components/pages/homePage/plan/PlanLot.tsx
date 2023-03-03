import { ILot } from 'interfaces'
import { api } from 'lib'
import React, { useRef, useEffect, MouseEvent, useMemo, useContext } from 'react'

import styles from './plan.module.scss'
import { ETypes, EStatus } from 'interfaces';
import { HomeLotsContext } from 'contexts';

//styles on globals.scss

interface Props {
    lot: ILot
}

export const PlanLot = ({ lot }: Props) => {

    const ref = useRef<SVGAElement>(null);
    const { setSelectedLot, selectedLot } = useContext(HomeLotsContext);

    const isSelected = selectedLot?._id === lot._id;

    useEffect(() => {
        if (ref.current) {
            ref.current.innerHTML += lot.xml;
        }
    }, [])

    const onClick = (lot: ILot) => {

        if (document && window.innerWidth <= 1339) {
            document.getElementById('info-plano')?.scrollIntoView();
        }

        setSelectedLot(lot);

        // console.log(lot);
        // const section = 'j';

        // // const area = prompt('area');
        // // const num = prompt('numero');
        // // const type = ETypes.c;
        // // const typePrice = 3400;
        // // const typePrice = 3700;
        // // const typePrice = 4000;

        // // Tipo a precio 3400
        // // Tipo b precio 3700

        // // const status = EStatus.payed;
        // // const price = Number(area) * typePrice;
        // const lotInfo = {
        //     section,
        //     // num,
        //     // price,
        //     // area,
        //     // type,
        //     // status,
        //     _id: lot._id
        // }
        // api.patch('lots', {
        //     lot: lotInfo
        // }).then(res => {
        //     console.log(res.status)
        // })
    }

    const colorClass = useMemo(() => lot.status === EStatus.available ? (lot.type === ETypes.a ? 'a' : lot.type === ETypes.b ? 'b' : 'c') : null, []);

    return (
        <g className={`lot ${colorClass || ''} ${isSelected ? 'active' : ''}`} ref={ref} onClick={() => onClick(lot)}>
            <title>{lot.status !== EStatus.available ? 'Vendido' : `lote: ${lot.num}, manzana: ${lot.section}`}</title>
            {/* <circle cx="510.95001220703125" cy="124.95000457763672" r="5" className="circle"></circle> */}
        </g>
    )
}
