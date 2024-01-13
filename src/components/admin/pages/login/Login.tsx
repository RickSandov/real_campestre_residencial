import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import styles from './login.module.scss';
import * as Yup from 'yup';
import { FormEventHandler } from 'react';
import { Input } from 'components/input/Input';
import { Flower } from 'components/icons';
import { api } from 'lib';
import { toast } from 'react-hot-toast';
import { IUser } from 'interfaces';

import Router from 'next/router';


const validationSchema = Yup.object({
    nickname: Yup.string()
        .required('Ingresar nombre de usuario'),
    password: Yup.string()
        .required('Ingresar contraseña')
})

const initialValues = {
    nickname: '',
    password: ''
}

export const Login = () => {

    async function onSubmit(values: FormikValues, helpers: FormikHelpers<any>) {

        const req = api.post<{ token: string, user: IUser }>('login', values);

        toast.promise(req, {
            loading: 'Por favor espera',
            success: ({ data }) => {
                const { user } = data;
                Router.push('/admin')
                return `Hola, ${user.dispName}`
            },
            error: 'El usuario no existe, revisa bien tus credenciales'
        });
    }

    return (
        <div className={styles.background} >
            <Formik {...{
                initialValues, onSubmit, validationSchema
            }} >
                {
                    ({ handleSubmit }) => (
                        <form
                            className={styles.login}
                            onSubmit={handleSubmit}
                        >
                            <div className={styles.header}>
                                <Flower />
                                <h1>Real Campestre</h1>
                            </div>
                            <div className={styles.body}>
                                <Input
                                    className={styles.input}
                                    name='nickname'
                                    nameDisplayed='Usuario'
                                    placeholder='Nombre de usuario'
                                />
                                <Input
                                    className={styles.input}
                                    name='password'
                                    nameDisplayed='Contraseña'
                                    type='password'
                                />
                                <button type='submit' >
                                    Iniciar sesión
                                </button>
                            </div>
                        </form>
                    )
                }
            </Formik>
        </div>
    )
}
