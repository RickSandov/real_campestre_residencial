import styles from './topTitle.module.scss'

interface Props {
    alignment?: 'left' | 'center' | 'right',
    span: string;
    title: string;
    className?: string
}

export const TopTitle = ({ alignment = 'left', span, title, className }: Props) => {
    return (
        <h2
            className={`${styles.title} ${className || ''} ${styles[alignment] || ''}`}
        >
            <span>{span}</span>
            {title}
        </h2>
    )
}
