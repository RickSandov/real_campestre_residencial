import React from 'react'
import { GetServerSideProps } from 'next'
import { ClientPage } from 'components/admin/pages'
import { IClient, ILot } from 'interfaces'
import { getClient, getClientWithLots } from 'server/helpers/clients'
import { getLotsByClientId } from 'server/helpers/lots'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    const client = await getClient(id as string);
    const lots = await getLotsByClientId(id as string);

    return {
        props: {
            client: JSON.parse(JSON.stringify(client)),
            lots: JSON.parse(JSON.stringify(lots))
        }
    }
}

const Client = ({ client, lots }: { client: IClient, lots: ILot[] }) => {
    return (
        <ClientPage client={client} lots={lots} />
    )
}

export default Client