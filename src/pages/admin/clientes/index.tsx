import React from 'react'
import { GetServerSideProps } from 'next'
import { ClientsPage } from 'components/admin/pages'
import { getDisplayClients } from 'server/helpers/clients';
import { verifyToken } from 'server/helpers/auth';
import { IDisplayClient } from 'interfaces';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const user = await verifyToken(ctx.req.cookies.auth as string || '');
    if (!user) {
        return {
            props: {}
        }
    }
    const clients = await getDisplayClients(user);

    return {
        props: {
            clients: JSON.parse(JSON.stringify(clients))
        }
    }
}

const Clients = ({ clients }: { clients: IDisplayClient[] }) => {
    return (
        <ClientsPage staticClients={clients} />
    )
}

export default Clients