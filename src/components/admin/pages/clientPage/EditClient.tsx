
import { useContext, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { AdminContext } from 'contexts/admin';
import styles from './editClient.module.scss';
import { Formik, FormikHelpers, FormikValues, useFormikContext } from 'formik';
import { Input } from 'components/input/Input';
import { IClient, IDisplayClient } from 'interfaces';


// const FormObserver = () => {
//     const { values } = useFormikContext();
//     const { setUpdatedClient, editClient } = useContext(AdminContext);
//     useEffect(() => {
//         const { updatedClient } = editClient;
//         const newInfo = values as { phoneNumber: string, name: string };

//         setUpdatedClient({
//             ...updatedClient!,
//             ...newInfo
//         })

//     }, [values]);
//     return null;
// };

export const EditClient = ({ close, client }: { close: () => void, client: IClient }) => {
    const { postClientUpdate } = useContext(AdminContext);


    const validationSchema = Yup.object({
        phoneNumber: Yup.string().required('Campo obligatorio'),
        name: Yup.string().required('Campo obligatorio')
    });

    const initialValues = {
        phoneNumber: client.phoneNumber,
        name: client.name
    }

    const onSubmit = (values: FormikValues, helpers: FormikHelpers<any>) => {
        const data = { ...values as { phoneNumber: string, name: string }, _id: (client._id as string) }
        postClientUpdate(data, close);
    }

    return (
        <Formik
            {...{
                initialValues,
                validationSchema,
                onSubmit
            }}
        >
            {
                ({ handleSubmit, values }) => {
                    let hasChanged = false;
                    const { phoneNumber, name } = client;
                    if ((name !== values.name) || (phoneNumber !== values.phoneNumber)) {
                        hasChanged = true
                    }
                    return (
                        <form
                            className={styles.form}
                            onSubmit={handleSubmit}
                        >
                            <h2>Editar cliente</h2>
                            <div className={styles.inputs}>
                                <Input
                                    name="name"
                                    nameDisplayed='Nombre de cliente'
                                    className={values.name === client.name ? styles.edited : ''}
                                />
                                <Input
                                    name="phoneNumber"
                                    nameDisplayed='Número de contacto'
                                    className={values.phoneNumber === client.phoneNumber ? styles.edited : ''}
                                />
                            </div>
                            <div className={styles.buttons}>
                                <button type='submit' disabled={!hasChanged} >
                                    Crear
                                </button>
                            </div>
                        </form>
                    )
                }
            }
        </Formik>
    )
}
