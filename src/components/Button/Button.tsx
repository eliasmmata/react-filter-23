// ButtonMain.tsx
import React from "react";
import { usePreviousPath } from '../PreviousPathContext';
import Link from "next/link";

import styles from '../../styles/components/Button.module.scss';
interface ButtonMainProps {
    buttonText: string;
    routePath: string;
}

const ButtonMain: React.FC<ButtonMainProps> = ({ buttonText, routePath }) => {
    const { setPreviousPath } = usePreviousPath();

    const handleButtonClick = () => {
        setPreviousPath(window.location.pathname); // Save the previous path to context
    };

    return (
        <Link href={routePath}>
            <a className={styles.button_main} onClick={handleButtonClick}>
                {buttonText}
            </a>
        </Link>
    );
}

export default ButtonMain;
