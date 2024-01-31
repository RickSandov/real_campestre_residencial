import React, { useContext } from 'react'
import Router from 'next/router';
import { IDisplayClient } from 'interfaces'
import styles from './displayClient.module.scss';
import { AdminContext } from 'contexts/admin';
import { prettyPhoneNumber } from 'helpers';

export const DisplayClient = ({ client }: { client: IDisplayClient }) => {

    const { name, phoneNumber, registeredByName, _id } = client;

    const handleClick = () => {
        Router.push(`/admin/clientes/${_id}`);
    }

    return (
        <div
            className={`${styles.client} capitalize`}
            onClick={handleClick}
        >
            <h3>{name}</h3>
            <p>
                {
                    prettyPhoneNumber(phoneNumber)
                }
            </p>
            <span>{registeredByName}</span>
        </div>
    )
}
