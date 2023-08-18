import React from "react";
import Image from "next/image";
import Link from "next/link";

// Import Styles
import styles from '../../styles/components/Header.module.scss';

// Import images
import Logo from '../../../public/images/logos/logo-name.png';

const Header: React.FC = () => {
    return (
        <header className={styles.home_header}>
            <span style={{ cursor: 'pointer' }}>
                <Link href="/">
                    <span>
                        <Image src={Logo} alt="logo" width={640} height={140} />
                    </span>
                </Link>
            </span>
        </header>
    );
}

export default Header;