import React from 'react'
import { GetServerSideProps } from 'next'
import { ClientPage } from 'components/admin/pages'
import { IClient } from 'interfaces'
import { getClient } from 'server/helpers/clients'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    const client = await getClient(id as string);

    return {
        props: {
            client: JSON.parse(JSON.stringify(client))
        }
    }
}

const Client = ({ client }: { client: IClient }) => {
    return (
        <ClientPage client={client} />
    )
}

export default Client