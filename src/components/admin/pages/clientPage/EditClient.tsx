
import { useContext, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { AdminContext } from 'contexts/admin';
import styles from './editClient.module.scss';
import { Formik, FormikHelpers, FormikValues, useFormikContext } from 'formik';
import { Input } from 'components/input/Input';
import { IClient, IDisplayClient } from 'interfaces';
import { FileUploader } from 'react-drag-drop-files';


export const EditClient = ({ close, client }: { close: () => void, client: IClient }) => {
    const { postClientUpdate, postClientFile } = useContext(AdminContext);

    const [file, setFile] = useState<File | null>(null);
    const handleChange = (file: File) => {
        setFile(file);
    };

    console.log({ file })

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
        console.log({ values, file });
        postClientFile({ fileName: values.fileName, file: file as File, _id: client._id as string });
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
                                        Guardar cambios
                                    </button>
                                </div>
                            </form>
                        )
                    }
                }
            </Formik>
            <h2>Documentos</h2>
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
