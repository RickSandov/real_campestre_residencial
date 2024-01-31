import { AdminPlan } from 'components/admin/adminPlan';
import { AdminInfoCard } from 'components/admin/adminPlan/AdminInfoCard';
import { Modal } from 'components/admin/modal/Modal';
import React, { useState } from 'react'
import { EditLot } from './editLot/EditLot';
import { SetBuyer } from './set-buyer/set-buyer';

export const PlanPage = () => {
    const [editLot, setEditLot] = useState(false);
    const [setBuyer, setSetBuyer] = useState(false);

    return (
        <>
            <AdminPlan />
            <AdminInfoCard setEditLot={setEditLot} setBuyer={setSetBuyer} />
            <Modal show={editLot} close={() => setEditLot(false)}>
                <EditLot cancel={() => setEditLot(false)} />
            </Modal>
            <Modal show={setBuyer} close={() => setSetBuyer(false)}>
                <SetBuyer cancel={() => setSetBuyer(false)} />
            </Modal>
        </>
    )
}
