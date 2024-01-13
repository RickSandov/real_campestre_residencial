
import styles from './select.module.scss';


export interface IOption {
    value: string | number;
    text: string;
}

interface SelectProps {
    title: string;
    options: IOption[];
    onSelect: (optionValue: string | number) => void;
    activeOption: IOption | null;
}

export const Select = ({ title, options, activeOption, onSelect }: SelectProps) => {

    return (
        <div className={styles.select}>
            <h3>{title}</h3>
            <div className={styles.options}>
                {
                    options.map(({ value, text }) => {
                        const isActive = value === activeOption?.value;
                        return (
                            <span
                                key={value}
                                className={`${styles.option} ${isActive ? styles.active : ''}`} >
                                {text}
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}
