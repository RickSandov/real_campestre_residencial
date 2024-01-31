import { Form } from 'components/admin/form/Form'
import { Input } from 'components/input/Input'
import { AdminContext } from 'contexts/admin'
import { ILot, lotType, statusType } from 'interfaces'
import React, { useContext } from 'react'
import styles from './editLot.module.scss'
import { Field, FormikHelpers, FormikValues } from 'formik'
import { api } from 'lib'
import toast from 'react-hot-toast'
import { getLotTypeKeyByValue } from '../../../../../helpers/index';

export const EditLot = ({ cancel }: { cancel: () => void }) => {

    const { selectedLot, getLots, setSelectedLot } = useContext(AdminContext)

    const { _id, num, price, section, status, type } = selectedLot as ILot;

    const onSubmit = (values: FormikValues, helpers: FormikHelpers<any>) => {
        // setIsLoading(true);
        const { price, status, type } = values;

        // TODO: migrate to AdminContext methods.
        const req = api.put(`admin/lots/${_id}`, {
            _id, status, price, type
        })
        toast.promise(req, {
            loading: 'Actualizando información...',
            success: () => {
                // setIsLoading(false);
                getLots();
                setSelectedLot(null);
                cancel();
                return 'Actualizado con éxito'
            },
            error: () => {
                // setIsLoading(false);
                return 'Hubo un error al enviar el formulario, inténtelo de nuevo más tarde.'
            }
        })
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.title} >Lote <strong>{section}{num}</strong></h2>
            <p>Tipo de lote: <strong>{type}</strong> </p>
            <Form
                initialValues={{ price, status, type }}
                onCancel={cancel}
                onSubmit={onSubmit}
                continueText='Guardar cambios'
            >
                <Input
                    name='price'
                    nameDisplayed='Precio'
                    placeholder={String(price)}
                />
                <>
                    <label htmlFor='status' className={`${styles.label} `}>
                        Estatus
                    </label>
                    <Field
                        as="select"
                        name='status'
                        placeholder={status}
                    >
                        {Object.values(statusType).map(value => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </Field>
                    <label htmlFor='type' className={`${styles.label} `}>
                        Lote tipo {type}
                    </label>
                    <Field
                        as="select"
                        name='type'
                        placeholder={getLotTypeKeyByValue(type)}
                    >
                        {Object.values(lotType).map(value => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </Field>
                </>
            </Form>
        </div>
    )
}
