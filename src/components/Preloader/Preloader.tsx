import React from 'react';

import styles from '../../styles/components/Preloader.module.scss';

import Image from 'next/image';
import Logo from '../../../public/images/logos/logo-name.png';

const Preloader: React.FC = () => {
    return (
        <section className={styles.preloader_section}>
            <div className={styles.preloader_container}>
                <div className={`${styles.animate__animated} animate__bounce`}>
                    <Image src={Logo} width={640} height={140} alt="logo"  />
                </div>
                <h3 style={{ textAlign: 'center', color: '#414756' }} className={`${styles.animate__animated} animate__fadeInUp`}>
                    Frontend position technical test
                    <span style={{ display: 'block', fontSize: '1.5rem' }}>Elías Moreno Mata</span>
                </h3>
            </div>
        </section>
    );
}

export default Preloader;
