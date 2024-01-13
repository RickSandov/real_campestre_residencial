import { PropsWithChildren } from 'react';
import { Formik, FormikHelpers } from 'formik';
import styles from './form.module.scss';

interface FormProps extends PropsWithChildren {
    initialValues: Object;
    onSubmit: (value: Object, helpers: FormikHelpers<Object>) => void;
    enableReinitialize?: boolean;
    continueText?: string;
    cancelText?: string;
    onCancel: () => void
}

export const Form = ({ initialValues, enableReinitialize = false, children, onSubmit, continueText = 'Continuar', cancelText = 'Cancelar', onCancel }: FormProps) => {
    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={enableReinitialize}
            onSubmit={onSubmit}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} >
                    {children}
                    <div className={styles.buttons} >
                        <button className={`${styles.button} ${styles.cancel}`} type='button' onClick={onCancel} >
                            {cancelText}
                        </button>
                        <button className={styles.button} type='submit'>
                            {continueText}
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    )
}
