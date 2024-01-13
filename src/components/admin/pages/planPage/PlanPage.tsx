import { AdminPlan } from 'components/admin/adminPlan';
import { AdminInfoCard } from 'components/admin/adminPlan/AdminInfoCard';
import { Modal } from 'components/admin/modal/Modal';
import React, { useState } from 'react'
import { EditLot } from './editLot/EditLot';

export const PlanPage = () => {
    const [editLot, setEditLot] = useState(false);

    return (
        <>
            <AdminPlan />
            <AdminInfoCard setEditLot={setEditLot} />
            <Modal show={editLot} close={() => setEditLot(false)}>
                <EditLot cancel={() => setEditLot(false)} />
            </Modal>
        </>
    )
}
