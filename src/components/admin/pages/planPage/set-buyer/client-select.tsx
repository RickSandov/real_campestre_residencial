import React from 'react'
import { TClient } from './set-buyer'
import { prettyPhoneNumber } from 'helpers';


export const ClientSelect = ({ client, isSelected, setSelected }: { client: TClient, isSelected: boolean, setSelected: (client: TClient) => void }) => {
    const { name, phoneNumber } = client;

    return (
        <button onClick={() => setSelected(client)} className={`bg-blue-100 px-10 py-2 rounded-md border-2 border-text  transition-colors hover:bg-primary hover:text-white hover:shadow-md text-3xl ${isSelected ? 'bg-primary text-white' : ''}`}>
            <p className='capitalize font-bold text-2xl'>{name}</p>
            {prettyPhoneNumber(phoneNumber)}
        </button>
    )
}
