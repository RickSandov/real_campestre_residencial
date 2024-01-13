import React, { useContext } from 'react'
import { Formik, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';
import { AdminContext } from 'contexts/admin';
import { Input } from 'components';

import styles from './newClient.module.scss';

const validationSchema = Yup.object({
    phoneNumber: Yup.string().required('Campo obligatorio'),
    name: Yup.string().required('Campo obligatorio')
});

const initialValues = {
    phoneNumber: '',
    name: ''
}

export const NewClient = ({ close }: { close: () => void }) => {

    const { createClient } = useContext(AdminContext);

    const onSubmit = (values: FormikValues, helpers: FormikHelpers<any>) => {
        const { phoneNumber, name } = values;
        createClient({ phoneNumber, name }, close);
    }

    return (
        <Formik {...{
            initialValues,
            validationSchema,
            onSubmit
        }}>
            {
                ({ handleSubmit }) => (
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit}
                    >
                        <h2>Crear cliente</h2>
                        <div className={styles.inputs}>
                            <Input
                                name="name"
                                nameDisplayed='Nombre de cliente'
                            />
                            <Input
                                name="phoneNumber"
                                nameDisplayed='Número de contacto'
                            />
                        </div>
                        <div className={styles.buttons}>
                            <button type='submit' >
                                Crear
                            </button>
                        </div>
                    </form>
                )
            }
        </Formik>
    )
}
