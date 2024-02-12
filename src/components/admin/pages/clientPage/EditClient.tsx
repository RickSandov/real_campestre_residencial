
import { useContext, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { AdminContext } from 'contexts/admin';
import styles from './editClient.module.scss';
import { Formik, FormikHelpers, FormikValues, useFormikContext } from 'formik';
import { Input } from 'components/input/Input';
import { IClient, IDisplayClient } from 'interfaces';
import { FileUploader } from 'react-drag-drop-files';
import { EditDoc } from './edit-doc';


export const EditClient = ({ close, client }: { close: () => void, client: IClient }) => {
    const { postClientUpdate, postClientFile } = useContext(AdminContext);

    const [file, setFile] = useState<File | null>(null);
    const handleChange = (file: File) => {
        setFile(file);
    };

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
    const onFileSubmit = (values: FormikValues, helpers: FormikHelpers<any>) => {
        postClientFile({ fileName: values.fileName, file: file as File, _id: client._id as string }, close);
    }

    return (
        <>
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
                                <h2 className='text-5xl font-bold'>Editar cliente</h2>
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
                                        Guardar cambios
                                    </button>
                                </div>
                            </form>
                        )
                    }
                }
            </Formik>
            <h2 className='mb-6 text-4xl font-bold'>Documentos</h2>
            {
                client.docs.length ? (
                    <ul className='flex flex-wrap justify-start gap-4 mb-10 gap-y-5'>
                        {
                            client.docs.map((doc) => (
                                <EditDoc key={doc.url} doc={doc} close={close} clientId={client._id as string} />
                            ))
                        }
                    </ul>
                ) : (
                    <p className='text-center' >Aún no tiene documentos registrados</p>
                )
            }
            <h2 className='mt-10 mb-4 text-3xl font-bold'>Agregar nuevo documento</h2>
            <FileUploader multiple={false} className={styles.fileUploader} name="file" handleChange={handleChange} label="Sube o arrastra un archivo" />
            <Formik
                {
                ...{
                    initialValues: {
                        fileName: ''
                    },
                    validationSchema: Yup.object({
                        fileName: Yup.string().required('Campo obligatorio'),
                    }),
                    onSubmit: onFileSubmit
                }
                }
            >
                {
                    ({ handleSubmit, values }) => {
                        let disabled = !file || values.fileName === '';
                        return (
                            <form onSubmit={handleSubmit} className={styles.file}>
                                <Input className={styles.fileName} name="fileName" nameDisplayed='Nombre del archivo' />
                                <div className={styles.button}>
                                    <button type='submit' disabled={disabled} >
                                        Guardar archivo
                                    </button>
                                </div>
                            </form>
                        )
                    }
                }
            </Formik>
        </>
    )
}
