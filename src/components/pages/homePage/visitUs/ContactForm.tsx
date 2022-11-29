import { Input } from 'components/input/Input';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { api } from 'lib';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import styles from './contactForm.module.scss';


const validationSchema = Yup.object({
    name: Yup.string()
        .required('Ingrese su nombre'),
    phoneNumber: Yup.string()
        .required('Ingrese su número de contacto')
        .min(10, 'Ingrese un número válido'),
    email: Yup.string()
        .email('Ingrese su correo electrónico')
        .required('Ingrese su correo electrónico'),
    message: Yup.string()
});
const initialValues = {
    name: '',
    phoneNumber: '',
    email: '',
    message: ''
}

export const ContactForm = () => {

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (values: FormikValues, helpers: FormikHelpers<any>) => {
        setIsLoading(true);
        const { name, phoneNumber, email, message } = values;
        const req = api.post('mail', {
            name, phoneNumber, email, message
        })
        toast.promise(req, {
            loading: 'Enviando formulario...',
            success: () => {
                setIsLoading(false);
                helpers.resetForm();
                return 'Formulario enviado, te contactaremos lo antes posible.'
            },
            error: 'Hubo un error al enviar el formulario, intentelo de nuevo más tarde.'
        })
    }

    const formikProps = { initialValues, validationSchema, onSubmit };

    return (
        <div className={styles.card} id='contacto' >
            <h2>Contáctanos</h2>
            <p>Envía el formulario y nosotros te contactamos.</p>
            <Formik {...formikProps}>
                {/* {({ values, handleSubmit, isValid, setFieldError, handleChange, dirty }) => ( */}
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} >
                        <Input
                            name='name'
                            nameDisplayed='Nombre'
                        />
                        <Input
                            name='phoneNumber'
                            nameDisplayed='Número de contacto'
                            type='number'
                        />
                        <Input
                            name='email'
                            nameDisplayed='Correo electrónico'
                            type='email'
                        />
                        <div className={styles.message}>
                            <label htmlFor="message">Mensaje</label>
                            <textarea name="message" id='message'></textarea>
                        </div>
                        <button disabled={isLoading} type='submit' className={styles.button} >
                            Enviar
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}
