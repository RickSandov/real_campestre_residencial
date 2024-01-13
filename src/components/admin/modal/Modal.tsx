
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { PropsWithChildren } from 'react';
import styles from './modal.module.scss';

interface ModalProps extends PropsWithChildren {
    show: boolean;
    close: () => void;
}

export const Modal = ({ children, show, close }: ModalProps) => {

    const [ref] = useAutoAnimate<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className={`${styles.invisible} ${show ? styles.active : ''}`}
            onClick={close}
        >
            {
                show
                &&
                (
                    <div className={styles.modal} onClick={e => { e.stopPropagation() }} >
                        {children}
                        <span
                            className={styles.close}
                            onClick={close}
                        >
                            &times;
                        </span>
                    </div>
                )
            }
        </div>
    )
}
