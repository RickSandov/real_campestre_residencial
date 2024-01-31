
import styles from './pageTop.module.scss';

export const PageTop = ({ title, button, action, className = '' }: {
    title: string, button: string, action: () => void, className?: string
}) => {
    return (
        <div className={`${styles.top} ${className} text-4xl font-bold`}>
            <h1>{title}</h1>
            <button
                type='button'
                onClick={action}
            >
                {button}
            </button>
        </div>
    )
}
