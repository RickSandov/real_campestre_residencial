
import { useId, useMemo } from 'react'
import { useField, Field, ErrorMessage } from 'formik'
import { useAutoAnimate } from '@formkit/auto-animate/react';

import styles from './input.module.scss';

interface InputProps {
    className?: string,
    footer?: string
    name: string,
    type?: string,
    placeholder?: string,
    nameDisplayed: string,
    handleChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | null,
    size?: 'small' | 'medium' | 'large'
}


export const Input = ({ className = "", name, type = 'text', placeholder, nameDisplayed, handleChange = null, size, footer = '' }: InputProps) => {
    const id = useId();
    const data = useField(name);
    const isActive = data[1].value !== '';
    const hasError = data[1].error && data[1].touched;
    const [errorRef] = useAutoAnimate<HTMLDivElement>();

    // const displayFooter = useMemo(() => footer.toLocaleString(), [footer])

    return (
        <>
            <div className={`${styles.container} ${size ? styles[size] : ''} ${className} `} >
                {
                    handleChange ?
                        <Field
                            id={id}
                            type={type}
                            name={name}
                            placeholder=''
                            className={`${styles.input} ${isActive && styles.active} ${hasError && styles.error}`}
                            onChange={handleChange}
                        />
                        :
                        <Field
                            id={id}
                            type={type}
                            name={name}
                            placeholder=''
                            className={`${styles.input} ${isActive && styles.active} ${hasError && styles.error}`}
                        />
                }

                <label htmlFor={id} className={`${styles.label} `}>
                    {nameDisplayed}
                </label>
                {footer && <p className='text-slate-500 text-md mt-3'>{footer}</p>}
                <div ref={errorRef} className={styles.error}>
                    <ErrorMessage name={name} component='span' />
                </div>
            </div>
        </>



    )
}