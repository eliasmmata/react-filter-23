import React, { MouseEventHandler } from "react";

import styles from '../../styles/components/ButtonPagination.module.scss';

interface ButtonPaginationProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const ButtonPagination: React.FC<ButtonPaginationProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} className={styles.button_pagination}>Ver más artículos</button>
    );
}

export default ButtonPagination;
