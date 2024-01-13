
import { useEffect, useContext, useState } from 'react';
import { AdminContext } from 'contexts/admin';
import styles from './clientsPage.module.scss';
import { DisplayClient } from './DisplayClient';
import { Modal } from 'components/admin/modal/Modal';
import { NewClient } from './NewClient';
import { PageTop } from 'components/admin/pageTop/PageTop';
import { IDisplayClient } from 'interfaces';


export const ClientsPage = ({ staticClients }: { staticClients: IDisplayClient[] }) => {

    const { getClients, clients } = useContext(AdminContext);
    const [createClient, setCreateClient] = useState(false);

    // useEffect(() => {
    //     getClients();
    // }, [])

    return (
        <>
            <PageTop
                title='Clientes'
                button='crear cliente'
                action={() => setCreateClient(true)}
            />
            <section className={styles.clients} >
                {
                    clients.length
                        ?
                        clients.map((client) => (
                            <DisplayClient
                                key={client.phoneNumber}
                                client={client} />
                        ))
                        :
                        <p>No hay clientes para mostrar</p>
                }
            </section>
            <Modal
                close={() => { setCreateClient(false) }}
                show={createClient}
            >
                <NewClient close={() => { setCreateClient(false) }} />
            </Modal>
        </>
    )
}
