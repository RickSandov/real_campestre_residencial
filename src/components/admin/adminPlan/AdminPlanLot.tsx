import { ILot } from 'interfaces'
import { api } from 'lib'
import React, { useRef, useEffect, MouseEvent, useMemo, useContext } from 'react'

import styles from './adminPlan.module.scss'
import { lotType, statusType } from 'interfaces';
import { AdminContext } from 'contexts/admin';

//styles on globals.scss

interface Props {
    lot: ILot
}

export const AdminPlanLot = ({ lot }: Props) => {

    const ref = useRef<SVGAElement>(null);
    const { setSelectedLot, selectedLot } = useContext(AdminContext);

    const isSelected = selectedLot?._id === lot._id;

    useEffect(() => {
        if (ref.current || (ref.current && selectedLot?._id === lot._id)) {
            ref.current.innerHTML += lot.xml;

            if (lot.status === statusType.reserved || lot.status === statusType.sold) {
                const color = lot.status === statusType.reserved ? styles.red : styles.black
                const roomBounds = ref.current.getBBox();
                const NS = ref.current.namespaceURI;

                const circle = document.createElementNS(NS, 'circle');
                circle.setAttribute("cx", String(roomBounds.x + roomBounds.width / 2));
                circle.setAttribute("cy", String(roomBounds.y + roomBounds.height / 2));
                circle.setAttribute("r", '4');
                circle.setAttribute('id', String(lot.num));
                circle.classList.add(styles.circle);
                circle.classList.add(color);
                ref.current.appendChild(circle);
            }
        }
    }, [lot.status])

    const onClick = (lot: ILot) => {

        if (document && window.innerWidth <= 1339) {
            document.getElementById('info-plano')?.scrollIntoView();
        }

        setSelectedLot(lot);
    }

    const colorClass = useMemo(() => lot.status === statusType.available ? (lot.type === lotType.a ? 'a' : lot.type === lotType.b ? 'b' : 'c') : null, [lot.status]);

    return (
        <g className={`lot ${colorClass || ''} ${isSelected ? 'active' : ''}`} ref={ref} onClick={() => onClick(lot)}>
            <title>{lot.status !== statusType.available ? 'Vendido' : `lote: ${lot.num}, manzana: ${lot.section}`}</title>
        </g>
    )
}
