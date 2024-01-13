import React, { useContext, useEffect, useState } from 'react'
import Router from 'next/router';
import { AdminContext } from 'contexts/admin';
import { IClient } from 'interfaces'

import styles from './clientPage.module.scss';
import { prettyPhoneNumber } from 'helpers';
import { PageTop } from 'components/admin/pageTop/PageTop';
import { Modal } from 'components/admin/modal/Modal';
import { EditClient } from './EditClient';



export const ClientPage = ({ client }: { client: IClient }) => {

    const { setClientsRoute, setEditClient, clearEditClient } = useContext(AdminContext);

    const { _id, name, phoneNumber, registeredByName, docs } = client;

    const [isEditClient, setIsEditClient] = useState(false);

    useEffect(() => {
        setClientsRoute(`clientes/${_id}`)
    }, [])

    const goBack = () => {
        setClientsRoute('clientes');
        Router.push('/admin/clientes')
    }

    const openEditClient = () => {
        setEditClient(client);
        setIsEditClient(true);
    }

    const closeEditClient = () => setIsEditClient(false);

    return (
        <>
            <Modal
                close={closeEditClient}
                show={isEditClient}
            >
                <EditClient close={closeEditClient} client={client} />
            </Modal>
            <span
                className={styles.back}
                onClick={goBack}
            >
                {'< Clientes'}
            </span>
            <PageTop
                title='Cliente'
                button='editar cliente'
                action={() => openEditClient()}
                className={styles.top}
            />
            <div className={styles.container} >
                <h2>{name}</h2>
                <Item
                    title='Número de contacto'
                    value={prettyPhoneNumber(phoneNumber)}
                />
                <Item
                    title='Registrado por'
                    value={registeredByName}
                />
            </div>
            <div className={styles.container}>
                <div className={styles.docs}>
                    <h3>Documentos</h3>
                    {
                        docs.length
                            ?
                            ''
                            :
                            <p className={styles.empty} >Aún no hay documentos</p>
                    }
                </div>
            </div>
        </>

    )
}

function Item({ title, value }: { title: string; value: string }) {
    return <p className={styles.infoItem} >{`${title}: `} <strong>{value}</strong> </p>
}