import React, { useContext, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router';
import { AdminContext } from 'contexts/admin';
import { IClient, ILot } from 'interfaces'

import styles from './clientPage.module.scss';
import { prettyPhoneNumber } from 'helpers';
import { PageTop } from 'components/admin/pageTop/PageTop';
import { Modal } from 'components/admin/modal/Modal';
import { EditClient } from './EditClient';
import { EditLot } from '../planPage/editLot/EditLot';



export const ClientPage = ({ client, lots }: { client: IClient, lots: ILot[] }) => {
    const { setClientsRoute, getClient } = useContext(AdminContext);
    const [isEditClient, setIsEditClient] = useState(false);
    const [editLot, setEditLot] = useState(false);
    const { _id, phoneNumber, name, docs, registeredByName } = client;
    const router = useRouter();

    useEffect(() => {
        setClientsRoute(`clientes/${_id}`);
    }, [client.docs.length])

    const goBack = () => {
        setClientsRoute('clientes');
        Router.push('/admin/clientes')
    }

    const openEditClient = () => {
        setIsEditClient(true);
    }

    const closeEditClient = () => {
        getClient(String(_id));
        setIsEditClient(false);
        Router.replace(Router.asPath);
    };

    return (
        <>
            <Modal
                close={closeEditClient}
                show={isEditClient}
            >
                <EditClient close={closeEditClient} client={client} />
            </Modal>
            <Modal show={editLot} close={() => setEditLot(false)}>
                <EditLot cancel={() => {
                    setEditLot(false);
                    router.reload();
                }}
                />
            </Modal>
            <span
                className={`${styles.back} z-[110]`}
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
                <h2 className='text-4xl font-bold capitalize'>{name}</h2>
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
                    <h3 className='mb-6 text-4xl font-bold md:mb-10'>Documentos</h3>
                    {
                        docs.length ? (
                            <ul className='flex flex-wrap justify-start gap-4 gap-y-5'>
                                {
                                    docs.map(({ name, url }) => (
                                        <li key={url} className='px-6 py-2 font-bold text-white transition-colors cursor-pointer bg-rblue hover:bg-slate-600 hover:text-slate-200'>
                                            <a href={url} target="_blank" rel="noreferrer" >
                                                {name}
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : (
                            <p className='text-center' >Aún no tiene documentos registrados</p>
                        )
                    }
                </div>
            </div>

            {lots.length && (
                <div className='py-5 mt-8' >
                    <h3 className='mt-8 text-4xl font-bold font-body'>Lotes registrados</h3>
                    <ul className='mt-2' >
                        {lots.map((Lot) => (
                            <ClientLot key={Lot._id} lot={Lot} setEditLot={setEditLot} />
                        ))}
                    </ul>
                </div>
            )}
        </>

    )
}

function ClientLot({ lot, setEditLot }: { lot: ILot, setEditLot: (value: boolean) => void }) {

    const { _id, section, num, type, area, price, status } = lot;
    const { setSelectedLot } = useContext(AdminContext);

    return (
        <li
            key={_id}
            className={`${styles.lots} mt-10 mb-4 bg-white rounded-3xl shadow-card p-8 py-12 md:px-12`}
        >
            <h3 className='text-4xl font-bold font-body text-primary'>
                Lote {section} {num}
            </h3>
            <Item
                title='Tipo de Terreno'
                value={type}
            />
            <Item
                title='Área'
                value={area + 'm²'}
            />
            <Item
                title='Precio'
                value={'$' + price.toFixed(2).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
            <Item
                title='Estatus'
                value={status}
            />
            <div className='flex justify-center mt-5' >
                <button
                    className='py-5 text-2xl text-white rounded-lg px-7 bg-primary'
                    onClick={() => {
                        setSelectedLot(lot);
                        setEditLot(true);
                    }}
                >
                    editar lote
                </button>
            </div>
        </li>
    )
}

function Item({ title, value }: { title: string; value: string }) {
    return <p className={styles.infoItem} >{`${title}: `} <strong>{value}</strong> </p>
}